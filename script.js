var settingsBasemap = {
    maxZoom: 19, 
    attribution: '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>', //Simple attribution for linz
};

 
//Vector tiles

//layer url
var urlVector = "https://xycarto.github.io/vectortile-test/available_now/{z}/{x}/{y}.pbf";

var stylesStart = {
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


var vector = L.vectorGrid.protobuf(urlVector, stylesStart)
.on('click', function(e) {
    L.popup()
      .setContent('Name: ' + e.layer.properties.name + ' <br></br>' + 'DEM: ' + e.layer.properties.DataDEM)
      .setLatLng(e.latlng)
      .openOn(map);
})
.on("mouseover", function(e) {
  e.layer.setStyle({
    fillColor: "yellow"
  })
})
.on("mouseout", function(e) {
  e.layer.setStyle({
    //weight: weight,
    opacity: 1,
    color: "#d677d6",
    fillColor: "#e4a5e4",
    fillOpacity: 0.75,
    fill: true
  });
});

//Base map
var basemap = new L.TileLayer('https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png', settingsBasemap)


//build all maps
var map = new L.Map('map',
 {center: [-39.9, 175.2], 
 zoom: 6,
 layers: [basemap, vector]
}); 

map.addLayer(map);


