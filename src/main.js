// Main Javascript file
mapboxgl.accessToken = 'pk.eyJ1IjoidGxhYyIsImEiOiJjamYwY3N6MnYwbG4yMzNvaDlsdzY0NW03In0.cthaFUf4255KncCJn1FmRw';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/tlac/cjf2uugjo2bes2sqncqswxzhf'
});

map.on('click', function(e) {
	var features = map.queryRenderedFeatures(e.point, {
		layers: ['platform-points-and-polygons'] // replace this with the name of the layer
	});

	if (!features.length) {
		return;
	}

	var feature = features[0];

	var popup = new mapboxgl.Popup({ offset: [0, -15] })
		.setLngLat(feature.geometry.coordinates)
		.setHTML('<h3>' + feature.properties.area + '</h3><p>' + feature.properties.direction + '</p>')
		.setLngLat(feature.geometry.coordinates)
		.addTo(map);
});
