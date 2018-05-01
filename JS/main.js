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
/*
var overlay = document.getElementById('features');
var title = document.createElement('strong');
title.textContent = _.keys(_.pick(features[0].properties, "TrafficSig")) + ' : ' + feature.properties.TrafficSig;
*/
map.on('load', function() {
/*
  map.removeLayer("segments_final-4isuhz");
*/




    // Create popup
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'segments_final-4isuhz', function(e) {
        // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates[0].slice();
        var description = e.features[0].properties.Count_2017;
        //_.pick(description, '') //build specific display data from radio buttons?

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

    map.on('mouseleave', 'segments_final-4isuhz', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

//map.fitBounds([[-86, 39], [-84, 37]]);
});

//accordion
$( function() {
  $( "#accordion" ).accordion();
});

//slider
$( function() {
   $( "#slider-range" ).slider({
     range: false,
     min: 0,
     max: 100,
     values: [ 0, 100 ],
     step: 20,

     slide: function( event, ui ) {
       if ( ( ui.values[ 0 ] ) > ui.values[ 1 ] ) {
           return false;}

       $( "#amount" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ]  );
    }

});

$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
  " - " + $( "#slider-range" ).slider( "values", 1 ) );

$( "#slider-range" ).slider({
    change: function( event, ui ) {
      var slideval1 = ui.values[0];
      var slideval2 = ui.values[1];

map.addLayer({
   "id": "segments_final-4isuhz",
   "type": "line",
   "source": 'composite',
   "source-layer": "segments_final-4isuhz",
   "filter": ["has","risk_score"],
   "paint": {
       //"line-color": `${segColor}`,
       "line-color": [
         "step",
         ["get","risk_score"],
         "#000000",
         20,
         "#a2ef07",
         40,
         "#f6f913",
         60,
         "#ef8e26",
         80,
         "#f90021"
       ],
       "line-width": 2.5
   }
}); //console.log(new_Filter);
    var new_Filter = [
        "all",
      [">=", 'risk_score', slideval1],
      ["<=", 'risk_score',slideval2]
    ];

  map.setFilter('segments_final-4isuhz', new_Filter);


//legend
  var layers = ['0-20', '20-40', '40-60', '60-80', '80-100'];
  var colors = ["#000000", "#a2ef07", "#f6f913", "#ef8e26", "#f90021"];

  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
    }
/*
    value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
*/
  }

/*

*/

/*
var layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

for (i = 0; i < layers.length; i++) {
  var layer = layers[i];
  var color = colors[i];
  var item = document.createElement('div');
  var key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  var value = document.createElement('span');
  value.innerHTML = layer;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
}

*/

  });

});
$( "#traffic_sig" ).prop("checked", false);
$( "#traffic_sig" ).prop('disabled',false);

var test =  function(element){ if($('#traffic_sig')[0].checked){
 console.log("true");
 overlay.appendChild(title);
 overlay.style.display = 'block';
} else {
console.log("false");
  }
};


$(document).ready(function(){
test();
    $('#exampleModalCenter').modal('show');
 overlay.innerHTML = '';

});
/*
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point);
    document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
});


map.addLayer({
          "id": "segments_final-4isuhz",
          "type": "line",
          "source": 'composite',
          "source-layer": "segments_final-4isuhz",
          "paint": {
              "line-color": `${segColor}`,
              "line-width": 2.5
            }
      });
//map.querySourceFeatures('composite', {sourceLayer: 'segments_4_13-7evt4d'});
map.setPaintProperty('segments_final-4isuhz', 'fill-color', ['interpolate',['linear'],
  ['risk_score'], 1, '#00adef', 25, '#212529', 50, '#ea950b', 100, '#e94e34'])

  //var features = map.queryRenderedFeatures();
  //_.mapObject(features, function(obj) { return _.pick(obj.properties, 'risk_score')});

  //map.removeLayer("segments_final-4isuhz");
  for (i = slideval1; i <= slideval2; i = i + 20){
    segColor = lcolors[i];
  var new_Filter = [
      "all",
    [">=", 'risk_score', i],
    ["<=", 'risk_score',slideval2]
  ];


    map.addLayer({
       "id": "segments_final-4isuhz",
       "type": "line",
       "source": 'composite',
       "source-layer": "segments_final-4isuhz",
       "filter": ["has","risk_score"],
       "paint": {
           //"line-color": `${segColor}`,
           "line-color": [
             "step",
             ["get","risk_score"],
             "#000000",
             20,
             "#a2ef07",
             40,
             "#f6f913",
             60,
             "#ef8e26",
             80,
             "#f90021"
           ],
           "line-width": 2.5
       }
    }); //console.log(new_Filter);

//map.setFilter('segments_final-4isuhz', new_Filter);
  }
//map.setFilter('segments_final-4isuhz', new_Filter);


*/
