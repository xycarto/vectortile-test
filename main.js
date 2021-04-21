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
  maxZoom: 14,
  source: new ol.source.XYZ({
    url: urlTemplate
  })
});

// Set vector layer 

var placesource = new ol.source.VectorTile({
  cacheSize: 0,
  overlaps: false,
  tilePixelRatio: 1, // oversampling when > 1
  tileGrid: ol.tilegrid.createXYZ({ maxZoom: 14, tileSize: 4096}),
  format: new ol.format.MVT(),
  url: 'https://xycarto.github.io/vectortile-test/tiles/{z}/{x}/{y}.pbf'

});


// vector tile styles

var fill = new ol.style.Fill({
  color: '#f4f2e5'
})

var stroke =new ol.style.Stroke({
  color: '#f4f2e5',
  width: 0
})

var labelStyle = new ol.style.Style({
  text: new ol.style.Text({
    //font: '10px Calibri,sans-serif',
    offsetX : -20,
    offsetY : -12,
    overflow: true,
    fill: new ol.style.Fill({
      color: '#f4f2e5',
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(50,65,50,0.85)',
      width: 3,
    }),
  }),
  image: new ol.style.Circle({
    fill: fill,
    stroke: stroke,
    radius: 2}),
      
});

var labelStyle_largeScale = new ol.style.Style({
  text: new ol.style.Text({
    //font: '10px Calibri,sans-serif',
    offsetX : 0,
    offsetY : 0,
    overflow: true,
    fill: new ol.style.Fill({
      color: '#f4f2e5',
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(50,65,50,0.85)',
      width: 3,
    }),
  }),
  image: new ol.style.Circle({
    fill: fill,
    stroke: stroke,
    radius: 0}),
      
});

var waterStyle = new ol.style.Style({
  text: new ol.style.Text({
    //font: 'Calibri,sans-serif',
    offsetX : 0,
    offsetY : 0,
    overflow: true,
    fill: new ol.style.Fill({
      color: '#55717d',
    }),
    stroke: new ol.style.Stroke({
      color: '#dceaf0',
      width: 3,
    }),
  }),
  image: new ol.style.Circle({
    fill: fill,
    stroke: stroke,
    radius: 0}),
      
});


// Apply styling to vector tile according to attributes

var vectorMap = new ol.layer.VectorTile({
  style: function (feature) {
    //labelStyle.getText().setText(feature.get('name'));
    var descCode = feature.get('desc_code');
    var zoomCheck = map.getView().getZoom();
    var textSize = feature.get('size') * 2.5;
    var textSizeSmallZoom = feature.get('size');
    if (zoomCheck < 10 && descCode === "METR") {
        if (descCode === "BAY") {
          waterStyle.getText().setFont('italic ' + textSizeSmallZoom + 'px "Calibri", sans-serif');
          waterStyle.getText().setText(feature.get('name'));
          return waterStyle;
        } else {
          labelStyle.getText().setFont(textSizeSmallZoom + 'px "Calibri", sans-serif');
          labelStyle.getText().setText(feature.get('name'));
          return labelStyle;
        } 
    } else if ((zoomCheck >= 10 && zoomCheck <= 12 && descCode === "METR" ) || (zoomCheck >= 10 && zoomCheck <= 12 && descCode === "SBRB" )) {
        if (descCode === "BAY") {
          waterStyle.getText().setFont('italic ' + textSize + 'px "Calibri", sans-serif');
          waterStyle.getText().setText(feature.get('name'));
          return waterStyle;
        } else {
          labelStyle.getText().setFont(textSize + 'px "Calibri", sans-serif');
          labelStyle.getText().setText(feature.get('name'));
          //console.log(labelStyle.getText());
          return labelStyle;
        }
    } else if (zoomCheck > 12) {
      if (descCode === "BAY") {
        waterStyle.getText().setFont('italic ' + textSize + 'px "Calibri", sans-serif');
        waterStyle.getText().setText(feature.get('name'));
        return waterStyle;
      } else {
        labelStyle_largeScale.getText().setFont(textSize + 'px "Calibri", sans-serif');
        labelStyle_largeScale.getText().setText(feature.get('name'));
        return labelStyle_largeScale;
      }
    }
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
    minZoom: 6,
    maxZoom: 14,
    center: ol.proj.transform(
      [174.7787, -41.2924],
      "EPSG:4326",
      "EPSG:3857"
    ),
    //overlays: [overlay],
    zoom: 10,
  })
});

map.addOverlay(overlay);

//Select Features

map.on('singleclick', showInfo);

function showInfo(evt) {
  var coordinate = evt.coordinate;
  console.log(coordinate);
  //content.innerHTML = 'you clicked here';
  
  var features = map.getFeaturesAtPixel(evt.pixel);
  if (features.length == 0) {
    content.innerText = '';
    content.style.opacity = 0;
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

