import './style.css';

const API_KEY = '54253404-642d08b4e9274d1de4d38485e';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let query = '';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  if (!query) return;

  page = 1;
  gallery.innerHTML = '';
  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchImages();
});

async function fetchImages() {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Ошибка при запросе к Pixabay API');
    const data = await res.json();

    renderImages(data.hits);

    if (data.hits.length === 0 || data.hits.length < 12) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    alert('Произошла ошибка при загрузке изображений');
  }
}

function renderImages(images) {
  const markup = images
    .map(
      (img) => `
    <li>
      <div class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" />
        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>${img.likes}
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>${img.views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>${img.comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>${img.downloads}
          </p>
        </div>
      </div>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (page > 1) {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
