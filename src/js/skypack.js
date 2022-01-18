import { parseDate } from './utils';

const searchPackageElement = document.querySelector('input[name="search-packages"]');
const packageResultList = document.querySelector('.package__list');
let previousSearchResult = [];
let actualPage = 1;

async function fetchPackages({ packageName, page = 1 }) {
  const response = await fetch(`https://api.skypack.dev/v1/search?q=${packageName}&p=${page}`);
  return await response.json();
}

function getBadge({ popularityScore }) {
  if (popularityScore >= 0.8) {
    return '<span class="badge">Popular</span>';
  }
  return '';
}

function createPackageHTML({ name, popularityScore, description, updatedAt }) {
  return `
  <header>
    <h4 class="name">${name}</h4>
    ${getBadge({ popularityScore })}
  </header>
  <footer>        
    <p class="description">${description}</p>
    <p class="update-date"><span>Last update: </span>${parseDate(new Date(updatedAt))}</p>
  </footer>
`;
}

function handlePackageSelected() {
  const event = new CustomEvent('package-selected', { detail: { packageName: this.getAttribute('data-package') } });
  document.dispatchEvent(event);
}

function renderResultPackages({ results }) {
  packageResultList.innerHTML = '';
  packageResultList.removeAttribute('hidden');
  results.forEach((_package) => {
    const liElement = document.createElement('li');
    liElement.setAttribute('class', 'package');
    liElement.setAttribute('data-package', _package.name);
    liElement.setAttribute('title', `${_package.name} - ${_package.description}`);
    liElement.innerHTML = createPackageHTML(_package);
    liElement.addEventListener('click', handlePackageSelected);

    packageResultList.appendChild(liElement);
  });
}

function fetchMorePackages({ packageName, page }) {
  const { results } = fetchPackages({ packageName, page });
  previousSearchResult = [...previousSearchResult, results];
  renderResultPackages({ previousSearchResult });
}

async function handleSearch() {
  if (this.value) {
    const { results } = await fetchPackages({ packageName: this.value });
    results && renderResultPackages({ results });
    return;
  }
  packageResultList.setAttribute('hidden', '');
}

searchPackageElement.addEventListener('input', handleSearch);
