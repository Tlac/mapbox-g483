navigator.geolocation.getCurrentPosition(function(location) {
	var userLat = location.coords.latitude;
	var userLong = location.coords.longitude;
	mapboxgl.accessToken = 'pk.eyJ1IjoidGxhYyIsImEiOiJjamYwY3N6MnYwbG4yMzNvaDlsdzY0NW03In0.cthaFUf4255KncCJn1FmRw';
	var map = new mapboxgl.Map({
	    container: 'map',
	    style: 'mapbox://styles/mapbox/light-v9',
	    center: [-79.64882165193558,43.5954512100941], //center: [userLat, userLong],
	    zoom: 18
	});

	map.on('load', function () {

		map.addLayer({
		   'id': 'maine',
		   'type': 'fill',
		   'source': {
			   'type': 'geojson',
			   'data': stationPolygons
		   },
		   'layout': {},
		   'paint': {
			   'fill-color': '#088',
			   'fill-opacity': 0.4
		   }
	   });
	   map.addLayer({
		   "id": "busstops",
		   "type": "symbol",
		   "source": {
			   "type": "geojson",
			   "data": platformPoints
		   },
		   "layout": {
			   "icon-image": "bus-15",
			   //"text-field": "{area}",
			   "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
			   "text-offset": [0, 0.6],
			   "text-anchor": "top"
		   }
	   });
	   map.on('click', 'busstops', function (e) {
			var coordinates = e.features[0].geometry.coordinates.slice();
			var description = '';
			var busNumbers = e.features[0].properties.buses.split(',')
			var busTitles = e.features[0].properties.busName.split(',')

			for (index in busNumbers) {
				description += busNumbers[index] + ' ' + (busTitles[index] === 'n/a' || busTitles[index] === undefined ? '' : busTitles[index]) + '<br>';
			}

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			new mapboxgl.Popup()
				.setLngLat(coordinates)
				.setHTML(description)
				.addTo(map);
		});
	});
});
