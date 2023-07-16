// Initialize the platform object
var platform = new H.service.Platform({
    'apikey': 'E6-Q4pf9t4GP6D_TXlEYFre1Y-gfUgoy4aeiPvJLFGE'
  });

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();
  // Instantiate (and display) the map
  console.log(`place is ${place.lon}`)
  var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 14,
      center: { lng:place.lon ,lat:place.lat  }
    });


    var svgMarkup = '<svg style="color: red" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" fill="red"></path> </svg>';

// Create an icon, an object holding the latitude and longitude, and a marker:
var icon = new H.map.Icon(svgMarkup),
    coords = {lat: place.lat, lng: place.lon},
    marker = new H.map.Marker(coords, {icon: icon});

// Add the marker to the map and center the map at the location of the marker:
map.addObject(marker);   