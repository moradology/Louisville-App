mapboxgl.accessToken = 'pk.eyJ1IjoiZ2R1ZXIzIiwiYSI6ImNqZTBjeDl4NTB2dzkzM21vMzFpdnBlODkifQ._5WwLZhL7lz9uXLll9w9-Q';

var bounds = [
  [-86.2, 37.9], // Southwest coordinates
  [-85.3, 38.5]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gduer3/cjfyg45r00pwf2rqryx5xpuol',
    zoom: 11,
    center: [-85.720872, 38.2570974],
    maxBounds: bounds
});

var overlay = document.getElementById('features-title');

$( "#slider-range" ).slider({
  range: false,
  min: 0,
  max: 100,
  values: [ 0, 100 ],
  step: 20,
  slide: function( event, ui ) {
    if ( ( ui.values[ 0 ] ) > ui.values[ 1 ] ) { return false; }
    $( "#amount" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ]  );
  }
});

$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );

$("#slider-range" ).slider({
  change: function(event, ui) {
    map.setFilter("streets", ["all", [">=", 'risk_score', ui.values[0]], ["<=", 'risk_score', ui.values[1]]]);
  }
});


//legend
var layers = ['0-20', '20-40', '40-60', '60-80', '80-100'];
var colors = ["#000000", "#a2ef07", "#f6f913", "#ef8e26", "#f90021"];

//remove previously created legend elements on change
var myNode = document.getElementById("legend");
while (myNode.firstChild) {
  myNode.removeChild(myNode.firstChild);
}
var legend_holder = document.createElement('span');
var legend_title = document.createTextNode("Legend");
legend_holder.appendChild(legend_title);
legend.appendChild(legend_holder);

//dynamically serve legend elements
for (i = 0; i < layers.length; i++) {
  var item = document.createElement('div');
  var key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = colors[i];

  var value = document.createElement('span');
  value.innerHTML = layers[i];
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
}
$( "#traffic_sig" ).prop("checked", true);
$( "#traffic_sig" ).prop('disabled',false);


map.on('load', function() {
  map.addLayer({
    "id": "streets",
    "type": "line",
    "source": 'composite',
    "source-layer": "segments_final-4isuhz"
  });

  map.addLayer({
    "id": "intersections",
    "type": "line",
    "source": 'composite',
    "source-layer": "segments_final-4isuhz",
    "paint": {
      "line-color": ["step", ["get", "risk_score"], "#000000", 20, "#a2ef07", 40, "#f6f913", 60, "#ef8e26", 80, "#f90021"]
    }
  });

  $('#exampleModalCenter').modal('show');

  // Create popup
  var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
  });


  map.on('mousemove', 'streets', function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    //reminder: can filter by groups on right with if/then logic like commented above
    overlay.innerHTML = 'Selected Features';
    var feature = e.features[0].properties;
    var pairs = _.pairs(feature);
    for (i = 0; i < pairs.length; i++) {
      var entry = document.createElement('div');
      var text = pairs[i][0] + ' : ' + pairs[i][1];
      console.log(text);
      entry.textContent = `${text}`;
      overlay.appendChild(entry);
      overlay.style.display = 'block';
    }
  });

  map.on('mouseenter', 'streets', function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates[0].slice();
    var description = e.features[0].properties.Count_2017;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
        .setHTML("Collisions in 2017: " +  description) //fix this
        .addTo(map);
  });

  //data to show in top right
  map.on('mouseleave', function (e) {
      var features = map.queryRenderedFeatures(e.point);
      map.getCanvas().style.cursor = '';
      overlay.style.display = 'none';
      popup.remove();
  });

});

