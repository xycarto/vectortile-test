var settingsBasemap = {
    maxZoom: 19, 
    attribution: '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>', //Simple attribution for linz
};

//Begin vector tiles

//Vector Tiles: Available

//layer url
var urlVectorAvailable = "https://xycarto.github.io/vectortile-test/available_now/{z}/{x}/{y}.pbf";

var stylesStartAvailable = {
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

//add functionality to vector layer
var vectorAvailable = L.vectorGrid.protobuf(urlVectorAvailable, stylesStartAvailable)
.on('click', function(e) {
    L.popup()
      .setContent('Name: ' + e.layer.properties.name + ' <br></br>' + 'Digital Elevation Model: ' + '<a href="' + e.layer.properties.DataDEM + '" target="_blank">DEM</a>' + ' <br></br>' + 'Digital Surface Model: '  + '<a href="'+ e.layer.properties.DataDSM + '" target="_blank">DSM</a>' + ' <br></br>' + 'Point Cloud: ' + '<a href="' + e.layer.properties.DataPointC+ '" target="_blank">LAS</a>' )
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


//Vector Tiles: Coming Soon

//layer url
var urlVectorComingSoon = "https://xycarto.github.io/vectortile-test/ComingSoon/{z}/{x}/{y}.pbf";

var stylesStartComingSoon = {
    interactive: true,
    getFeatureID: function(f) {
      return f.layer.properties;
    },
    vectorTileLayerStyles: {
      'ComingSoon': function(properties,zoom) {
          var level = map.getZoom();
          var weight = 0;
          if (level >= 8) {weight = 1.5;}
          return {
            weight: weight,
            opacity: 1,
            color: "#d677d6",
            fillColor: "blue",
            fillOpacity: 0.75,
            fill: true
          }
    }}
};

//add functionality to vector layer
var vectorComingSoon = L.vectorGrid.protobuf(urlVectorComingSoon, stylesStartComingSoon)
.on('click', function(e) {
    L.popup()
      .setContent('Name: ' + e.layer.properties.name)
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
    fillColor: "blue",
    fillOpacity: 0.75,
    fill: true
  });
});

//Vector Tiles: In Progress

//layer url
var urlVectorInProgress = "https://xycarto.github.io/vectortile-test/InProgress/{z}/{x}/{y}.pbf";

var stylesStartInProgress = {
    interactive: true,
    getFeatureID: function(f) {
      return f.layer.properties;
    },
    vectorTileLayerStyles: {
      'InProgress': function(properties,zoom) {
          var level = map.getZoom();
          var weight = 0;
          if (level >= 8) {weight = 1.5;}
          return {
            weight: weight,
            opacity: 1,
            color: "#d677d6",
            fillColor: "red",
            fillOpacity: 0.75,
            fill: true
          }
    }}
};

//add functionality to vector layer
var vectorInProgress = L.vectorGrid.protobuf(urlVectorInProgress, stylesStartInProgress)
.on('click', function(e) {
    L.popup()
      .setContent('Name: ' + e.layer.properties.name)
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
    fillColor: "red",
    fillOpacity: 0.75,
    fill: true
  });
});

// end vector tiles

//Base map
var basemap = new L.TileLayer('https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png', settingsBasemap)

// Layer control
var basemaps = {
  "LINZ Colour Base Map": basemap
};

var overlays = {
  "Available Now": vectorAvailable,
  "Coming Soon": vectorComingSoon,
  "In Progress": vectorInProgress
};

var settingsControl = {
collapsed: false
};

//end layer control

//build all maps
var map = new L.Map('map',
 {center: [-39.9, 175.2], 
 zoom: 6,
 layers: basemap
}); 

//L.Control.Zoom({ position: 'bottomright' }).addTo(map);

L.control.layers(basemaps, overlays, settingsControl).addTo(map);

map.addLayer(map);



//map.addControl(new L.Control.Permalink({ text: 'Permalink', layers: layers }));


