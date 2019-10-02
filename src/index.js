const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  localStorage.setItem('next_fetch', API);
  (() => {
    console.log(`API (next_fetch) in localStorage: ${localStorage.getItem('next_fetch')}`);
  })();
  getData(API);
};



function cleanLocalStorage() {
  try {
    localStorage.removeItem('next_fetch');
  } catch {
    error => console.error(error);
  }
  return console.log('localStorage is clean');
}



const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  } 
}, {
  rootMargin: '0px 0px 100% 0px',
});



intersectionObserver.observe($observe);