
export class MapService {

	static findNearStores(items, center) {
		if (items) {
			items = items.slice();
			items.forEach((item) => {
				item.distance = this.calculateDistance(item.latitude, item.longitude, center.lat, center.lng, 'K');
				// item.visible = (item.cod_stato == window.userCountry || !window.userCountry) && item.distance <= MAX_DISTANCE /* Km */;
			});
			items.sort((a, b) => {
				return a.distance - b.distance;
			});
			return items;
		}
	}

	static calculateDistances(items, center) {
		if (items) {
			items.forEach((item) => {
				item.distance = this.calculateDistance(item.latitude, item.longitude, center.lat, center.lng, 'K');
			});
		}
		return items;
	}

	static calculateDistance(lat1, lon1, lat2, lon2, unit) {
		if ((lat1 == lat2) && (lon1 == lon2)) {
			return 0;
		} else {
			const radlat1 = Math.PI * lat1 / 180;
			const radlat2 = Math.PI * lat2 / 180;
			const theta = lon1 - lon2;
			const radtheta = Math.PI * theta / 180;
			let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180 / Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit == "K") {
				dist = dist * 1.609344;
			}
			if (unit == "N") {
				dist = dist * 0.8684;
			}
			return dist;
		}
	}

	static getBounds(items, count = Number.POSITIVE_INFINITY) {
		const bounds = new google.maps.LatLngBounds();
		items.forEach((item, i) => {
			if (i < count) {
				const position = new google.maps.LatLng(item.latitude, item.longitude);
				bounds.extend(position);
			}
		});
		return bounds;
	}

}
