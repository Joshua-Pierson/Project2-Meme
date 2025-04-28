const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_keys}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`;
const api_keys =[

];

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const display = document.getElementById('gifs-display')



function displayGifs(gifs) {
    display.innerHTML = '';
    gifs.forEach(gif => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      gifGrid.appendChild(img);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const search = input.value.trim();
    if(!search) return;
    
})
