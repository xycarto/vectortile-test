// pop-up elemants
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var popTitle = document.getElementById('popTitle');
var popStory = document.getElementById('popStory');

// Layer for pop up

var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
 closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
}

// Tile Services Map
var urlTemplate =
  "https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png";

// Set raster layer
var layer = new ol.layer.Tile({
  //maxZoom: 10,
  source: new ol.source.XYZ({
    url: urlTemplate
  })
});

// Set vector layer 

var placesource = new ol.source.VectorTile({
  cacheSize: 1,
  overlaps: false,
  tilePixelRatio: 1, // oversampling when > 1
  tileGrid: ol.tilegrid.createXYZ({ maxZoom: 14, tileSize: 4096}),
  format: new ol.format.MVT(),
  url: 'https://xycarto.github.io/vectortile-test/tiles/{z}/{x}/{y}.pbf'

});


// vector tile styles

// Build Vector Map

var vectorMap = new ol.layer.VectorTile({
  //style: olms.applyStyle('http://localhost:8000/style.json'),
  declutter: true,
  source: placesource,
  renderMode: 'vector',
  zIndex: 10
  
})


// Load Map to "map"

var map = new ol.Map({
  target: 'map',
  layers: [layer, vectorMap],
  //style: "http://localhost:8000/style.json",
  view: new ol.View({
    minZoom: 0,
    maxZoom: 14,
    center: ol.proj.transform(
      [174.803467, -41.302571],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 10,
    //overlays: overlay,
  })
});

map.addOverlay(overlay);

//olms.applyStyle('vectorMap', 'wellyRegion_townBay_wgs', 'wellyRegion_townBay_wgs', 'http://localhost:8000/style.json');

fetch('http://localhost:8000/styleText.json').then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(vectorMap, glStyle, 'wellyRegion_townBay_wgs');
  });
});

//Select Features

map.on('click', showInfo);

function showInfo(evt) {
  var coordinate = evt.coordinate;
  console.log(coordinate);
  //content.innerHTML = 'you clicked here';
  
  var features = map.getFeaturesAtPixel(evt.pixel);

  if (!features.length) {
    content = {};
    //content.style.opacity = 0;
    overlay.changed();
    return;
  }

  console.log(features[0].getProperties().name_ascii);
  var title = features[0].getProperties().name_ascii;
  var story = features[0].getProperties().desc_code;
  popTitle.innerHTML = title + '<hr>';
  popStory.innerHTML = title + ' is considered a ' + story + ' by the LINZ geographic placenames layer. This pop up window is here to demonstrate how we can collect data from the attibutes of a vector tile, derived from a shapefile, and display those results in a window.  The ' + story + ' is taken directly from attibutes of the vector tile; as well as the ' + title + ' name.';
  //content.style.opacity = 1;

  overlay.setPosition(coordinate);
};
