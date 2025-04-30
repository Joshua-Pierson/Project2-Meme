const api_keys =[
    "Fd7FytdiyW7KkD4jCo4YZPR5Gslts34L&q=fun&limit=40&offset=0&rating=g&lang=en&bundle=messaging_non_clips",
    "Fd7FytdiyW7KkD4jCo4YZPR5Gslts34L&q=music&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips",
    "Fd7FytdiyW7KkD4jCo4YZPR5Gslts34L&q=anime&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips",

];

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const display = document.getElementById('gifs-display')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const search = input.value.trim();
    if(!search) return;

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_keys}&q=${encodeURIComponent(search)}&limit=20&rating=g`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayGifs(data.data);
    } catch (error) {
        
    }
    
});


function displayGifs(gifs) {
    display.innerHTML = '';
    gifs.forEach(gif => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      display.appendChild(img);
    });
}

