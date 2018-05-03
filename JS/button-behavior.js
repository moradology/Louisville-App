
var paintAs = function(prop) {
  map.setPaintProperty('streets', "line-color", ["interpolate", ['linear'], ["get", prop], 0, "#FF0000", 1, "#0000FF"]);
};


var bikePaint = function() {
  map.setPaintProperty('streets', "line-color", ["interpolate", ['linear'], ["get", "BIKEWAY"], 0, "#FF0000", 1, "#0000FF"]);
};

var onewayPaint = function() {
  map.setPaintProperty('streets', "line-color", ["interpolate", ['linear'], ["get", "ONEWAY"], 0, "#FF0000", 1, "#0000FF"]);
};

var traffsigPaint = function() {
  map.setPaintProperty('streets', "line-color", ["interpolate", ['linear'], ["get", "TrafficSig"], 0, "#FF0000", 1, "#0000FF"]);
};

var remtraffsigPaint = function() {

};

var trafficPaint = {
  field: "risk_score",
  colors: ["#000000", "#a2ef07", "#f6f913", "#ef8e26", "#f90021"],
  breaks: [20, 40, 60, 80],
  mode: "step"
}

var closeOverlay = function() {
    var x = document.getElementById("features");
        x.style.display = "none";
};


$('#remove-layers').click(function() { remtraffsigPaint() });//doesn't matter what property chosen here
$('#ONEWAY').click(function() { paintAs('ONEWAY') });
$('#BIKEWAY').click(function() { paintAs('BIKEWAY') });
$('#TrafficSig').click(function() { paintAs('TrafficSig') });
