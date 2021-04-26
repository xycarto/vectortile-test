## Vector Tile Test

This example uses Openlayers6. The main goal is to load an existing raster tile XYZ tile cache and overlay a vector tile styled with a Mapbox style.json.

1. Load vector tile in Openlayers6
2. Style vector tile with Mapbox style JSON
3. Click and get info from place name.  Raster and vector tile set-up.

### Test Site

https://xycarto.github.io/vectortile-test/

### Tippecanoe to create vector tile cache

Tippecanoe requires JSON input.  Best if this JSON is in EPSG:4326 (WGS). Output is XYZ tile cache with uncompressed PBF.  Tile cache for this example is stored in site directory.  Can use S3 or any other method to save tile cache.

TODO: Work out method to use zipped PBF

```tippecanoe --no-tile-compression --no-clipping -b 127 -pk -r1 -d 8 -D 8 --output-to-directory "./tiles" /data/wellyRegion_townBay_wgs.geojson```

### JS

Some of the imporant bits for the JS. 

For the JS example see: https://github.com/xycarto/vectortile-test/blob/main/main.js
For the style file example see here: https://github.com/xycarto/vectortile-test/blob/main/styleText.json

1. The method in this example is loading the vector tile and overaying it on a raster tile cache.  In order to accomplish this, a vector tile cache must be loaded first to the map, THEN the rules from the style JOSN are applied using:

```
fetch('./styleText.json').then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(vectorMap, glStyle, 'wellyRegion_townBay_wgs');
  });
});
```

2. The above uses `olms.applyStyle`. To access this function you will need to add the scipt tag to your HTML:

```<script src="https://unpkg.com/ol-mapbox-style@6.3.2/dist/olms.js" type="text/javascript"></script>```

#### Notes

1. Testing on localhost, it is necessary to disable caching in Firefox
2. Works poorly in Safari
