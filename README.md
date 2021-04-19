## NZGB Test

Click and get info from place name.  Raster and vector tile set-up.

### Test Site

https://xycarto.github.io/vectortile-test/

## Tippecanoe to create vector tile cache
tippecanoe --no-tile-compression --no-clipping -b 127 -pk -r1 -d 8 -D 8 --output-to-directory "./tiles" /data/wellyRegion_townBay_wgs.geojson