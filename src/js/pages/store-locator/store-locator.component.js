import { FormControl } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { GoogleMapsService } from '../../common/googlemaps/googlemaps.service';
import { environment } from '../../environment';
import { MapService } from '../../partials/map/map.service';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { StoreLocatorService } from './store-locator.service';

export class StoreLocatorComponent extends FiltersComponent {

	onInit() {
		super.onInit();
		this.autocomplete$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe();
	}

	load$() {
		return combineLatest([
			StoreLocatorService.all$(),
			StoreLocatorService.filters$().pipe(
				map(filters => {
					delete filters.search;
					delete filters.country;
					filters.bounds = {
						label: 'Bounds',
						mode: 'query',
					};
					return filters;
				}),
			),
		]);
	}

	onLoaded() {
		const search = this.filters.search;
		if (search && search.values.length) {
			const value = search.values[0];
			// console.log('StoreLocatorCompoent.onLoaded', value);
			this.autocomplete.value = value;
		}
		if (environment.detectedCountry) {
			this.geocode$({ address: environment.detectedCountry }, 'country').subscribe(place => {
				this.autocomplete.value = place;
			});
		}
	}

	autocompleteSource$(query) {
		return GoogleMapsService.autocomplete$(query);
	}

	autocomplete$() {
		const autocomplete = this.autocomplete = new FormControl(null);
		return autocomplete.changes$.pipe(
			tap(value => {
				let place;
				if (value) {
					if (value.geometry) {
						this.setPlace(value);
					} else if (typeof value.getDetails === 'function' && this.map) {
						value.getDetails(this.map).then(place => {
							// console.log('StoreLocatorComponent.autocomplete.getDetails', place);
							place = {
								name: value.name,
								geometry: place.geometry,
							};
							this.setPlace(place);
						});
					}
				} else {
					place = null;
					this.setPlace(place);
				}
			}),
		);
	}

	setPlace(place) {
		if (this.filters && this.filters.bounds) {
			this.filters.bounds.set(null);
		}
		const items = this.filteredItems;
		const map = this.map;
		if (map) {
			if (place) {
				let minimumBounds = null;
				if (items.length >= 2) {
					const center = place.geometry.location;
					center.lat = center.lat();
					center.lng = center.lng();
					MapService.calculateDistances(items, center);
					this.doSortItemsByDistance(items);
					minimumBounds = new google.maps.LatLngBounds();
					for (let i = 0; i < 2; i++) {
						const item = items[i];
						// console.log(item);
						let lat = item.latitude;
						let lng = item.longitude;
						const p1 = new google.maps.LatLng(lat, lng);
						minimumBounds.extend(p1);
						let lat2 = center.lat + (center.lat - lat);
						let lng2 = center.lng + (center.lng - lng);
						const p2 = new google.maps.LatLng(lat2, lng2);
						minimumBounds.extend(p2);
					}
				}
				if (place.geometry.viewport || minimumBounds) {
					let bounds = place.geometry.viewport;
					if (minimumBounds) {
						bounds = bounds.union(minimumBounds);
					}
					google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
						map.setZoom(Math.min(11, map.getZoom()));
					});
					map.fitBounds(bounds, 0);
				} else {
					map.setCenter(place.geometry.location);
					map.setZoom(11);
				}
			} else {
				const bounds = MapService.getBounds(items);
				google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
					map.setZoom(Math.min(11, map.getZoom()));
				});
				map.fitBounds(bounds);
			}
		}
		this.place = place;
	}

	doFilterItem(key, item, value) {
		switch (key) {
			case 'country':
				return item.country && item.country.id === value;
			case 'category':
				return item.category && item.category.id === value;
			case 'bounds':
				if (value && typeof value.contains === 'function') {
					const position = new google.maps.LatLng(item.latitude, item.longitude);
					return value.contains(position);
				}
				return true;
			case 'search':
				return true;
			/*
			return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
				// item.address.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
				item.city.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
				item.country.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
				*/
			default:
				return false;
		}
	}

	doSortItemsByDistance(items) {
		// console.log('StoreLocatorComponent.doSortItemsByDistance');
		items.sort((a, b) => {
			return a.distance - b.distance;
		});
		return items;
	}

	doSortItemsByRank(items) {
		// console.log('StoreLocatorComponent.doSortItemsByRank');
		const ranks = { 9: 100, 8: 50, 10: 0, 11: 0 };
		items.sort((a, b) => {
			const categoryA = ranks[a.category.id] || 0;
			const categoryB = ranks[b.category.id] || 0;
			const categorySort = categoryB - categoryA;
			if (categorySort !== 0) {
				return categorySort;
			}
			const countrNameA = a.country.name;
			const countrNameB = b.country.name;
			if (countrNameA > countrNameB) return 1;
			if (countrNameA < countrNameB) return -1;
			const cityNameA = a.city;
			const cityNameB = b.city;
			if (cityNameA > cityNameB) return 1;
			if (cityNameA < cityNameB) return -1;
			return a.rank - b.rank;
		});
		return items;
	}

	doSortItems(items) {
		const bounds = this.bounds;
		if (bounds) {
			/*
			const center = bounds.getCenter();
			center.lat = center.lat();
			center.lng = center.lng();
			MapService.calculateDistances(items, center);
			*/
			items = this.doSortItemsByDistance(items);
		} else {
			items = this.doSortItemsByRank(items);
		}
		// items = this.place ? this.doSortItemsByDistance(items) : this.doSortItemsByRank(items);
		return items;
	}

	onMapReady(mapController) {
		this.mapController = mapController;
		this.map = mapController.map;
	}

	onMapDidChange(bounds) {
		this.bounds = bounds;
		// console.log('StoreLocatorComponent.onMapDidChange', bounds, this.filters);
		if (this.filters.bounds) {
			this.filters.bounds.set(bounds);
		}
	}

	/*
	showMore(event) {
		let filteredItems = this.filteredItems;
		if (this.map) {
			filteredItems = this.filteredItems.filter(item => {
				const position = new google.maps.LatLng(item.latitude, item.longitude);
				return bounds.contains(position);
			});
		}
		if (this.visibleItems.length + this.pageSize >= filteredItems.length) {
			this.visibleItems = filteredItems.slice();
		} else {
			this.visibleItems = filteredItems.slice(0, Math.min(this.visibleItems.length + this.pageSize, filteredItems.length));
		}
		this.pushChanges();
		LocomotiveScrollService.update();
	}
	*/

	hasGeolocation() {
		return this.map && navigator.geolocation;
	}

	onGeolocation(event) {
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				this.geocode$({ location }).subscribe(place => {
					this.autocomplete.value = place;
				});
			}, (error) => {
				console.log('StoreLocatorComponent.onGeolocation.error', error);
			});
		} else {
			console.log('Browser doesn\'t support Geolocation');
		}
	}

	geocode$(payload, type = 'administrative_area_level_3') {
		return GoogleMapsService.geocode$(payload).pipe(
			map(results => {
				// console.log('GoogleMapsService.geocode$', results);
				let place = results.find(x => x.types.includes(type));
				const address = place.address_components.find(x => x.types.includes(type));
				place = {
					name: address ? address.long_name : 'current location',
					geometry: place.geometry ? place.geometry : { location },
				}
				// console.log('StoreLocatorComponent.onGeolocation', place);
				return place;
			}),
		);
	}

}

StoreLocatorComponent.meta = {
	selector: '[store-locator]',
};
