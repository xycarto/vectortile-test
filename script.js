var settings = {
    maxZoom: 19, 
    attribution: '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>', //Simple attribution for linz
  };

 
  var styles = {
    interactive: true,
    getFeatureID: function(f) {
      return f.layer.properties;
    },
    vectorTileLayerStyles: {
      'LiDAR_available_now': function(properties,zoom) {
          var level = map.getZoom();
          var weight = 0;
          if (level >= 8) {weight = 1.5;}
          return {
            weight: weight,
            opacity: 1,
            color: "#d677d6",
            fillColor: "#e4a5e4",
            fillOpacity: 0.75,
            fill: true
          }
    }}
  };

  /*
  var highlight;
  var clearHighlight = function() {
    if (highlight) {
      vector.resetFeatureStyle(highlight);
    }
    highlight = null;
  };
  */

  //var url = "http://localhost:8000/available_now/{z}/{x}/{y}.pbf";

//L.tileLayer('https://xycarto.github.io/vectortile-test/available_now/{z}/{x}/{y}.pbf')
  
var url = "https://xycarto.github.io/vectortile-test/available_now/{z}/{x}/{y}.pbf";


var vector = L.vectorGrid.protobuf(url, styles)
  .on('click', function(e) {
    L.popup()
      .setContent('Name: ' + e.layer.properties.name + ' <br></br>' + 'DEM: ' + e.layer.properties.DataDEM)
      .setLatLng(e.latlng)
      .openOn(map);
  });

var basemap = new L.TileLayer('https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png', settings)

//map.on('click', clearHighlight);

var map = new L.Map('map',
 {center: [-39.9, 175.2], 
 zoom: 6,
 layers: [basemap, vector]
 }); 

map.addLayer(map);


