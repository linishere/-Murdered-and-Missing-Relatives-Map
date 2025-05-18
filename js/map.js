import { supabase } from './supabaseClient.js'

// Initialize MapLibre
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [-98.5795, 39.8283],
    zoom: 3
});

map.addControl(new maplibregl.NavigationControl());

// Fetch data from Supabase
async function loadMarkers() {
    const { data, error } = await supabase
        .from('relatives')  // your table name
        .select('*')

    if (error) {
        console.error('Error loading data from Supabase:', error)
        return
    }

    data.forEach(person => {
        if (!person.latitude || !person.longitude) return;

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
// Add a click event to the map