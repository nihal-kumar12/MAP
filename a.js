// Create a map centered at [25.5941, 85.1376] with a zoom level of 11
var map = L.map('map').setView([25.5941, 85.1376], 11);
mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";

// Add the OpenStreetMap tile layer to the map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
  maxZoom: 18
}).addTo(map);

// Create a custom bus icon
var busIcon = L.icon({
  iconUrl: 'img/bus.png',
  iconSize: [40, 40]
});

// Add a marker with the bus icon to the map
var marker = L.marker([25.5941, 85.1376], { icon: busIcon }).addTo(map);

// Add a click event listener to the map
map.on('click', function (e) {
  console.log(e);
  var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  L.Routing.control({
    waypoints: [
      L.latLng(25.5941, 85.1376),
      L.latLng(e.latlng.lat, e.latlng.lng)
    ]
  }).on('routesfound', function (e) {
    var routes = e.routes;
    console.log(routes);

    e.routes[0].coordinates.forEach(function (coord, index) {
      setTimeout(function () {
        marker.setLatLng([coord.lat, coord.lng]);
      }, 100 * index);
    });

  }).addTo(map);
});

// Check if geolocation is supported by the browser
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Create a marker at the user's position and add it to the map
      const marker = L.marker({
        position: pos
      }).addTo(map);

      // Set the map center and zoom level to the user's position
      map.setView(pos, 11);
    }
  );
} else {
  console.log('Geolocation is not supported by your browser');
}

// Add a geocoder control to the map
L.Control.geocoder().addTo(map);

// Add a locate control to the map
L.control.locate().addTo(map);
