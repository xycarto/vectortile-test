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

// Raster Tile Services Map
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


// Build Vector Map
var vectorMap = new ol.layer.VectorTile({
  declutter: true,
  source: placesource,
  renderMode: 'vector',
  zIndex: 10
  
})


// Load Layers to "map"
var map = new ol.Map({
  target: 'map',
  layers: [layer, vectorMap],
  view: new ol.View({
    minZoom: 0,
    maxZoom: 14,
    center: ol.proj.transform(
      [174.803467, -41.302571],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 10,
  })
});

// Add overlay for Popup window
map.addOverlay(overlay);


// Get JSON for vector tile styles and apply styling to vector tiles
fetch('./styleText.json').then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(vectorMap, glStyle, 'wellyRegion_townBay_wgs');
  });
});

//Select Features
map.on('click', showInfo);

function showInfo(evt) {
  var coordinate = evt.coordinate;
  console.log(coordinate);
  
  var features = map.getFeaturesAtPixel(evt.pixel);

  if (!features.length) {
    content = {};
    overlay.changed();
    return;
  }

  console.log(features[0].getProperties().name_ascii);
  var title = features[0].getProperties().name_ascii;
  var story = features[0].getProperties().desc_code;
  popTitle.innerHTML = title + '<hr>';
  popStory.innerHTML = title + ' is considered a ' + story + ' by the LINZ geographic placenames layer. This pop up window is here to demonstrate how we can collect data from the attibutes of a vector tile, derived from a shapefile, and display those results in a window.  The ' + story + ' is taken directly from attibutes of the vector tile; as well as the ' + title + ' name.';

  overlay.setPosition(coordinate);
};
