// Initialize MapLibre
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json', // OpenStreetMap style
    center: [-98.5795, 39.8283], // [lng, lat]
    zoom: 3
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

// Load missing persons data from JSON file
fetch('../data/missingPersons.json')
    .then(response => response.json())
    .then(data => {
        // Add markers for each person
        data.forEach(function(person) {
            // Create marker element
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
            el.style.width = '30px';
            el.style.height = '30px';
            el.style.backgroundSize = '100%';
            
            // Add marker to map
            new maplibregl.Marker(el)
                .setLngLat([person.location[1], person.location[0]]) // Convert [lat,lng] to [lng,lat]
                .setPopup(new maplibregl.Popup().setHTML(`<b>${person.name}</b><br>${person.details}`))
                .addTo(map);
        });
    })
    .catch(error => {
        console.error('Error loading the data:', error);
        document.getElementById('map').innerHTML = `
            <div class="alert alert-danger">
                Failed to load case data. Please try again later.
            </div>
        `;
    });

fetch('/api/cases')  // Now uses the Node.js endpoint
.then(response => response.json())
.then(data => {
    // MapLibre marker code here
});