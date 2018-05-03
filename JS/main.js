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

var main_overlay = document.createElement('div');
main_overlay.id ='features';
var sub_overlay = document.createElement('div');
sub_overlay.id ='features-title';
var overlay = document.getElementById('features-title');


$( "#slider-range" ).slider({
  range: false,
  min: 0,
  max: 100,
  values: [ 0, 100 ],
  step: 1,
  slide: function( event, ui ) {
    if ( ( ui.values[ 0 ] ) > ui.values[ 1 ] ) { return false; }
    $( "#amount" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ]  );
  }
});

$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );

$("#slider-range" ).slider({
  change: function(event, ui) {
    map.setFilter("intersections", ["all", [">=", 'risk_score', ui.values[0]], ["<=", 'risk_score', ui.values[1]]]);
  }
});


//legend
var layers = ['0-2', '2-4', '4-14', '14-34', '34-100'];
var colors = ["#460587 ","#1048b7","#0fb1b7","#0fb781","#dae510"];

//remove previously created legend elements on change
var myNode = document.getElementById("legend");
while (myNode.firstChild) {
  myNode.removeChild(myNode.firstChild);
}
var legend_holder = document.createElement('span');
var legend_title = document.createTextNode("Risk Score");
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
      "line-color": ["step", ["get", "risk_score"], "#460587 ", 2, "#1048b7", 4, "#0fb1b7", 14, "#0fb781", 34, "#dae510"]
    }
  });

  $('#exampleModalCenter').modal('show');

  // Create popup
  var popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false
  });

  map.on('click', 'streets', function (e) {
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
        .setHTML("Selected Segment")
        .addTo(map);
  });

  var close_button = document.createElement('div');
  var myButton = document.getElementById("close-features");
  var close = close_button.appendChild(myButton);

  map.on('click', 'streets', function (e) {

var container main_overlay.appendChild(close_button);
var container1 container.appendChild(myButton)

        var myNode = document.getElementById("features-title");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);}

        overlay.style.fontWeight = 'bold';

        var feature = e.features[0].properties;
        var pairs = _.pairs(feature);

        for (i = 0; i < pairs.length; i++) {
          var entry = document.createElement('div');
          var text = pairs[i][0] + ' : ' + pairs[i][1];
          entry.textContent = `${text}`;

          main_overlay.appendChild(container1);
          overlay.appendChild(entry);
          overlay.style.display = 'block';
          overlay.style.padding = '10px';
          overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
//var parentDiv = document.getElementById("features-title");
//overlay.parentDiv.insertBefore(myButton, sub_overlay);
  });
  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'streets', function () {
      map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'streets', function () {
      map.getCanvas().style.cursor = '';
  });

});
