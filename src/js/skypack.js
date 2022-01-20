import { debounce, parseDate } from './utils';

const searchPackageElement = document.querySelector('input[name="search-packages"]');
const packageResultList = document.querySelector('.package__list');
let previousSearchResult = [];
let actualPage = 1;
let totalPages = 0;

const API_URL = 'https://api.skypack.dev/v1';
const CDN_URL = 'https://cdn.skypack.dev';

async function fetchPackages({ packageName, page = 1 }) {
  const response = await fetch(`${API_URL}/search?q=${packageName}&p=${page}`);
  const data = await response.json();

  actualPage = data.meta.page;

  return data;
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
  const event = new CustomEvent('package-selected', {
    detail: { packageName: this.getAttribute('data-package'), url: CDN_URL },
  });
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

  createScrollEndObserver(packageResultList.lastElementChild);
}

function createScrollEndObserver(element) {
  const observer = new IntersectionObserver(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (actualPage + 1 <= totalPages) {
          await fetchMorePackages({ packageName: searchPackageElement.value, page: actualPage + 1 });
        }
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: '1.0',
    }
  );
  observer.observe(element);
}

async function fetchMorePackages({ packageName, page }) {
  const { results } = await fetchPackages({ packageName, page });
  previousSearchResult = [...previousSearchResult, ...results];
  renderResultPackages({ results: previousSearchResult });
}

async function handleSearch() {
  if (this.value) {
    previousSearchResult = [];
    const { results, meta } = await fetchPackages({ packageName: this.value });
    ({ totalPages } = meta);
    results && renderResultPackages({ results });
    previousSearchResult = results;
    return;
  }
  packageResultList.setAttribute('hidden', '');
}

searchPackageElement.addEventListener('input', debounce(handleSearch, 300));
