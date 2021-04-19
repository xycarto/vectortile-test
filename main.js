

//Tile Services Map
var urlTemplate =
  "https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png";

// Set raster layer
var layer = new ol.layer.Tile({
  maxZoom: 14,
  source: new ol.source.XYZ({
    url: urlTemplate
  })
});

var placesource = new ol.source.VectorTile({
  cacheSize: 0,
  overlaps: true,
  tilePixelRatio: 1, // oversampling when > 1
  tileGrid: ol.tilegrid.createXYZ({ maxZoom: 14, tileSize: 4096}),
  format: new ol.format.MVT(),
  url: 'https://xycarto.github.io/vectortile-test/tiles/{z}/{x}/{y}.pbf'

});

var fill = new ol.style.Fill({
  color: 'rgb(255, 255, 255)'
})

var stroke =new ol.style.Stroke({
  color: '#00ff00',
  width: 8
})

var labelStyle = new ol.style.Style({
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    overflow: true,
    fill: new ol.style.Fill({
      color: '#000',
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});

/*
var simpleStyle = new ol.style.Style({
  image: new ol.style.Circle({
    fill: fill,
    stroke: stroke,
    radius: 8}),
  fill: new ol.style.Fill({
    color: 'rgb(255, 255, 255)'
  }),
  stroke: new ol.style.Stroke({
    color: '#00ff00',
    width: 2
  })
})*/


var vectorMap = new ol.layer.VectorTile({
  style: function (feature) {
    labelStyle.getText().setText(feature.get('name'));
    return labelStyle;
  },
  renderMode: 'vector',
  source: placesource,
  declutter: true
})

// Add base map to HTML map container
var map = new ol.Map({
  target: 'map',
  layers: [layer, vectorMap],
  view: new ol.View({
    maxZoom: 14,
    center: ol.proj.transform(
      [174.7787, -41.2924],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 10,
    //minZoom: 12,
    //maxZoom: 15,
  })
});

//***********Select Features */


map.on('click', showInfo);

var info = document.getElementById('info');
function showInfo(event) {
  var features = map.getFeaturesAtPixel(event.pixel);
  if (features.length == 0) {
    info.innerText = '';
    info.style.opacity = 0;
    return;
  }
  var properties = features[0].getProperties();
  info.innerText = JSON.stringify(properties, null, 2);
  info.style.opacity = 1;
}

function refresh() {
  var source = layer.getSource();
  source.tileCache.expireCache({});
  source.tileCache.clear();
  source.refresh();
}