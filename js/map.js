import { supabase } from './supabaseClient.js'

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [-98.5795, 39.8283],
  zoom: 3
})

map.addControl(new maplibregl.NavigationControl())

async function loadMarkers() {
  const { data, error } = await supabase.from('missing_relatives').select('*');
  
  if (error) {
    console.error('Error loading data from Supabase:', error);
    return;
  }

  console.log('Fetched data:', data);

  if (!data.length) {
    console.warn('No data found in table missing_relatives');
  }

  data.forEach(person => {
    console.log('Person:', person);
    if (!person.latitude || !person.longitude) {
      console.warn(`Skipping ${person.name} because of missing coordinates.`);
      return;
    }

    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.backgroundSize = '100%';

    new maplibregl.Marker(el)
      .setLngLat([person.longitude, person.latitude])
      .setPopup(new maplibregl.Popup().setHTML(`<b>${person.name}</b><br>${person.details}`))
      .addTo(map);
  });
}


loadMarkers()

// Form 
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('caseForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const details = document.getElementById('details').value;

    const { data, error } = await supabase
      .from('missing_relatives')
      .insert([{ name, latitude, longitude, details }]);

    if (error) {
      console.error('Error submitting case:', error);
      alert('There was a problem submitting the case.');
      return;
    }

    alert('Case submitted successfully!');
    form.reset();
    loadMarkers(); // Optional: refresh map markers with the new case
  });
});

// Stats
async function getCaseCount() {
  const { count, error } = await supabase
    .from('missing_relatives')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching case stats:', error);
    document.getElementById('case-count').textContent = 'Error loading stats';
    return;
  }

  document.getElementById('case-count').textContent = count;
}

getCaseCount();
