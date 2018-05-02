

var riskPaint = function() {
  map.setPaintProperty({
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
    ]
  });
}

var trafficPaint = {
  field: "risk_score",
  colors: ["#000000", "#a2ef07", "#f6f913", "#ef8e26", "#f90021"],
  breaks: [20, 40, 60, 80],
  mode: "step"
}
