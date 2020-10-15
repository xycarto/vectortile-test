
  
var settings = {
    maxZoom: 19, 
    attribution: '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>', //Simple attribution for linz
  };

  var styles = {
    paPointsWebmer: {	// Apply these options to the "water" layer...
      radius: 3,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1.0
    }
  };

var url = "https://xycarto.github.io/vectortile-test/tippe/{z}/{x}/{y}.pbf";



var vector = L.vectorGrid.protobuf(url, {
  vectorTileLayerStyles: styles,
  subdomains: '0123'
});

var basemap = new L.TileLayer('https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png', settings)
  
var map = new L.Map('map',
 {center: [-39.9, 175.2], 
 zoom: 6,
 layers: [basemap, vector]
 }); 

map.addLayer(map);

