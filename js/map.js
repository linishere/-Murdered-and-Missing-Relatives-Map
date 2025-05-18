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
