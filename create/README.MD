# Countries

* Download data from Natural Earth Data (http://www.naturalearthdata.com/)
  * Cultural / 1:50m
* Download and install GDAL (https://trac.osgeo.org/gdal/wiki/DownloadingGdalBinaries)
* Run _ogr2ogr -f GeoJSON -t_srs crs:84 [name].geojson [name].shp_ 

# Airports

* Download from _https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat_