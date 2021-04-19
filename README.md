## NZGB Test

Click and get info from place name.  Raster and vector tile set-up.

### Test Site

https://xycarto.github.io/vectortile-test/

### Tippecanoe to create vector tile cache
tippecanoe --no-tile-compression --no-clipping -b 127 -pk -r1 -d 8 -D 8 --output-to-directory "./tiles" /data/wellyRegion_townBay_wgs.geojson

#### Notes

1. JSON best if in EPSG:4326 before caching
2. Testing on localhost, it is necessary to disable caching in Firefox
3. Works poorly in Safari
4. Not mobile friendly