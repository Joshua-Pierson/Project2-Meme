const api_key = [
  'Fd7FytdiyW7KkD4jCo4YZPR5Gslts34L',
  '13mjKb9dWHqVCz8zZPBiWoOgffFyEedi',
  `Zz2OIq6K7uXwnawYgdhUWkPWYX4xOMue`
];
  
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const display = document.getElementById('gifs-display');
  const randomBtn = document.getElementById('random-btn');
  
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
    for (let api = 0; api < keys.length; api++) {
      const api_key = keys[api];
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${encodeURIComponent(search)}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`Key ${api_key} failed with status ${res.status}`);
          continue;
        }
  
        const data = await res.json();
        return data.data;
      } catch (err) {
        console.warn(`Key ${api_key} failed due to network error:`, err);
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
      const gifs = await fetchApis(search, api_key);
      displayGifs(gifs);
    } catch (err) {
      display.innerHTML = '<p>Sorry, we could not load GIFs at this time.</p>';
      console.error(err);
    }
  });


// to get random Gifs displays
  randomBtn.addEventListener('click', async () => {
    const totalGifs = 50; // Change this to get more or fewer GIFs
    const results = [];
    display.innerHTML = '<p>Loading random GIFs...</p>';
  
    for (let i = 0; i < totalGifs; i++) {
      let success = false;
  
      for (let api = 0; api < api_key.length; api++) {
        const key = api_key[api];
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${key}&rating=g`;
  
        try {
          const res = await fetch(url);
          if (!res.ok) {
            console.warn(`Random key ${key} failed with status ${res.status}`);
            continue;
          }
  
          const data = await res.json();
          results.push(data.data); // Store the GIF
          success = true;
          break; // Break out of API loop if successful
        } catch (err) {
          console.warn(`Random key ${key} failed due to network error:`, err);
        }
      }
  
      if (!success) {
        console.warn(`Skipping one GIF due to all API keys failing`);
      }
    }
  
    if (results.length > 0) {
      displayGifs(results);
    } else {
      display.innerHTML = '<p>Could not load any random GIFs.</p>';
    }
  });