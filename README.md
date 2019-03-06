# Visualizing Data with Leaflet.js


![1-Logo](Images/1-Logo.png)

Background: The United States Geological Survey or USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

This project visualizes earthquake data from around the globe.


### Basic Visualization of USGS earthquake data.

![2-BasicMap](Images/2-BasicMap.png)


1. **The data set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php. The visualization uses the URL of the JSON of the past 7 weeks of significant earhquakes.

   ![4-JSON](Images/4-JSON.png)

2. **Importing and Visualizaing the Data**

    The visualization map uses Leaflet.js that plots all of the earthquakes from the data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake in their size and color. 

   * Includes popups that provide additional information about the earthquake when a marker is clicked.

   * Legend provides context for the map data.

- - -

### More Data

![5-Advanced](Images/5-Advanced.png)

A second data set is used on the map to illustrate the relationship between tectonic plates and seismic activity. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

* A number of base maps to choose from are added and our two different data sets are put into overlays that can be turned on and off independently.
