// Initialize the map
var map = L.map('map').setView([39.8283, -98.5795], 4); // Centered on the USA

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to add markers from JSON data
function addMarkers(data) {
    data.forEach(function(person) {
        L.marker(person.location).addTo(map)
            .bindPopup(`<b>${person.name}</b><br>${person.details}`);
    });
}

// Fetch data from JSON file
fetch('../data/missingPersons.json')
    .then(response => response.json())
    .then(data => addMarkers(data))
    .catch(error => console.error('Error loading the data:', error));