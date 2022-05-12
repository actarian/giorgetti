


import { from, Observable, of } from 'rxjs';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { environment } from '../../environment';
import { OnceService } from '../once/once.service';

export class GoogleMapsService {

	static maps;

	static init() {
		if (!environment.googleMaps || !environment.googleMaps.apiKey) {
			throw new Error('GoogleMapsService.error missing apiKey in environment.googleMaps');
		}
	}

	static maps$() {
		return new Observable().pipe(_ => {
			if (this.maps) {
				return of(this.maps);
			} else {
				return this.once$();
			}
		});
	}

	static once$() {
		if (!environment.googleMaps || !environment.googleMaps.apiKey) {
			throw new Error('GoogleMapsService.error missing apiKey in environment.googleMaps');
		}
		return OnceService.script$(`//maps.googleapis.com/maps/api/js?callback={{callback}}&key=${environment.googleMaps.apiKey}&libraries=places&language=${environment.currentLanguage}`, true).pipe(
			concatMap(_ => {
				this.maps = window.google.maps;
				return of(this.maps);
			})
		);
	}

	static geocode$(data) {
		// console.log('GoogleMapsService.geocode$', data);
		return GoogleMapsService.maps$().pipe(
			switchMap(maps => {
				// console.log('GoogleMapsService.geocode$', maps);
				return from(new Promise((resolve, reject) => {
					const geocoder = new maps.Geocoder();
					geocoder.geocode(data, (results, status) => {
						// console.log('GoogleMapsService.geocode$', status, results);
						if (status == 'OK') {
							resolve(results);
						} else {
							reject(results);
						}
					});
				}));
			}),
		);
	}

	static getAutocompleteService(maps) {
		if (!this.autocompleteService_) {
			this.autocompleteService_ = new maps.places.AutocompleteService();
		}
		return this.autocompleteService_;
	}

	static getPlaceService(maps, map) {
		if (!this.placeService_) {
			this.placeService_ = new maps.places.PlacesService(map);
		}
		return this.placeService_;
	}

	static autocomplete$(query) {
		// console.log('GoogleMapsService.autocomplete$', query);
		/*
		input
		Type:  string
		The user entered input string.

		bounds optional
		Type:  LatLngBounds|LatLngBoundsLiteral optional
		Bounds for prediction biasing. Predictions will be biased towards, but not restricted to, the given bounds. Both location and radius will be ignored if bounds is set.

		componentRestrictions optional
		Type:  ComponentRestrictions optional
		The component restrictions. Component restrictions are used to restrict predictions to only those within the parent component. For example, the country.

		location optional
		Type:  LatLng optional
		Location for prediction biasing. Predictions will be biased towards the given location and radius. Alternatively, bounds can be used.

		offset optional
		Type:  number optional
		The character position in the input term at which the service uses text for predictions (the position of the cursor in the input field).

		origin optional
		Type:  LatLng|LatLngLiteral optional
		The location where AutocompletePrediction.distance_meters is calculated from.

		radius optional
		Type:  number optional
		The radius of the area used for prediction biasing. The radius is specified in meters, and must always be accompanied by a location property. Alternatively, bounds can be used.

		sessionToken optional
		Type:  AutocompleteSessionToken optional
		Unique reference used to bundle individual requests into sessions.

		types optional
		Type:  Array<string> optional
		The types of predictions to be returned. For a list of supported types, see the developer's guide. If nothing is specified, all types are returned. In general only a single type is allowed. The exception is that you can safely mix the 'geocode' and 'establishment' types, but note that this will have the same effect as specifying no types.
		*/
		return GoogleMapsService.maps$().pipe(
			switchMap(maps => {
				const autocompleteService = this.getAutocompleteService(maps);
				return from(new Promise((resolve, reject) => {
					const options = {
						input: query,
						// fields: ["formatted_address", "geometry", "name"],
						// strictBounds: false,
						// types: ["locality", "sublocality", "postal_code", "country", "administrative_area_level_1", "administrative_area_level_2", "administrative_area_level_3"],
					};
					// console.log('GoogleMapsService.autocomplete$', options);
					autocompleteService.getPlacePredictions(options, (predictions, status) => {
						if (status === maps.places.PlacesServiceStatus.OK && predictions && predictions.length) {
							predictions = predictions.map(prediction => {
								// console.log(prediction);
								return {
									id: prediction.place_id,
									name: prediction.description,
									description: prediction.description,
									/*
									lat: prediction.geometry.location.lat(),
									lng: prediction.geometry.location.lng(),
									*/
									getDetails: (map) => {
										const request = {
											placeId: prediction.place_id,
											fields: ['name', 'address_component', 'geometry.location', 'geometry.viewport'],
										};
										return new Promise((resolve, reject) => {
											const placeService = this.getPlaceService(maps, map);
											placeService.getDetails(request, (place, status) => {
												if (status == maps.places.PlacesServiceStatus.OK) {
													// console.log(place);
													const components = place.address_components;
													const streetNumber = components.find((x) => x.types.includes('street_number'));
													const streetNumberName = streetNumber ? streetNumber.short_name : '';
													const route = components.find((x) => x.types.includes('route'));
													const routeName = route ? route.short_name : '';
													const locality = components.find((x) => x.types.includes('locality'));
													const localityName = locality ? locality.short_name : '';
													const postal_code = components.find((x) => x.types.includes('postal_code'));
													const zipCode = postal_code ? postal_code.short_name : '';
													const city = components.find((x) => x.types.includes('administrative_area_level_3'));
													const cityName = city ? city.short_name : '';
													const province = components.find((x) => x.types.includes('administrative_area_level_2'));
													const provinceName = province ? province.short_name : '';
													const country = components.find((x) => x.types.includes('country'));
													const countryName = country ? country.long_name : '';
													const address = (route ? routeName : '') + (streetNumber ? ', ' + streetNumberName : '') + (locality && (!city || cityName !== localityName) ? ', ' + localityName : '');
													// console.log(place);
													const location = place.geometry ? place.geometry.location : null;
													const latitude = location ? location.lat() : null;
													const longitude = location ? location.lng() : null;
													resolve({
														streetNumber: streetNumberName,
														route: routeName,
														locality: localityName,
														zipCode: zipCode,
														city: cityName,
														province: provinceName,
														country: countryName,
														address: address,
														latitude: latitude,
														longitude: longitude,
														geometry: place.geometry,
													});
												} else {
													reject(status);
												}
											});
										});
									}
								};
							});
							resolve(predictions);
						} else {
							reject(status);
						}
					});
				})).pipe(
					catchError(error => {
						console.error(error);
						return of([]);
					})
				);
			}),
		);
	}

}
