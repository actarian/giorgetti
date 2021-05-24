import { Component, getContext } from 'rxcomp';
import { environment } from '../../environment';

let GOOGLE_MAPS;

export class MapComponent extends Component {

	onInit() {
		const apiKey = environment.googleMaps.apiKey;
		if (GOOGLE_MAPS != null) {
			this.initMap();
		} else {
			window.onGoogleMapsLoaded = () => {
				GOOGLE_MAPS = window.google.maps;
				this.initMap();
			};
			const script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', `https://maps.googleapis.com/maps/api/js?callback=onGoogleMapsLoaded${apiKey ? `&key=${apiKey}` : ''}&libraries=places`);
			(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script);
		}
	}

	initMap() {
		const google = window.google;
		const { node } = getContext(this);
		const latitude = node.getAttribute('data-latitude');
		const longitude = node.getAttribute('data-longitude');
		const position = new google.maps.LatLng(latitude, longitude);
		const mapOptions = {
			zoom: 17,
			center: position,

			scrollwheel: false,
			// mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: true,
			scaleControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.DEFAULT
			},
			overviewMapControl: true,

			styles: [
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#e9e9e9"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#f5f5f5"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 29
						},
						{
							"weight": 0.2
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 18
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#f5f5f5"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#dedede"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"saturation": 36
						},
						{
							"color": "#333333"
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#f2f2f2"
						},
						{
							"lightness": 19
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#fefefe"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#fefefe"
						},
						{
							"lightness": 17
						},
						{
							"weight": 1.2
						}
					]
				}
			]
		};
		const mapElement = node.querySelector('.map');
		const map = new google.maps.Map(mapElement, mapOptions);

		const iconOptions = {
			home: { latitude, longitude },
			text: '<div class="map-popup"><h2>Websolute</h2><p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p></div>',
			icon_url: '/img/marker.png',
			zoom: 15
		}

		const icon = {
			url: iconOptions.icon_url,
			origin: new google.maps.Point(0, 0)
		};

		const marker = new google.maps.Marker({
			position: position,
			map: map,
			icon: icon,
			draggable: false
		});

		const info = new google.maps.InfoWindow({
			content: iconOptions.text
		});

		google.maps.event.addListener(marker, 'click', function() {
			info.open(map, marker);
		});
	}
}

MapComponent.meta = {
	selector: '[map]',
};
