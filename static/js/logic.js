// Store API query variables
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var techUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// function faultLines() {
//   return {
//     d3.json(techUrl, function(d){
//       L.geoJSON(d, {
//         color: "yellow",
//         stroke: true});
//     })
//   } 
// };

// Perform a GET request to the query URL
d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
 
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    };
  function styleInfo(feature) {
    return {
    radius: getRadius(feature.properties.mag),
    color: "black",
    fillColor: getColor(feature.properties.mag),
    fillOpacity: 0.75,
    stroke: false,
    };
  }
  function getRadius(mag) {
    if (mag === 0) {
      return 1;
    }
    return mag * 5;
  }
  function getColor(d) {
    return d > 5 ? '#d73027' :
      d > 4  ? '#fc8d59' :
      d > 3  ? '#fee08b' :
      d > 2  ? '#d9ef8b' :
      d > 1  ? '#91cf60' :
      d > 0  ? '#1a9850' :
                '#0000';
    }

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng)},
    style: styleInfo,
  });
  

    // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  createMap(earthquakes);
}
    // Sending our earthquakes layer to the createMap function
  


function createMap(earthquakes) { 
  // Define sattelite map, grayscale and outdoor layers
  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Satellite": satellitemap,
    "Light": lightmap,
    "Outdoors" : outdoormap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

   // Create our map, giving it the satellite map, other base maps and earthquakes layer to display on load
   var tyMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [satellitemap, earthquakes]
  });

  d3.json(techUrl, function(d){
    L.geoJSON(d, {
      color: "yellow",
      stroke: true}).addTo(tyMap)
    });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(tyMap); 

  function getColor(d) {
    return d > 5 ? '#d73027' :
      d > 4  ? '#fc8d59' :
      d > 3  ? '#fee08b' :
      d > 2  ? '#d9ef8b' :
      d > 1  ? '#91cf60' :
      d > 0  ? '#1a9850' :
                '#0000';
    }
        
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
    
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 2, 3, 4, 5],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
    };
    

  legend.addTo(tyMap);


}
