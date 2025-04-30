const api_keys = [
    'Fd7FytdiyW7KkD4jCo4YZPR5Gslts34L',
    '13mjKb9dWHqVCz8zZPBiWoOgffFyEedi'
  ];
  
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const display = document.getElementById('gifs-display');
  
  // Display GIFs on page
  function displayGifs(gifs) {
    display.innerHTML = '';
    gifs.forEach(gif => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      display.appendChild(img);
    });
  }

// Try all API keys until success or all fail
async function fetchApis(search, keys) {
    for (let i = 0; i < keys.length; i++) {
      const api_Key = keys[i];
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_Key}&q=${encodeURIComponent(search)}&limit=35&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`Key ${api_Key} failed with status ${res.status}`);
          continue;
        }
  
        const data = await res.json();
        return data.data;
      } catch (err) {
        console.warn(`Key ${api_Key} failed due to network error:`, err);
      }
    }
  }
  
  // Handle search form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const search = input.value.trim();
    if (!search) return;
  
    display.innerHTML = '<p>Loading...</p>';
  
    try {
      const gifs = await fetchApis(search, api_keys);
      displayGifs(gifs);
    } catch (err) {
      display.innerHTML = '<p>Sorry, we could not load GIFs at this time.</p>';
      console.error(err);
    }
  });

