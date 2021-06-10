/**
 * @license giorgetti v1.0.0
 * (c) 2021 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(require('rxcomp'),require('rxcomp-form'),require('rxjs/operators'),require('rxjs')):typeof define==='function'&&define.amd?define(['rxcomp','rxcomp-form','rxjs/operators','rxjs'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.rxcomp,g.rxcomp.form,g.rxjs.operators,g.rxjs));}(this,(function(rxcomp, rxcompForm, operators, rxjs){'use strict';function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}var ModalEvent = function ModalEvent(data) {
  this.data = data;
};
var ModalResolveEvent = /*#__PURE__*/function (_ModalEvent) {
  _inheritsLoose(ModalResolveEvent, _ModalEvent);

  function ModalResolveEvent() {
    return _ModalEvent.apply(this, arguments) || this;
  }

  return ModalResolveEvent;
}(ModalEvent);
var ModalRejectEvent = /*#__PURE__*/function (_ModalEvent2) {
  _inheritsLoose(ModalRejectEvent, _ModalEvent2);

  function ModalRejectEvent() {
    return _ModalEvent2.apply(this, arguments) || this;
  }

  return ModalRejectEvent;
}(ModalEvent);
var ModalService = /*#__PURE__*/function () {
  function ModalService() {}

  ModalService.open$ = function open$(modal) {
    var _this = this;

    return this.getTemplate$(modal.src).pipe(operators.map(function (template) {
      return {
        node: _this.getNode(template),
        data: modal.data,
        modal: modal
      };
    }), operators.tap(function (node) {
      _this.modal$.next(node);

      _this.hasModal = true;
    }), operators.switchMap(function (node) {
      return _this.events$;
    }), operators.tap(function (_) {
      return _this.hasModal = false;
    }));
  };

  ModalService.load$ = function load$(modal) {};

  ModalService.getTemplate$ = function getTemplate$(url) {
    return rxjs.from(fetch(url).then(function (response) {
      return response.text();
    }));
  };

  ModalService.getNode = function getNode(template) {
    var div = document.createElement('div');
    div.innerHTML = template;
    var node = div.firstElementChild;
    return node;
  };

  ModalService.reject = function reject(data) {
    this.modal$.next(null);
    this.events$.next(new ModalRejectEvent(data));
  };

  ModalService.resolve = function resolve(data) {
    this.modal$.next(null);
    this.events$.next(new ModalResolveEvent(data));
  };

  return ModalService;
}();

_defineProperty(ModalService, "hasModal", false);

ModalService.modal$ = new rxjs.Subject();
ModalService.events$ = new rxjs.Subject();var Utils = /*#__PURE__*/function () {
  function Utils() {}

  Utils.merge = function merge(target, source) {
    var _this = this;

    if (typeof source === 'object') {
      Object.keys(source).forEach(function (key) {
        var value = source[key];

        if (typeof value === 'object' && !Array.isArray(value)) {
          target[key] = _this.merge(target[key], value);
        } else {
          target[key] = value;
        }
      });
    }

    return target;
  };

  return Utils;
}();var environmentServed = {
  flags: {
    production: true
  },
  api: '/api',
  assets: '/Client/docs/',
  workers: {
    image: '/Client/docs/js/workers/image.service.worker.js',
    prefetch: '/Client/docs/js/workers/prefetch.service.worker.js'
  },
  githubDocs: 'https://raw.githubusercontent.com/actarian/giorgetti/main/docs/',
  slug: {
    configureProduct: "/Client/docs/products-configure.html",
    reservedArea: "/Client/docs/reserved-area.html"
  },
  template: {
    modal: {
      userModal: '/template/common/user-modal.cshtml',
      projectsRegistrationModal: '/template/common/projects-registration-modal.cshtml',
      materialsModal: '/template/common/materials-modal.cshtml'
    }
  },
  googleMaps: {
    apiKey: 'AIzaSyDvGw6iAoKdRv8mmaC9GeT-LWLPQtA8p60'
  }
};var environmentStatic = {
  flags: {
    production: false
  },
  api: '/giorgetti/api',
  assets: '/giorgetti/',
  workers: {
    image: './js/workers/image.service.worker.js',
    prefetch: './js/workers/prefetch.service.worker.js'
  },
  githubDocs: 'https://raw.githubusercontent.com/actarian/giorgetti/main/docs/',
  slug: {
    configureProduct: "/giorgetti/products-configure.html",
    reservedArea: "/giorgetti/reserved-area.html"
  },
  template: {
    modal: {
      userModal: '/giorgetti/user-modal.html',
      projectsRegistrationModal: '/giorgetti/projects-registration-modal.html',
      materialsModal: '/giorgetti/materials-modal.html'
    }
  },
  googleMaps: {
    apiKey: 'AIzaSyAIsa4g8z-HPPwohsf8jzVTbKw-DiI8k5w'
  }
};var NODE = typeof module !== 'undefined' && module.exports;
var PARAMS = NODE ? {
  get: function get() {}
} : new URLSearchParams(window.location.search);
var DEBUG =  PARAMS.get('debug') != null;
var BASE_HREF = NODE ? null : document.querySelector('base').getAttribute('href');
var HEROKU = NODE ? false : window && window.location.host.indexOf('herokuapp') !== -1;
var STATIC = NODE ? false : HEROKU || window && (window.location.port === '48481' || window.location.port === '5000' || window.location.port === '6443' || window.location.host === 'actarian.github.io');
var DEVELOPMENT = NODE ? false : window && ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.host.split(':')[0]) !== -1;
var PRODUCTION = !DEVELOPMENT;
var ENV = {
  STATIC: STATIC,
  DEVELOPMENT: DEVELOPMENT,
  PRODUCTION: PRODUCTION
};
var Environment = /*#__PURE__*/function () {
  var _proto = Environment.prototype;

  _proto.getAbsoluteUrl = function getAbsoluteUrl(path, params) {
    var url = "" + window.location.origin + path; // let url = `${window.location.protocol}//${window.location.host}${path}`;

    Object.keys(params).forEach(function (key) {
      url = url.replace("$" + key, params[key]);
    });
    return url;
  };

  _proto.getPath = function getPath(path) {
    return this.isLocal(path) ? this.href + path : path;
  };

  _proto.isLocal = function isLocal(path) {
    return path.indexOf('://') === -1;
  };

  function Environment(options) {
    if (options) {
      Object.assign(this, options);
    }
  }

  _createClass(Environment, [{
    key: "STATIC",
    get: function get() {
      return ENV.STATIC;
    },
    set: function set(STATIC) {
      ENV.STATIC = STATIC === true || STATIC === 'true';
      console.log('Environment.STATIC.set', ENV.STATIC);
    }
  }, {
    key: "href",
    get: function get() {
      if (HEROKU) {
        return this.githubDocs;
      } else {
        return BASE_HREF;
      }
    }
  }]);

  return Environment;
}();
var defaultOptions = {
  port: 5000,
  flags: {
    production: false,
    heroku: HEROKU
  },
  slug: {},
  languages: ['it', 'en'],
  defaultLanguage: 'it',
  labels: {
    select: 'Seleziona',
    browse: 'Sfoglia',
    cancel: 'Annulla',
    error_email: 'Email non valida',
    error_match: 'I campi non corrispondono',
    error_required: 'Campo obbligatorio',
    loading: 'caricamento',
    remove: 'Rimuovi',
    required: 'Richiesto',
    select_file: 'Seleziona una file...',
    update: 'Aggiorna',
    upload: 'Carica',
    drag_and_drop_images: 'Drag And Drop your images here'
  }
};
var environmentOptions = window.STATIC ? environmentStatic : environmentServed;
var options = Object.assign(defaultOptions, environmentOptions);
options = Utils.merge(options, window.environment);
var environment = new Environment(options);
console.log('environment', environment);var LocalStorageService = /*#__PURE__*/function () {
  function LocalStorageService() {}

  LocalStorageService.delete = function _delete(name) {
    if (this.isLocalStorageSupported()) {
      window.localStorage.removeItem(name);
    }
  };

  LocalStorageService.exist = function exist(name) {
    if (this.isLocalStorageSupported()) {
      return window.localStorage[name] !== undefined;
    }
  };

  LocalStorageService.get = function get(name) {
    var value = null;

    if (this.isLocalStorageSupported() && window.localStorage[name] !== undefined) {
      try {
        value = JSON.parse(window.localStorage[name]);
      } catch (e) {
        console.log('LocalStorageService.get.error parsing', name, e);
      }
    }

    return value;
  };

  LocalStorageService.set = function set(name, value) {
    if (this.isLocalStorageSupported()) {
      try {
        var cache = [];
        var json = JSON.stringify(value, function (key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }

            cache.push(value);
          }

          return value;
        });
        window.localStorage.setItem(name, json);
      } catch (e) {
        console.log('LocalStorageService.set.error serializing', name, value, e);
      }
    }
  };

  LocalStorageService.isLocalStorageSupported = function isLocalStorageSupported() {
    if (this.supported) {
      return true;
    }

    var supported = false;

    try {
      supported = 'localStorage' in window && window.localStorage !== null;

      if (supported) {
        window.localStorage.setItem('test', '1');
        window.localStorage.removeItem('test');
      } else {
        supported = false;
      }
    } catch (e) {
      supported = false;
    }

    this.supported = supported;
    return supported;
  };

  return LocalStorageService;
}();var CartService = /*#__PURE__*/function () {
  function CartService() {}

  CartService.active$ = function active$() {
    var page = document.querySelector('.page');
    return CartService.active$_.pipe(operators.distinctUntilChanged(), operators.tap(function (active) {
      active ? page.classList.add('cart-mini-active') : page.classList.remove('cart-mini-active');
    }));
  };

  CartService.setActive = function setActive(active) {
    this.active$_.next(active);
  };

  CartService.hasItem = function hasItem(item) {
    var items = CartService.currentItems;
    var index = items.reduce(function (p, c, i) {
      return p !== -1 ? p : c.id === item.id ? i : p;
    }, -1);
    return index !== -1;
  };

  CartService.setItems = function setItems(items) {
    if (items) {
      LocalStorageService.set('items', items);
    } else {
      LocalStorageService.delete('items');
    }

    CartService.items$_.next(items);
  };

  CartService.items$ = function items$() {
    var localItems = LocalStorageService.get('items') || [];
    return rxjs.of(localItems).pipe(operators.switchMap(function (items) {
      CartService.setItems(items);
      return CartService.items$_;
    }));
  };

  CartService.incrementItem$ = function incrementItem$(item) {
    return rxjs.of(item).pipe(operators.map(function (item) {
      var items = CartService.currentItems.slice();
      var item_ = items.find(function (item_) {
        return item_.id === item.id;
      });

      if (item_) {
        item_.qty++;
        CartService.setItems(items);
        return item_;
      } else {
        return null;
      }
    }));
  };

  CartService.decrementItem$ = function decrementItem$(item) {
    return rxjs.of(item).pipe(operators.switchMap(function (item) {
      var items = CartService.currentItems.slice();
      var item_ = items.find(function (item_) {
        return item_.id === item.id;
      });

      if (item_) {
        item_.qty--;

        if (item_.qty > 0) {
          CartService.setItems(items);
          return rxjs.of(item_);
        } else {
          return CartService.removeItem$(item);
        }
      } else {
        return rxjs.of(null);
      }
    }));
  };

  CartService.addItem$ = function addItem$(item) {
    return rxjs.of(Object.assign({
      qty: 1
    }, item)).pipe(operators.map(function (item) {
      var items = CartService.currentItems.slice();
      var index = items.reduce(function (p, c, i) {
        return p !== -1 ? p : c.id === item.id ? i : p;
      }, -1);

      if (index === -1) {
        items.push(item);
        CartService.setItems(items);
        return item;
      } else {
        return null;
      }
    }));
  };

  CartService.removeItem$ = function removeItem$(item) {
    return rxjs.of(item).pipe(operators.map(function (item) {
      var items = CartService.currentItems.slice();
      var index = items.reduce(function (p, c, i) {
        return p !== -1 ? p : c.id === item.id ? i : p;
      }, -1);

      if (index !== -1) {
        items.splice(index, 1);

        if (items.length === 0) {
          CartService.setActive(false);
        }

        CartService.setItems(items);
        return item;
      } else {
        return null;
      }
    }));
  };

  CartService.removeAll$ = function removeAll$() {
    return rxjs.of([]).pipe(operators.map(function (items) {
      CartService.setActive(false);
      CartService.setItems(items);
      return items;
    }));
  };

  _createClass(CartService, null, [{
    key: "active",
    get: function get() {
      return CartService.active$_.getValue();
    }
  }, {
    key: "currentItems",
    get: function get() {
      return CartService.items$_.getValue();
    }
  }, {
    key: "count",
    get: function get() {
      return CartService.currentItems.length;
    }
  }]);

  return CartService;
}();

_defineProperty(CartService, "active$_", new rxjs.BehaviorSubject(false));

_defineProperty(CartService, "items$_", new rxjs.BehaviorSubject([]));var HttpService = /*#__PURE__*/function () {
  function HttpService() {}

  HttpService.http$ = function http$(method, url, data, format, userPass) {
    var _this = this;

    if (userPass === void 0) {
      userPass = null;
    }

    var methods = ['POST', 'PUT', 'PATCH'];
    var response_ = null; // url = this.getUrl(url, format);

    var options = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: methods.indexOf(method) !== -1 ? JSON.stringify(data) : undefined
    };

    if (userPass) {
      // options.mode = 'no-cors';
      options.credentials = 'include';
      userPass = window.btoa(userPass);
      options.headers['Authorization'] = "Basic " + userPass;
    }

    options.headers = new Headers(options.headers);
    return rxjs.from(fetch(url, options).then(function (response) {
      response_ = response; // console.log(response);

      try {
        var contentType = response.headers.get('content-type');
        var typedResponse;

        if (contentType && contentType.indexOf('application/json') !== -1) {
          typedResponse = response.json();
        } else {
          typedResponse = response.text();
        }

        if (response.ok) {
          return typedResponse;
        } else {
          return typedResponse.then(function (data) {
            return Promise.reject(data);
          });
        }
      } catch (error) {
        if (response.ok) {
          console.warn('HttpService.http$', 'Cannot parse response');
          return Promise.resolve();
        } else {
          return Promise.reject(error);
        }
      }
    })).pipe(operators.catchError(function (error) {
      return rxjs.throwError(_this.getError(error, response_));
    }));
  }
  /*
  // !!! todo mapping response.data
  static http$(method, url, data, format = 'json') {
  	const methods = ['POST', 'PUT', 'PATCH'];
  	const body = (data && methods.indexOf(method) !== -1) ? JSON.stringify(data) : undefined;
  	const queryString = (data && methods.indexOf(method) !== -1) ? Object.keys(data).map(function(key) {
  		return key + '=' + encodeURI(data[key]);
  	}).join('&') : undefined;
  	if (queryString) {
  		url = `${url}?${queryString}`;
  	}
  	let response_ = null;
  	return from(fetch(url, {
  		method: method,
  		headers: {
  			'Accept': 'application/json',
  			'Content-Type': 'application/json',
  		},
  		body: body,
  	}).then((response) => {
  		response_ = new HttpResponse(response);
  		try {
  			const contentType = response.headers.get('content-type');
  			let typedResponse;
  			if (contentType && format === 'json' && contentType.indexOf('application/json') !== -1) {
  				typedResponse = response.json();
  			} else if (format === 'blob') {
  				typedResponse = response.blob();
  			} else {
  				typedResponse = response.text();
  			}
  			return typedResponse.then(data => {
  				response_.data = data;
  				if (response.ok) {
  					return Promise.resolve(response_);
  				} else {
  					return Promise.reject(response_);
  				}
  			});
  		} catch(error) {
  			if (response.ok) {
  				console.warn('HttpService.http$', 'Cannot parse response');
  				return Promise.resolve(response_);
  			} else {
  				return Promise.reject(this.getError(error, response_));
  			}
  		}
  	})).pipe(
  		catchError(error => {
  			return throwError(this.getError(error, response_));
  		}),
  	);
  }
  */
  ;

  HttpService.get$ = function get$(url, data, format) {
    var query = this.query(data);
    return this.http$('GET', "" + url + query, undefined, format);
  };

  HttpService.delete$ = function delete$(url) {
    return this.http$('DELETE', url);
  };

  HttpService.post$ = function post$(url, data) {
    return this.http$('POST', url, data);
  };

  HttpService.put$ = function put$(url, data) {
    return this.http$('PUT', url, data);
  };

  HttpService.patch$ = function patch$(url, data) {
    return this.http$('PATCH', url, data);
  };

  HttpService.query = function query(data) {
    return ''; // todo
  };

  HttpService.getError = function getError(object, response) {
    var error = typeof object === 'object' ? object : {};

    if (!error.status) {
      error.status = response ? response.status : 0;
    }

    if (!error.statusCode) {
      error.statusCode = response ? response.status : 0;
    }

    if (!error.statusMessage) {
      error.statusMessage = response ? response.statusText : object;
    } // console.log('HttpService.getError', error, object);


    return error;
  };

  return HttpService;
}();var LabelPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(LabelPipe, _Pipe);

  function LabelPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  LabelPipe.transform = function transform(key) {
    var labels = LabelPipe.labels_;
    return labels[key] || key; // `#${key}#`;
  };

  LabelPipe.getKeys = function getKeys() {
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }

    return LabelPipe.transform(keys.map(function (x) {
      return x.replace('-', '_');
    }).join('_'));
  };

  LabelPipe.setLabels = function setLabels() {
    var LABELS = Utils.merge({
      select: 'Seleziona',
      browse: 'Sfoglia',
      cancel: 'Annulla',
      error_email: 'Email non valida',
      error_match: 'I campi non corrispondono',
      error_required: 'Campo obbligatorio',
      loading: 'caricamento',
      remove: 'Rimuovi',
      required: 'Richiesto',
      select_file: 'Seleziona una file...',
      update: 'Aggiorna',
      upload: 'Carica',
      drag_and_drop_images: 'Drag And Drop your images here'
    }, environment.labels);
    this.labels_ = LABELS;
  };

  return LabelPipe;
}(rxcomp.Pipe);
LabelPipe.setLabels();
LabelPipe.meta = {
  name: 'label'
};var LocationService = /*#__PURE__*/function () {
  function LocationService() {}

  LocationService.has = function has(key) {
    var params = new URLSearchParams(window.location.search); // console.log('LocationService.has', params);

    return params.has(key);
  };

  LocationService.get = function get(key) {
    var params = new URLSearchParams(window.location.search); // console.log('LocationService.get', params);

    return params.get(key);
  };

  LocationService.set = function set(keyOrValue, value) {
    var params = new URLSearchParams(window.location.search);

    if (typeof keyOrValue === 'string') {
      params.set(keyOrValue, value);
    } else {
      params.set(keyOrValue, '');
    }

    this.pushParams(params); // console.log('LocationService.set', params, keyOrValue, value);
  };

  LocationService.pushParams = function pushParams(params) {
    if (window.history && window.history.pushState) {
      var title = document.title;
      var url = window.location.href.split('?')[0] + "?" + params.toString();
      window.history.pushState(params.toString(), title, url);
    }
  };

  LocationService.replace = function replace(from, to) {
    var history = window.history;

    if (history && history.replaceState) {
      var location = window.location;
      var title = document.title;

      if (location.pathname === '/') {
        var url = location.origin + to + location.search;
        history.replaceState(history.state, title, url);
      } else if (location.href.indexOf(from) !== -1) {
        var _url = location.href.replace(from, to);

        history.replaceState(history.state, title, _url);
      }
    }
  };

  LocationService.deserialize = function deserialize(key) {
    var encoded = this.get('params');
    return this.decode(key, encoded);
  };

  LocationService.serialize = function serialize(keyOrValue, value) {
    var params = this.deserialize();
    var encoded = this.encode(keyOrValue, value, params);
    this.set('params', encoded);
  };

  LocationService.decode = function decode(key, encoded) {
    var decoded = null;

    if (encoded) {
      var json = window.atob(encoded);
      decoded = JSON.parse(json);
    }

    if (key && decoded) {
      decoded = decoded[key];
    }

    return decoded || null;
  };

  LocationService.encode = function encode(keyOrValue, value, params) {
    params = params || {};
    var encoded = null;

    if (typeof keyOrValue === 'string') {
      params[keyOrValue] = value;
    } else {
      params = keyOrValue;
    }

    var json = JSON.stringify(params);
    encoded = window.btoa(json);
    return encoded;
  };

  return LocationService;
}();var LanguageService = /*#__PURE__*/function () {
  function LanguageService() {}

  LanguageService.getDefaultLanguages = function getDefaultLanguages() {
    return environment.alternates || [];
  };

  LanguageService.getDefaultLanguage = function getDefaultLanguage() {
    return environment.defaultLanguage || (this.languages ? this.languages[0].lang : null);
  };

  LanguageService.setLanguage = function setLanguage(language) {
    this.selectedLanguage = language.lang;
  };

  LanguageService.setLanguage$ = function setLanguage$(language) {
    var _this = this;

    return rxjs.from(fetch(language.href).then(function (response) {
      return response.text();
    })).pipe(operators.tap(function (html) {
      // console.log('html', html);
      var labelsMatch = /(window\.labels[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n*[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\{((\{[\s\S]+?\})|[\s\S])+?\})/gm.exec(html);

      if (labelsMatch) {
        // console.log('labels', labelsMatch[0]);
        new Function(labelsMatch[0]).call(window);
        LabelPipe.setLabels();
      }

      var bhereMatch = /(window\.bhere[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n*[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\{((\{[\s\S]+?\})|[\s\S])+?\})/gm.exec(html);

      if (bhereMatch) {
        // console.log('bhere', bhereMatch[0]);
        var data = {};
        new Function(bhereMatch[0].replace('window', 'this')).call(data);

        if (data.bhere) {
          Utils.merge(environment, data.bhere);
        }
      }

      LocationService.replace(_this.activeLanguage.href, language.href); // console.log(window.labels);

      _this.selectedLanguage = language.lang;
    }));
  };

  LanguageService.toggleLanguages = function toggleLanguages() {
    this.showLanguages = !this.showLanguages;
    this.pushChanges();
  };

  _createClass(LanguageService, null, [{
    key: "hasLanguages",
    get: function get() {
      return this.languages.length > 1;
    }
  }, {
    key: "activeLanguage",
    get: function get() {
      var _this2 = this;

      return this.languages.find(function (language) {
        return language.lang === _this2.selectedLanguage;
      });
    }
  }]);

  return LanguageService;
}();

_defineProperty(LanguageService, "languages", LanguageService.getDefaultLanguages());

_defineProperty(LanguageService, "defaultLanguage", LanguageService.getDefaultLanguage());

_defineProperty(LanguageService, "selectedLanguage", LanguageService.defaultLanguage);var ApiService = /*#__PURE__*/function (_HttpService) {
  _inheritsLoose(ApiService, _HttpService);

  function ApiService() {
    return _HttpService.apply(this, arguments) || this;
  }

  ApiService.get$ = function get$(url, data, format) {
    return _HttpService.get$.call(this, "" + environment.api + url, data, format);
  };

  ApiService.delete$ = function delete$(url) {
    return _HttpService.delete$.call(this, "" + environment.api + url);
  };

  ApiService.post$ = function post$(url, data) {
    return _HttpService.post$.call(this, "" + environment.api + url, data);
  };

  ApiService.put$ = function put$(url, data) {
    return _HttpService.put$.call(this, "" + environment.api + url, data);
  };

  ApiService.patch$ = function patch$(url, data) {
    return _HttpService.patch$.call(this, "" + environment.api + url, data);
  };

  return ApiService;
}(HttpService);

_defineProperty(ApiService, "currentLanguage", LanguageService.activeLanguage);var SessionStorageService = /*#__PURE__*/function () {
  function SessionStorageService() {}

  SessionStorageService.delete = function _delete(name) {
    if (this.isSessionStorageSupported()) {
      window.sessionStorage.removeItem(name);
    }
  };

  SessionStorageService.exist = function exist(name) {
    if (this.isSessionStorageSupported()) {
      return window.sessionStorage[name] !== undefined;
    }
  };

  SessionStorageService.get = function get(name) {
    var value = null;

    if (this.isSessionStorageSupported() && window.sessionStorage[name] !== undefined) {
      try {
        value = JSON.parse(window.sessionStorage[name]);
      } catch (e) {
        console.log('SessionStorageService.get.error parsing', name, e);
      }
    }

    return value;
  };

  SessionStorageService.set = function set(name, value) {
    if (this.isSessionStorageSupported()) {
      try {
        var cache = [];
        var json = JSON.stringify(value, function (key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }

            cache.push(value);
          }

          return value;
        });
        window.sessionStorage.setItem(name, json);
      } catch (e) {
        console.log('SessionStorageService.set.error serializing', name, value, e);
      }
    }
  };

  SessionStorageService.isSessionStorageSupported = function isSessionStorageSupported() {
    if (this.supported) {
      return true;
    }

    var supported = false;

    try {
      supported = 'sessionStorage' in window && window.sessionStorage !== null;

      if (supported) {
        window.sessionStorage.setItem('test', '1');
        window.sessionStorage.removeItem('test');
      } else {
        supported = false;
      }
    } catch (e) {
      supported = false;
    }

    this.supported = supported;
    return supported;
  };

  return SessionStorageService;
}();var UserViews = {
  SIGN_IN: 1,
  SIGN_UP: 2,
  FORGOTTEN: 3
};
var User = /*#__PURE__*/function () {
  function User(data) {
    if (data) {
      Object.assign(this, data);
    }
  }

  _createClass(User, [{
    key: "avatar",
    get: function get() {
      return (this.firstName || '?').substr(0, 1).toUpperCase() + (this.lastName || '?').substr(0, 1).toUpperCase();
    }
  }, {
    key: "fullName",
    get: function get() {
      return this.firstName + ' ' + this.lastName;
    }
  }]);

  return User;
}();
var UserService = /*#__PURE__*/function () {
  function UserService() {}

  UserService.setUser = function setUser(user) {
    if (user) {
      SessionStorageService.set('user', user);
    } else {
      SessionStorageService.delete('user');
    }

    this.user$_.next(user);
  };

  UserService.data$ = function data$() {
    return ApiService.get$('/user/data.json');
  };

  UserService.forgot$ = function forgot$(payload) {
    return ApiService.get$("/user/forgot.json", payload);
  };

  UserService.me$ = function me$() {
    var _this = this;

    var sessionUser = SessionStorageService.get('user');

    if (sessionUser) {
      return rxjs.of(sessionUser).pipe(operators.switchMap(function (user) {
        _this.setUser(new User(user));

        return _this.user$_;
      }));
    } else {
      return ApiService.get$("/user/me.json").pipe(operators.map(function (response) {
        _this.mapUser(response);
      }), operators.catchError(function (_) {
        return rxjs.of(null);
      }), operators.switchMap(function (user) {
        _this.setUser(user);

        return _this.user$_;
      }), operators.map(function (user) {
        return user || null;
      }));
    }
  };

  UserService.signin$ = function signin$(payload) {
    var _this2 = this;

    return ApiService.get$("/user/signin.json", payload).pipe(operators.map(function (response) {
      return _this2.mapUser(response);
    }), operators.tap(function (user) {
      return _this2.setUser(user);
    }));
  };

  UserService.signout$ = function signout$() {
    var _this3 = this;

    return ApiService.get$("/user/signout.json").pipe(operators.tap(function (_) {
      return _this3.setUser(null);
    }));
  };

  UserService.signup$ = function signup$(payload) {
    var _this4 = this;

    return ApiService.get$("/user/signup.json", payload).pipe(operators.map(function (response) {
      return _this4.mapUser(response);
    }), operators.tap(function (user) {
      return _this4.setUser(user);
    }));
  };

  UserService.sessionStorage$ = function sessionStorage$() {
    return rxjs.of(SessionStorageService.get('user') || null);
  };

  UserService.mapUser = function mapUser(user) {
    return user ? new User(user) : null;
  };

  UserService.mapUsers = function mapUsers(users) {
    return users ? users.map(function (x) {
      return UserService.mapUser(x);
    }) : [];
  };

  _createClass(UserService, null, [{
    key: "currentUser",
    get: function get() {
      return this.user$_.getValue();
    }
  }]);

  return UserService;
}();

_defineProperty(UserService, "user$_", new rxjs.BehaviorSubject(null));var AppComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppComponent, _Component);

  function AppComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AppComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.remove('hidden');
    console.log('AppComponent.onInit');
    this.showCart = false;
    CartService.active$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (active) {
      _this.showCart = active;

      _this.pushChanges();
    });
    CartService.items$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      return _this.pushChanges();
    });
  };

  _proto.onLogin = function onLogin() {
    ModalService.open$({
      src: environment.template.modal.userModal,
      data: {
        view: 1
      }
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      console.log('AppComponent.onLogin', event);

      if (event instanceof ModalResolveEvent) {
        window.location.href = environment.slug.reservedArea;
      }
    });
  };

  _proto.onLogout = function onLogout() {
    UserService.signout$().pipe(operators.first()).subscribe();
  };

  _proto.onProjectRegistration = function onProjectRegistration(event) {
    ModalService.open$({
      src: environment.template.modal.projectsRegistrationModal
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      console.log('AppComponent.onProjectRegistration', event);
      /*
      if (event instanceof ModalResolveEvent) {
      	// window.location.href = environment.slug.reservedArea;
      }
      */
    });
  };

  _proto.onAddToCart = function onAddToCart(item) {
    var _this2 = this;

    CartService.addItem$(item).pipe(operators.first()).subscribe(function (_) {
      _this2.pushChanges();
    });
  };

  _proto.onOpenMiniCart = function onOpenMiniCart() {
    CartService.setActive(true);
  };

  return AppComponent;
}(rxcomp.Component);
AppComponent.meta = {
  selector: '[app-component]'
};var DownloadDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(DownloadDirective, _Directive);

  function DownloadDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = DownloadDirective.prototype;

  _proto.onChanges = function onChanges() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.setAttribute('download', this.download);
  };

  return DownloadDirective;
}(rxcomp.Directive);
DownloadDirective.meta = {
  selector: '[download]',
  inputs: ['download']
};var DROPDOWN_ID = 1000000;
var DropdownDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(DropdownDirective, _Directive);

  function DropdownDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = DropdownDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var trigger = node.getAttribute('dropdown-trigger');
    this.trigger = trigger ? node.querySelector(trigger) : node;
    this.opened = null;
    this.onClick = this.onClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.addListeners();
    DropdownDirective.dropdown$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (id) {
      // console.log('DropdownDirective', id, this['dropdown-item']);
      if (_this.id === id) {
        node.classList.add('dropped');
      } else {
        node.classList.remove('dropped');
      }
    });
  };

  _proto.onClick = function onClick(event) {
    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    if (this.opened === null) {
      this.openDropdown();
    } else {
      var dropdownItemNode = node.querySelector('[dropdown-item]'); // console.log('dropdownItemNode', dropdownItemNode);

      if (!dropdownItemNode) {
        // if (this.trigger !== node) {
        this.closeDropdown();
      }
    }
  };

  _proto.onDocumentClick = function onDocumentClick(event) {
    var _getContext3 = rxcomp.getContext(this),
        node = _getContext3.node;

    var clickedInside = node === event.target || node.contains(event.target);

    if (!clickedInside) {
      this.closeDropdown();
    }
  };

  _proto.openDropdown = function openDropdown() {
    if (this.opened === null) {
      this.opened = true;
      this.addDocumentListeners();
      DropdownDirective.dropdown$.next(this.id);
      this.dropped.next(this.id);
    }
  };

  _proto.closeDropdown = function closeDropdown() {
    if (this.opened !== null) {
      this.removeDocumentListeners();
      this.opened = null;

      if (DropdownDirective.dropdown$.getValue() === this.id) {
        DropdownDirective.dropdown$.next(null);
        this.dropped.next(null);
      }
    }
  };

  _proto.addListeners = function addListeners() {
    this.trigger.addEventListener('click', this.onClick);
  };

  _proto.addDocumentListeners = function addDocumentListeners() {
    document.addEventListener('click', this.onDocumentClick);
  };

  _proto.removeListeners = function removeListeners() {
    this.trigger.removeEventListener('click', this.onClick);
  };

  _proto.removeDocumentListeners = function removeDocumentListeners() {
    document.removeEventListener('click', this.onDocumentClick);
  };

  _proto.onDestroy = function onDestroy() {
    this.removeListeners();
    this.removeDocumentListeners();
  };

  DropdownDirective.nextId = function nextId() {
    return DROPDOWN_ID++;
  };

  _createClass(DropdownDirective, [{
    key: "id",
    get: function get() {
      return this.dropdown || this.id_ || (this.id_ = DropdownDirective.nextId());
    }
  }]);

  return DropdownDirective;
}(rxcomp.Directive);
DropdownDirective.meta = {
  selector: '[dropdown]',
  inputs: ['dropdown', 'dropdown-trigger'],
  outputs: ['dropped']
};
DropdownDirective.dropdown$ = new rxjs.BehaviorSubject(null);var DropdownItemDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(DropdownItemDirective, _Directive);

  function DropdownItemDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = DropdownItemDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.add('dropdown-item');
    DropdownDirective.dropdown$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (id) {
      // console.log('DropdownItemDirective', id, this['dropdown-item']);
      if (_this.id === id) {
        node.classList.add('dropped');
      } else {
        node.classList.remove('dropped');
      }
    });
  };

  _createClass(DropdownItemDirective, [{
    key: "id",
    get: function get() {
      return this['dropdown-item'];
    }
  }]);

  return DropdownItemDirective;
}(rxcomp.Directive);
DropdownItemDirective.meta = {
  selector: '[dropdown-item], [[dropdown-item]]',
  inputs: ['dropdown-item']
};var EnvPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(EnvPipe, _Pipe);

  function EnvPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  EnvPipe.transform = function transform(keypath) {
    var env = environment;
    var keys = keypath.split('.');
    var k = keys.shift();

    while (keys.length > 0 && env[k]) {
      env = env[k];
      k = keys.shift();
    }

    var value = env[k] || null;
    return value;
  };

  return EnvPipe;
}(rxcomp.Pipe);
EnvPipe.meta = {
  name: 'env'
};var FlagPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(FlagPipe, _Pipe);

  function FlagPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  FlagPipe.transform = function transform(key) {
    var flags = environment.flags;
    return flags[key] || false;
  };

  return FlagPipe;
}(rxcomp.Pipe);
FlagPipe.meta = {
  name: 'flag'
};/*
['quot', 'amp', 'apos', 'lt', 'gt', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'amp', 'bull', 'deg', 'infin', 'permil', 'sdot', 'plusmn', 'dagger', 'mdash', 'not', 'micro', 'perp', 'par', 'euro', 'pound', 'yen', 'cent', 'copy', 'reg', 'trade', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];
['"', '&', ''', '<', '>', ' ', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '­', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', '&', '•', '°', '∞', '‰', '⋅', '±', '†', '—', '¬', 'µ', '⊥', '∥', '€', '£', '¥', '¢', '©', '®', '™', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];
*/

var HtmlPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(HtmlPipe, _Pipe);

  function HtmlPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  HtmlPipe.transform = function transform(value) {
    if (value) {
      value = value.replace(/&#(\d+);/g, function (m, n) {
        return String.fromCharCode(parseInt(n));
      });
      var escapes = ['quot', 'amp', 'apos', 'lt', 'gt', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'amp', 'bull', 'deg', 'infin', 'permil', 'sdot', 'plusmn', 'dagger', 'mdash', 'not', 'micro', 'perp', 'par', 'euro', 'pound', 'yen', 'cent', 'copy', 'reg', 'trade', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];
      var unescapes = ['"', '&', '\'', '<', '>', ' ', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '­', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', '&', '•', '°', '∞', '‰', '⋅', '±', '†', '—', '¬', 'µ', '⊥', '∥', '€', '£', '¥', '¢', '©', '®', '™', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];
      var rx = new RegExp("(&" + escapes.join(';)|(&') + ";)", 'g');
      value = value.replace(rx, function () {
        for (var i = 1; i < arguments.length; i++) {
          if (arguments[i]) {
            // console.log(arguments[i], unescapes[i - 1]);
            return unescapes[i - 1];
          }
        }
      }); // console.log(value);

      return value;
    }
  };

  return HtmlPipe;
}(rxcomp.Pipe);
HtmlPipe.meta = {
  name: 'html'
};var IdDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(IdDirective, _Directive);

  function IdDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = IdDirective.prototype;

  _proto.onChanges = function onChanges() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.setAttribute('id', this.id);
  };

  return IdDirective;
}(rxcomp.Directive);
IdDirective.meta = {
  selector: '[id]',
  inputs: ['id']
};var LabelForDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(LabelForDirective, _Directive);

  function LabelForDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = LabelForDirective.prototype;

  _proto.onChanges = function onChanges() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.setAttribute('for', this.labelFor);
  };

  return LabelForDirective;
}(rxcomp.Directive);
LabelForDirective.meta = {
  selector: '[labelFor]',
  inputs: ['labelFor']
};var LocomotiveScrollService = /*#__PURE__*/function () {
  function LocomotiveScrollService() {}

  LocomotiveScrollService.scroll = function scroll(_scroll) {
    // console.log('LocomotiveScrollService.scroll', scroll);
    this.scroll$.next(_scroll);
  };

  LocomotiveScrollService.init = function init(node, options) {
    options = Object.assign({
      useKeyboard: true,
      smoothMobile: true,
      inertia: 0.5,
      // name:'scroll',
      // offset: [0,0], // bottom top
      // repeat: false,
      smooth: true,
      // initPosition: { x: 0, y: 0 }
      // direction: 'vertical',
      lerp: 0.01,
      getDirection: true,
      // add direction to scroll event
      getSpeed: true,
      // add speed to scroll event
      // class: 'is-inview',
      initClass: 'has-scroll-init',
      scrollingClass: 'has-scroll-scrolling',
      draggingClass: 'has-scroll-dragging',
      smoothClass: 'has-scroll-smooth',
      scrollbarContainer: false,
      scrollbarClass: 'c-scrollbar',
      multiplier: 1,
      firefoxMultiplier: 50,
      touchMultiplier: 2,
      scrollFromAnywhere: true,
      gestureDirection: 'vertical',
      reloadOnContextChange: false,
      resetNativeScroll: true
    }, options, {
      el: node
    });

    if (this.useLocomotiveScroll()) {
      var instance = new LocomotiveScroll(options);
      LocomotiveScrollService.instance = instance;
      return instance;
    } else {
      document.querySelector('html').classList.add('has-scroll-init');
    }
  };

  LocomotiveScrollService.useLocomotiveScroll = function useLocomotiveScroll() {
    return window.innerWidth >= 768 && !this.isMacLike();
  };

  LocomotiveScrollService.isMacLike = function isMacLike() {
    var isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    return isMacLike;
  };

  LocomotiveScrollService.isIOS = function isIOS() {
    var isIOS = /(iPhone|iPod|iPad)/i.test(navigator.platform);
    return isIOS;
  };

  LocomotiveScrollService.isMacOs = function isMacOs() {
    var isMacOs = navigator.platform.toLowerCase().indexOf('mac') >= 0;
    return isMacOs;
  };

  LocomotiveScrollService.isSafari = function isSafari() {
    var isSafari = navigator.vendor.match(/apple/i) && !navigator.userAgent.match(/crios/i) && !navigator.userAgent.match(/fxios/i);
    return isSafari;
  };

  LocomotiveScrollService.init$ = function init$(node) {
    return rxjs.fromEvent(window, 'load').pipe(operators.delay(1), operators.switchMap(function (_) {
      // setTimeout(() => {
      var instance = LocomotiveScrollService.init(node);

      if (instance) {
        instance.on('scroll', function (instance) {
          LocomotiveScrollService.scroll(instance);
        });
      } else {
        var event = {
          direction: null,
          scroll: {
            x: 0,
            y: 0
          },
          speed: 0
        };
        var body = document.querySelector('body');
        var previousY = body.scrollTop; // window.pageYOffset; // body.scrollTop;

        body.addEventListener('scroll', function () {
          var y = body.scrollTop; // window.pageYOffset; // body.scrollTop;

          var direction = y > previousY ? 'down' : 'up'; // console.log('scroll', y, direction);

          previousY = y;
          event.direction = direction;
          event.scroll.y = y;
          LocomotiveScrollService.scroll(event);
        }, true);
      }

      return LocomotiveScrollService.scroll$; // }, 1);
    }));
  };

  LocomotiveScrollService.update = function update() {
    if (this.instance) {
      this.instance.update();
    }
  };

  LocomotiveScrollService.stop = function stop() {
    if (this.instance) {
      this.instance.stop();
    }
  };

  LocomotiveScrollService.start = function start() {
    if (this.instance) {
      this.instance.start();
    }
  };

  LocomotiveScrollService.scrollTo = function scrollTo(target, options) {
    if (this.instance) {
      this.instance.scrollTo(target, options);
    } else {
      target.scrollIntoView();
    }
  };

  return LocomotiveScrollService;
}();

_defineProperty(LocomotiveScrollService, "scroll$", new rxjs.ReplaySubject(1));var LocomotiveScrollDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(LocomotiveScrollDirective, _Directive);

  function LocomotiveScrollDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = LocomotiveScrollDirective.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    LocomotiveScrollService.init$(node).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {// console.log('LocomotiveScrollDirective', event);
    });
    /*
    window.onload = () => {
    	setTimeout(() => {
    		const instance = LocomotiveScrollService.init(node);
    		if (instance) {
    			instance.on('scroll', instance => {
    				LocomotiveScrollService.scroll(instance.scroll.y);
    			});
    		} else {
    			const body = document.querySelector('body');
    			window.addEventListener('scroll', () => {
    				const y = body.scrollTop; // window.pageYOffset
    				LocomotiveScrollService.scroll(y);
    			}, true);
    		}
    	}, 1);
    };
    */
  };

  return LocomotiveScrollDirective;
}(rxcomp.Directive);
LocomotiveScrollDirective.meta = {
  selector: '[locomotive-scroll],[[locomotive-scroll]]'
};var ScrollDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(ScrollDirective, _Directive);

  function ScrollDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = ScrollDirective.prototype;

  _proto.onInit = function onInit() {
    if (LocomotiveScrollService.useLocomotiveScroll()) {
      this.scroll$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {// console.log('ScrollDirective', event);
      });
    }
  };

  _proto.scroll$ = function scroll$() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var speed = this.scrollSpeed ? parseFloat(this.scrollSpeed) : 1.5;
    return LocomotiveScrollService.scroll$.pipe(operators.tap(function (scroll) {
      var wh = window.innerHeight;
      var wh2 = wh / 2;
      var rect = node.getBoundingClientRect();
      var currentY = gsap.getProperty(node, 'y');
      var top = rect.top - currentY;
      var bottom = rect.bottom - currentY;

      if (top < wh && bottom > 0) {
        var pow = (top - wh2) / wh2;
        var y = pow * speed * 40;
        gsap.set(node, {
          y: y
        });
      }
    }));
  };

  return ScrollDirective;
}(rxcomp.Directive);
ScrollDirective.meta = {
  selector: '[scroll]',
  inputs: ['scrollSpeed']
};var ModalOutletComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ModalOutletComponent, _Component);

  function ModalOutletComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ModalOutletComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    this.modalNode = node.querySelector('.modal-outlet__modal');
    ModalService.modal$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (modal) {
      _this.modal = modal;
    });
  };

  _proto.reject = function reject(event) {
    ModalService.reject();
  };

  _createClass(ModalOutletComponent, [{
    key: "modal",
    get: function get() {
      return this.modal_;
    },
    set: function set(modal) {
      // console.log('ModalOutletComponent set modal', modal, this);
      var _getContext2 = rxcomp.getContext(this),
          module = _getContext2.module;

      if (this.modal_ && this.modal_.node) {
        module.remove(this.modal_.node, this);
        this.modalNode.removeChild(this.modal_.node);
      }

      if (modal && modal.node) {
        this.modal_ = modal;
        this.modalNode.appendChild(modal.node);
        var instances = module.compile(modal.node);
      }

      this.modal_ = modal;
      this.pushChanges();
    }
  }]);

  return ModalOutletComponent;
}(rxcomp.Component);
ModalOutletComponent.meta = {
  selector: '[modal-outlet]',
  template:
  /* html */
  "\n\t<div class=\"modal-outlet__container\" [class]=\"{ active: modal }\">\n\t\t<div class=\"modal-outlet__background\" (click)=\"reject($event)\"></div>\n\t\t<div class=\"modal-outlet__modal\"></div>\n\t</div>\n\t"
};var NumberPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(NumberPipe, _Pipe);

  function NumberPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  NumberPipe.transform = function transform(value, suffix) {

    if (value != null) {
      // !!! keep losing
      return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
      }).format(value);
    }
  };

  return NumberPipe;
}(rxcomp.Pipe);
NumberPipe.meta = {
  name: 'number'
};var SlugPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(SlugPipe, _Pipe);

  function SlugPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  SlugPipe.transform = function transform(key) {
    var slug = environment.slug;
    return slug[key] || "#" + key;
  };

  return SlugPipe;
}(rxcomp.Pipe);
SlugPipe.meta = {
  name: 'slug'
};var SwiperDirective = /*#__PURE__*/function (_Component) {
  _inheritsLoose(SwiperDirective, _Component);

  function SwiperDirective() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SwiperDirective.prototype;

  _proto.onInit = function onInit() {
    this.options = {
      slidesPerView: 'auto',
      spaceBetween: 0,
      centeredSlides: true,
      speed: 600,
      autoplay: {
        delay: 5000
      },
      keyboardControl: true,
      mousewheelControl: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      }
    };
    this.init_();
  };

  _proto.onChanges = function onChanges() {
    this.swiperInitOrUpdate_();
  };

  _proto.onDestroy = function onDestroy() {
    this.removeListeners_();
    this.swiperDestroy_();
  };

  _proto.onBeforePrint = function onBeforePrint() {
    this.swiperDestroy_();
  };

  _proto.slideToIndex = function slideToIndex(index) {
    // console.log('SwiperDirective.slideToIndex', index);
    if (this.swiper) {
      this.swiper.slideTo(index);
    }
  };

  _proto.hasPrev = function hasPrev() {
    var swiper = this.swiper;

    if (swiper && swiper.activeIndex > 0 && swiper.slides.length > swiper.activeIndex) {
      // console.log('SwiperDirective.hasPrev', swiper.activeIndex, swiper.realIndex, swiper.slides);
      return true;
    }
  };

  _proto.hasNext = function hasNext() {
    var swiper = this.swiper;

    if (swiper) {
      var slidesPerView = swiper.params.slidesPerView || 1; // console.log('SwiperDirective.hasNext', swiper.slides.length, swiper.params.slidesPerView);

      if (swiper.activeIndex < swiper.slides.length - slidesPerView) {
        return true;
      }
    }
  };

  _proto.slidePrev = function slidePrev() {
    var swiper = this.swiper;

    if (this.hasPrev()) {
      // console.log('SwiperDirective.slidePrev', swiper.activeIndex, swiper.realIndex, swiper.slides);
      swiper.slideTo(swiper.activeIndex - 1);
    }
  };

  _proto.slideNext = function slideNext() {
    var swiper = this.swiper;

    if (this.hasNext()) {
      // console.log('SwiperDirective.slideNext', swiper.activeIndex, swiper.realIndex, swiper.slides);
      swiper.slideTo(swiper.activeIndex + 1);
    }
  };

  _proto.init_ = function init_(target) {
    var _this = this;

    this.events$ = new rxjs.Subject();

    if (this.enabled) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      target = target || node;
      this.target = target;
      gsap.set(target, {
        opacity: 0
      });
      this.index = 0;
      var on = this.options.on || {};

      on.slideChange = function () {
        var swiper = _this.swiper;

        if (swiper) {
          _this.index = swiper.activeIndex;

          _this.events$.next(_this.index);

          _this.pushChanges();
        }
      };

      this.options.on = on;
      this.addListeners_();
    }
  };

  _proto.addListeners_ = function addListeners_() {
    this.onBeforePrint = this.onBeforePrint.bind(this);
    window.addEventListener('beforeprint', this.onBeforePrint);
    /*
    scope.$on('onResize', ($scope) => {
    	this.onResize(scope, element, attributes);
    });
    */
  };

  _proto.removeListeners_ = function removeListeners_() {
    window.removeEventListener('beforeprint', this.onBeforePrint);
  };

  _proto.swiperInitOrUpdate_ = function swiperInitOrUpdate_() {
    if (this.enabled) {
      var target = this.target;

      if (this.swiper) {
        this.swiper.update();
      } else {
        var swiper;
        var on = this.options.on || (this.options.on = {});
        var callback = on.init;

        if (!on.init || !on.init.swiperDirectiveInit) {
          on.init = function () {
            var _this2 = this;

            gsap.to(target, {
              duration: 0.4,
              opacity: 1,
              ease: Power2.easeOut
            });
            setTimeout(function () {
              if (typeof callback === 'function') {
                callback.apply(_this2, [swiper, element, scope]);
              }
            }, 1);
          };

          on.init.swiperDirectiveInit = true;
        }

        gsap.set(target, {
          opacity: 1
        });
        swiper = new Swiper(target, this.options); // console.log(swiper);

        this.swiper = swiper;
        this.swiper._opening = true;
        target.classList.add('swiper-init');
      }
    }
  };

  _proto.swiperDestroy_ = function swiperDestroy_() {
    if (this.swiper) {
      this.swiper.destroy();
    }
  };

  _createClass(SwiperDirective, [{
    key: "enabled",
    get: function get() {
      return !window.matchMedia('print').matches;
    }
  }]);

  return SwiperDirective;
}(rxcomp.Component);
SwiperDirective.meta = {
  selector: '[swiper]',
  inputs: ['consumer']
};// <script src='https://gruppoconcorde-cdn.thron.com/shared/ce/bootstrap/1/scripts/embeds-min.js'></script>

var ThronService = /*#__PURE__*/function () {
  function ThronService() {}

  ThronService.thron$ = function thron$() {
    var thron = window.THRONContentExperience || window.THRONPlayer;

    if (thron) {
      return rxjs.of(thron);
    } else {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://gruppoconcorde-cdn.thron.com/shared/ce/bootstrap/1/scripts/embeds-min.js');
      var loaded$ = rxjs.fromEvent(script, 'load').pipe( // tap(event => console.log(event, window.THRONContentExperience || window.THRONPlayer)),
      operators.map(function (event) {
        return window.THRONContentExperience || window.THRONPlayer;
      }), operators.shareReplay(1));
      return document.head.appendChild(script) && loaded$;
    }
  };

  return ThronService;
}();var ID = 0;
var ThronComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ThronComponent, _Component);

  function ThronComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "playing_", false);

    return _this;
  }

  var _proto = ThronComponent.prototype;

  _proto.onInit = function onInit() {
    // console.log('ThronComponent.onInit');
    this.init$().pipe(operators.first()).subscribe();
  };

  _proto.init$ = function init$() {
    var _this2 = this;

    return ThronService.thron$().pipe(operators.tap(function (THRON) {
      // const THRON = window.THRONContentExperience || window.THRONPlayer;
      if (!THRON) {
        return;
      } // console.log('THRONContentExperience', window.THRONContentExperience, 'THRONPlayer', window.THRONPlayer);


      var _getContext = rxcomp.getContext(_this2),
          node = _getContext.node;

      var target = _this2.target = node.querySelector('.video > .thron');
      var id = target.id = "thron-" + ++ID;
      var media = _this2.thron;

      if (media.indexOf('pkey=') === -1) {
        var splitted = media.split('/');
        var clientId = splitted[6];
        var xcontentId = splitted[7];
        var pkey = splitted[8];
        media = "https://gruppoconcorde-view.thron.com/api/xcontents/resources/delivery/getContentDetail?clientId=" + clientId + "&xcontentId=" + xcontentId + "&pkey=" + pkey;
      }

      var controls = _this2.controls = node.hasAttribute('controls') ? true : false,
          loop = _this2.loop = node.hasAttribute('loop') ? true : false,
          autoplay = _this2.autoplay = node.hasAttribute('autoplay') ? true : false;
      var player = _this2.player = THRON(id, {
        media: media,
        loop: loop,
        autoplay: autoplay,
        muted: !controls,
        displayLinked: 'close',
        noSkin: !controls // lockBitrate: 'max',

      });
      _this2.onReady = _this2.onReady.bind(_this2);
      _this2.onCanPlay = _this2.onCanPlay.bind(_this2);
      _this2.onPlaying = _this2.onPlaying.bind(_this2);
      _this2.onPlay = _this2.onPlay.bind(_this2);
      _this2.onPause = _this2.onPause.bind(_this2);
      _this2.onComplete = _this2.onComplete.bind(_this2);
      player.on('ready', _this2.onReady);
      player.on('canPlay', _this2.onCanPlay);
      player.on('playing', _this2.onPlaying);
      player.on('play', _this2.onPlay);
      player.on('pause', _this2.onPause);
      player.on('complete', _this2.onComplete);
    }));
  };

  _proto.onReady = function onReady() {
    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    var id = this.target.id;
    var player = this.player;

    if (!this.controls) {
      var mediaContainer = player.mediaContainer();
      var video = mediaContainer.querySelector('video');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('autoplay', 'true');
    }

    this.ready.next(id); // video.setAttribute('autoplay', 'true');
  };

  _proto.onCanPlay = function onCanPlay() {
    var _getContext3 = rxcomp.getContext(this),
        node = _getContext3.node;

    var id = this.target.id; // console.log('ThronDirective.onCanPlay', id);

    this.canPlay.next(id);
  };

  _proto.onPlaying = function onPlaying() {
    var _getContext4 = rxcomp.getContext(this),
        node = _getContext4.node;

    var id = this.target.id;
    var player = this.player;
    player.off('playing', this.onPlaying);

    if (!this.controls) {
      var qualities = player.qualityLevels(); // console.log('ThronDirective.onPlaying', id, qualities);

      if (qualities.length) {
        var highestQuality = qualities[qualities.length - 1].index;
        var lowestQuality = qualities[0].index;
        player.currentQuality(highestQuality); // console.log('ThronDirective.onPlaying', id, 'currentQuality', player.currentQuality());
      }
    }
  };

  _proto.onPlay = function onPlay() {
    var _getContext5 = rxcomp.getContext(this),
        node = _getContext5.node;

    var id = this.target.id; // console.log('ThronDirective.onComplete', id);

    this.playing = true;
    this.play.next(id);
  };

  _proto.onPause = function onPause() {
    var _getContext6 = rxcomp.getContext(this),
        node = _getContext6.node;

    var id = this.target.id; // console.log('ThronDirective.onComplete', id);

    this.playing = false;
    this.pause.next(id);
  };

  _proto.onComplete = function onComplete() {
    var _getContext7 = rxcomp.getContext(this),
        node = _getContext7.node;

    var id = this.target.id; // console.log('ThronDirective.onComplete', id);

    this.playing = false;
    this.complete.next(id);
  };

  _proto.playVideo = function playVideo() {
    var _getContext8 = rxcomp.getContext(this),
        node = _getContext8.node;

    var id = this.target.id;
    var player = this.player;
    var status = player.status(); // console.log('ThronDirective.playVideo', id, status);

    if (status && !status.playing) {
      player.play();
    }
  };

  _proto.pauseVideo = function pauseVideo() {
    var _getContext9 = rxcomp.getContext(this),
        node = _getContext9.node;

    var id = this.target.id;
    var player = this.player;
    var status = player.status(); // console.log('ThronDirective.pauseVideo', id, status);

    if (status && status.playing) {
      player.pause();
    }
  };

  _proto.toggle = function toggle() {
    var _getContext10 = rxcomp.getContext(this),
        node = _getContext10.node;

    var id = this.target.id;
    var player = this.player;
    var status = player.status(); // console.log('ThronDirective.pauseVideo', id, status);

    if (status && status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  _proto.play = function play(id) {
    // console.log('ThronDirective.play', id, id, id === id);
    var _getContext11 = rxcomp.getContext(this),
        node = _getContext11.node;

    if (id === this.target.id) {
      this.playVideo();
    }
  };

  _proto.pause = function pause(id) {
    // console.log('ThronDirective.pause', id, id, id === id);
    var _getContext12 = rxcomp.getContext(this),
        node = _getContext12.node;

    if (id === this.target.id) {
      this.pauseVideo();
    }
  };

  _proto.onDestroy = function onDestroy() {
    var player = this.player;

    if (player) {
      player.off('ready', this.onReady);
      player.off('canPlay', this.onCanPlay);
      player.off('playing', this.onPlaying);
      player.off('play', this.onPlay);
      player.off('pause', this.onPause);
      player.off('complete', this.onComplete);
    }
  };

  _createClass(ThronComponent, [{
    key: "playing",
    get: function get() {
      return this.playing_;
    },
    set: function set(playing) {
      if (this.playing_ !== playing) {
        this.playing_ = playing;

        var _getContext13 = rxcomp.getContext(this),
            node = _getContext13.node;

        if (node) {
          playing ? node.classList.add('playing') : node.classList.remove('playing');
        }
      }
    }
  }]);

  return ThronComponent;
}(rxcomp.Component);
ThronComponent.meta = {
  selector: '[thron],[[thron]]',
  outputs: ['ready', 'canPlay', 'play', 'pause', 'complete'],
  inputs: ['thron', 'm3u8'],
  template:
  /* html */
  ""
};var TitleDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(TitleDirective, _Directive);

  function TitleDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  _createClass(TitleDirective, [{
    key: "title",
    get: function get() {
      return this.title_;
    },
    set: function set(title) {
      if (this.title_ !== title) {
        this.title_ = title;

        var _getContext = rxcomp.getContext(this),
            node = _getContext.node;

        title ? node.setAttribute('title', title) : node.removeAttribute('title');
      }
    }
  }]);

  return TitleDirective;
}(rxcomp.Directive);
TitleDirective.meta = {
  selector: '[[title]]',
  inputs: ['title']
};var factories = [DownloadDirective, // DropDirective,
DropdownDirective, DropdownItemDirective, // DropdownItemDirective,
IdDirective, LabelForDirective, // LanguageComponent,
// LazyDirective,
LocomotiveScrollDirective, // ModalComponent,
ModalOutletComponent, ScrollDirective, // SvgIconStructure,
SwiperDirective, ThronComponent, TitleDirective // UploadItemComponent,
// VirtualStructure
];
var pipes = [EnvPipe, FlagPipe, HtmlPipe, LabelPipe, NumberPipe, SlugPipe];
var CommonModule = /*#__PURE__*/function (_Module) {
  _inheritsLoose(CommonModule, _Module);

  function CommonModule() {
    return _Module.apply(this, arguments) || this;
  }

  return CommonModule;
}(rxcomp.Module);
CommonModule.meta = {
  imports: [],
  declarations: [].concat(factories, pipes),
  exports: [].concat(factories, pipes)
};var ControlComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ControlComponent, _Component);

  function ControlComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ControlComponent.prototype;

  _proto.onChanges = function onChanges() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node; // console.log(this, node, this.control);


    var control = this.control;
    var flags = control.flags;
    Object.keys(flags).forEach(function (key) {
      flags[key] ? node.classList.add(key) : node.classList.remove(key);
    });
  };

  return ControlComponent;
}(rxcomp.Component);
ControlComponent.meta = {
  selector: '[control]',
  inputs: ['control']
};var ControlCheckboxComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlCheckboxComponent, _ControlComponent);

  function ControlCheckboxComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlCheckboxComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
  };

  return ControlCheckboxComponent;
}(ControlComponent);
ControlCheckboxComponent.meta = {
  selector: '[control-checkbox]',
  inputs: ['control', 'label'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--checkbox\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<input type=\"checkbox\" class=\"control--checkbox\" [id]=\"control.name\" [formControl]=\"control\" [value]=\"true\" />\n\t\t\t<label [labelFor]=\"control.name\">\n\t\t\t\t<svg class=\"icon icon--checkbox\"><use xlink:href=\"#checkbox\"></use></svg>\n\t\t\t\t<svg class=\"icon icon--checkbox-checked\"><use xlink:href=\"#checkbox-checked\"></use></svg>\n\t\t\t\t<span [innerHTML]=\"label | html\"></span>\n\t\t\t</label>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var KeyboardService = /*#__PURE__*/function () {
  function KeyboardService() {}

  KeyboardService.keydown$ = function keydown$() {
    if (!this.keydown$_) {
      this.keydown$_ = rxjs.fromEvent(window, 'keydown').pipe(operators.shareReplay(1));
    }

    return this.keydown$_;
  };

  KeyboardService.keyup$ = function keyup$() {
    if (!this.keyup$_) {
      this.keyup$_ = rxjs.fromEvent(window, 'keyup').pipe(operators.shareReplay(1));
    }

    return this.keyup$_;
  };

  KeyboardService.keys$ = function keys$() {
    var _this = this;

    if (!this.keys$_) {
      this.keys$_ = rxjs.merge(this.keydown$(), this.keyup$()).pipe(operators.map(function (event) {
        var keys = _this.keys;

        if (event.type === 'keydown') {
          keys[event.key] = true;
        } else {
          delete keys[event.key];
        }

        return _this.keys;
      }), operators.startWith(this.keys), operators.shareReplay(1));
    }

    return this.keys$_;
  };

  KeyboardService.key$ = function key$() {
    if (!this.key$_) {
      var regexp = /\w/;
      this.key$_ = this.keydown$().pipe(operators.filter(function (event) {
        return event.key && event.key.match(regexp);
      }), operators.map(function (event) {
        return event.key;
      }), operators.shareReplay(1));
    }

    return this.key$_;
  };

  KeyboardService.typing$ = function typing$() {
    if (!this.typing$_) {
      var typing = '',
          to;
      this.typing$_ = this.key$().pipe(operators.map(function (key) {
        if (to) {
          clearTimeout(to);
        }

        typing += key;
        to = setTimeout(function () {
          typing = '';
        }, 1500);
        return typing;
      }), operators.shareReplay(1));
    }

    return this.typing$_;
  };

  return KeyboardService;
}();

_defineProperty(KeyboardService, "keys", {});var ControlCustomSelectComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlCustomSelectComponent, _ControlComponent);

  function ControlCustomSelectComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlCustomSelectComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.dropped = false;
    this.dropdownId = DropdownDirective.nextId();
    KeyboardService.typing$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (word) {
      _this.scrollToWord(word);
    });
    /*
    KeyboardService.key$().pipe(
    	takeUntil(this.unsubscribe$)
    ).subscribe(key => {
    	this.scrollToKey(key);
    });
    */
  }
  /*
  onChanges() {
  	// console.log('ControlCustomSelectComponent.onChanges');
  }
  */
  ;

  _proto.scrollToWord = function scrollToWord(word) {
    // console.log('ControlCustomSelectComponent.scrollToWord', word);
    var items = this.control.options || [];
    var index = -1;

    for (var i = 0; i < items.length; i++) {
      var x = items[i];

      if (x.name.toLowerCase().indexOf(word.toLowerCase()) === 0) {
        // console.log(word, x.name);
        index = i;
        break;
      }
    }

    if (index !== -1) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      var dropdown = node.querySelector('.dropdown');
      var navDropdown = node.querySelector('.nav--dropdown');
      var item = navDropdown.children[index];
      dropdown.scrollTo(0, item.offsetTop);
    }
  };

  _proto.setOption = function setOption(item) {
    // console.log('setOption', item, this.isMultiple);
    var value;

    if (this.isMultiple) {
      var _value = this.control.value || [];

      var index = _value.indexOf(item.id);

      if (index !== -1) {
        // if (value.length > 1) {
        _value.splice(index, 1); // }

      } else {
        _value.push(item.id);
      }

      _value.length ? _value.slice() : null, _readOnlyError("value");
    } else {
      value = item.id; // DropdownDirective.dropdown$.next(null);
    }

    this.control.value = value;
    this.change.next(value);
  };

  _proto.hasOption = function hasOption(item) {
    if (this.isMultiple) {
      var values = this.control.value || [];
      return values.indexOf(item.id) !== -1;
    } else {
      return this.control.value === item.id;
    }
  };

  _proto.getLabel = function getLabel() {
    var value = this.control.value;
    var items = this.control.options || [];

    if (this.isMultiple) {
      value = value || [];

      if (value.length) {
        return value.map(function (v) {
          var item = items.find(function (x) {
            return x.id === v || x.name === v;
          });
          return item ? item.name : '';
        }).join(', ');
      } else {
        return this.select || 'select'; // LabelPipe.transform('select');
      }
    } else {
      var item = value ? items.find(function (x) {
        return x.id === value || x.name === value;
      }) : null;

      if (item) {
        return item.name;
      } else {
        return this.select || 'select'; // LabelPipe.transform('select');
      }
    }
  };

  _proto.onDropped = function onDropped($event) {
    // console.log('ControlCustomSelectComponent.onDropped', id);
    if (this.dropped && $event === null) {
      this.control.touched = true;
    }

    this.dropped = $event === this.dropdownId;
  };

  _createClass(ControlCustomSelectComponent, [{
    key: "isMultiple",
    get: function get() {
      return this.multiple && this.multiple !== false && this.multiple !== 'false';
    }
  }]);

  return ControlCustomSelectComponent;
}(ControlComponent);
ControlCustomSelectComponent.meta = {
  selector: '[control-custom-select]',
  outputs: ['change'],
  inputs: ['control', 'label', 'multiple', 'select'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--select\" [class]=\"{ required: control.validators.length, multiple: isMultiple }\" [dropdown]=\"dropdownId\" (dropped)=\"onDropped($event)\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<span class=\"control--custom-select\" [innerHTML]=\"getLabel() | label\"></span>\n\t\t\t<svg class=\"caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t\t<div class=\"dropdown\" [dropdown-item]=\"dropdownId\">\n\t\t\t<div class=\"category\" [innerHTML]=\"label\"></div>\n\t\t\t<ul class=\"nav--dropdown\" [class]=\"{ multiple: isMultiple }\">\n\t\t\t\t<li (click)=\"setOption(item)\" [class]=\"{ empty: item.id == null }\" *for=\"let item of control.options\">\n\t\t\t\t\t<span [class]=\"{ active: hasOption(item) }\" [innerHTML]=\"item.name | label\"></span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t"
};var ControlEmailComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlEmailComponent, _ControlComponent);

  function ControlEmailComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlEmailComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
  };

  return ControlEmailComponent;
}(ControlComponent);
ControlEmailComponent.meta = {
  selector: '[control-email]',
  inputs: ['control', 'label'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<input type=\"text\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" required email />\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlFileComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlFileComponent, _ControlComponent);

  function ControlFileComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlFileComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.labels = window.labels || {};
    this.file = null;
    this.onReaderComplete = this.onReaderComplete.bind(this);
  };

  _proto.onInputDidChange = function onInputDidChange(event) {
    var input = event.target;
    var file = input.files[0];
    this.file = {
      name: file.name,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      size: file.size,
      type: file.type
    };
    var reader = new FileReader();
    reader.addEventListener('load', this.onReaderComplete);
    reader.readAsDataURL(file); // reader.readAsArrayBuffer() // Starts reading the contents of the specified Blob, once finished, the result attribute contains an ArrayBuffer representing the file's data.
    // reader.readAsBinaryString() // Starts reading the contents of the specified Blob, once finished, the result attribute contains the raw binary data from the file as a string.
    // reader.readAsDataURL() // Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
    // reader.readAsText() // Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as a text string. An optional encoding name can be specified.
  };

  _proto.onReaderComplete = function onReaderComplete(event) {
    var content = event.target.result;
    this.file.content = content;
    this.control.value = this.file; // console.log('ControlFileComponent.onReaderComplete', this.file);
    // image/*,
  };

  return ControlFileComponent;
}(ControlComponent);
ControlFileComponent.meta = {
  selector: '[control-file]',
  inputs: ['control', 'label'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--file\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<label for=\"file\" [innerHTML]=\"label\"></label>\n\t\t\t<span class=\"control--text\" [innerHTML]=\"file?.name || labels.select_file\"></span>\n\t\t\t<svg class=\"upload\"><use xlink:href=\"#upload\"></use></svg>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t<input name=\"file\" type=\"file\" accept=\".pdf,.doc,.docx,*.txt\" class=\"control--file\" (change)=\"onInputDidChange($event)\" />\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlPasswordComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlPasswordComponent, _ControlComponent);

  function ControlPasswordComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlPasswordComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
  };

  return ControlPasswordComponent;
}(ControlComponent);
ControlPasswordComponent.meta = {
  selector: '[control-password]',
  inputs: ['control', 'label'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<input type=\"password\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" />\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlSearchComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlSearchComponent, _ControlComponent);

  function ControlSearchComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlSearchComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
  };

  return ControlSearchComponent;
}(ControlComponent);
ControlSearchComponent.meta = {
  selector: '[control-search]',
  inputs: ['control', 'label', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<svg class=\"search\"><use xlink:href=\"#search\"></use></svg>\n\t\t\t<input type=\"text\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [disabled]=\"disabled\" />\n\t\t</div>\n\t"
};var ControlTextComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlTextComponent, _ControlComponent);

  function ControlTextComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlTextComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
  };

  return ControlTextComponent;
}(ControlComponent);
ControlTextComponent.meta = {
  selector: '[control-text]',
  inputs: ['control', 'label', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t<input type=\"text\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [disabled]=\"disabled\" />\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlTextareaComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlTextareaComponent, _ControlComponent);

  function ControlTextareaComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlTextareaComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
  };

  return ControlTextareaComponent;
}(ControlComponent);
ControlTextareaComponent.meta = {
  selector: '[control-textarea]',
  inputs: ['control', 'label', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--textarea\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<textarea class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [innerHTML]=\"label\" rows=\"4\" [disabled]=\"disabled\"></textarea>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ErrorsComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ErrorsComponent, _ControlComponent);

  function ErrorsComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ErrorsComponent.prototype;

  _proto.getLabel = function getLabel(key, value) {
    var label = LabelPipe.transform("error_" + key);
    return label;
  };

  return ErrorsComponent;
}(ControlComponent);
ErrorsComponent.meta = {
  selector: 'errors-component',
  inputs: ['control'],
  template:
  /* html */
  "\n\t<div class=\"inner\" [style]=\"{ display: control.invalid && control.touched ? 'block' : 'none' }\">\n\t\t<div class=\"error\" *for=\"let [key, value] of control.errors\">\n\t\t\t<span [innerHTML]=\"getLabel(key, value)\"></span>\n\t\t\t<!-- <span class=\"key\" [innerHTML]=\"key\"></span> <span class=\"value\" [innerHTML]=\"value | json\"></span> -->\n\t\t</div>\n\t</div>\n\t"
};var TestComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TestComponent, _Component);

  function TestComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TestComponent.prototype;

  _proto.onTest = function onTest(event) {
    this.test.next(event);
  };

  _proto.onReset = function onReset(event) {
    this.reset.next(event);
  };

  return TestComponent;
}(rxcomp.Component);
TestComponent.meta = {
  selector: 'test-component',
  inputs: ['form'],
  outputs: ['test', 'reset'],
  template:
  /* html */
  "\n\t<div class=\"test-component\" *if=\"!('production' | flag)\">\n\t\t<div class=\"test-component__title\">development mode</div>\n\t\t<code [innerHTML]=\"form.value | json\"></code>\n\t\t<button type=\"button\" class=\"btn--submit\" (click)=\"onTest($event)\"><span>test</span></button>\n\t\t<button type=\"button\" class=\"btn--submit\" (click)=\"onReset($event)\"><span>reset</span></button>\n\t</div>\n\t"
};var factories$1 = [ControlCheckboxComponent, ControlCustomSelectComponent, ControlEmailComponent, ControlFileComponent, ControlPasswordComponent, // ControlSelectComponent,
ControlSearchComponent, ControlTextareaComponent, ControlTextComponent, // DisabledDirective,
ErrorsComponent, TestComponent // ValueDirective,
];
var pipes$1 = [];
var ControlsModule = /*#__PURE__*/function (_Module) {
  _inheritsLoose(ControlsModule, _Module);

  function ControlsModule() {
    return _Module.apply(this, arguments) || this;
  }

  return ControlsModule;
}(rxcomp.Module);
ControlsModule.meta = {
  imports: [],
  declarations: [].concat(factories$1, pipes$1),
  exports: [].concat(factories$1, pipes$1)
};var FilterMode = {
  SELECT: 'select',
  AND: 'and',
  OR: 'or',
  QUERY: 'query'
};
var FilterItem = /*#__PURE__*/function () {
  function FilterItem(filter) {
    this.change$ = new rxjs.BehaviorSubject();
    this.mode = FilterMode.SELECT;
    this.filter = 'Filter';
    this.placeholder = 'Select';
    this.values = [];
    this.options = [];

    if (filter) {
      Object.assign(this, filter);
    }

    if (filter.mode === FilterMode.SELECT) {
      filter.options.unshift({
        label: filter.placeholder,
        value: undefined
      });
    }
  }

  var _proto = FilterItem.prototype;

  _proto.filter = function filter(item, value) {
    return item.options.indexOf(value) !== -1;
  };

  _proto.match = function match(item) {
    var _this = this;

    var match;

    if (this.mode === FilterMode.OR) {
      match = this.values.length ? false : true;
      this.values.forEach(function (value) {
        match = match || _this.filter(item, value);
      });
    } else {
      match = true;
      this.values.forEach(function (value) {
        match = match && _this.filter(item, value);
      });
    }

    return match;
  };

  _proto.getLabel = function getLabel() {
    if (this.mode === FilterMode.SELECT || this.mode === FilterMode.QUERY) {
      return this.placeholder || this.label;
    } else {
      return this.label;
    }
  };

  _proto.has = function has(item) {
    return this.values.indexOf(item.value) !== -1;
  };

  _proto.set = function set(item) {
    if (this.mode === FilterMode.QUERY) {
      this.values = item ? [item] : [];
      this.placeholder = item;
    } else {
      if (this.mode === FilterMode.SELECT) {
        this.values = [];
      }

      var index = this.values.indexOf(item.value);

      if (index === -1) {
        if (item.value !== undefined) {
          this.values.push(item.value);
        }
      }

      if (this.mode === FilterMode.SELECT) {
        this.placeholder = item.label;
      }
    } // console.log('FilterItem.set', item);


    this.change$.next();
  };

  _proto.remove = function remove(item) {
    var index = this.values.indexOf(item.value);

    if (index !== -1) {
      this.values.splice(index, 1);
    }

    if (this.mode === FilterMode.SELECT) {
      var first = this.options[0];
      this.placeholder = first.label;
    } // console.log('FilterItem.remove', item);


    this.change$.next();
  };

  _proto.toggle = function toggle(item) {
    if (this.has(item)) {
      this.remove(item);
    } else {
      this.set(item);
    }
  };

  _proto.clear = function clear() {
    this.values = [];

    if (this.mode === FilterMode.SELECT) {
      var first = this.options[0];
      this.placeholder = first.label;
    }

    this.change$.next();
  };

  return FilterItem;
}();var FilterService = /*#__PURE__*/function () {
  function FilterService(options, initialParams, callback) {
    var filters = {};

    if (options) {
      Object.keys(options).forEach(function (key) {
        var filter = new FilterItem(options[key]);

        if (typeof callback === 'function') {
          callback(key, filter);
        }

        filters[key] = filter;
      });
    }

    this.filters = filters;
    this.deserialize(this.filters, initialParams);
  }

  var _proto = FilterService.prototype;

  _proto.getParamsCount = function getParamsCount(params) {
    if (params) {
      var paramsCount = Object.keys(params).reduce(function (p, c, i) {
        var values = params[c];
        return p + (values ? values.length : 0);
      }, 0);
      return paramsCount;
    } else {
      return 0;
    }
  };

  _proto.deserialize = function deserialize(filters, initialParams) {
    var params;

    if (initialParams && this.getParamsCount(initialParams)) {
      params = initialParams;
    }

    var locationParams = LocationService.deserialize('filters');

    if (locationParams && this.getParamsCount(locationParams)) {
      params = locationParams;
    }

    if (params) {
      Object.keys(filters).forEach(function (key) {
        filters[key].values = params[key] || [];
      });
    }

    return filters;
  };

  _proto.serialize = function serialize(filters) {
    var params = {};
    var any = false;
    Object.keys(filters).forEach(function (x) {
      var filter = filters[x];

      if (filter.value !== null) {
        params[x] = filter.values;
        any = true;
      }
    });

    if (!any) {
      params = null;
    } // console.log('ReferenceCtrl.serialize', params);


    LocationService.serialize('filters', params);
    return params;
  };

  _proto.items$ = function items$(items) {
    var _this = this;

    var filters = this.filters;
    var changes = Object.keys(filters).map(function (key) {
      return filters[key].change$;
    });
    return rxjs.merge.apply(void 0, changes).pipe( // tap(() => console.log(filters)),
    operators.tap(function () {
      return _this.serialize(filters);
    }), operators.map(function () {
      return _this.filterItems(items);
    }), operators.tap(function () {
      return _this.updateFilterStates(filters, items);
    }));
  };

  _proto.filterItems = function filterItems(items, skipFilter) {
    var _this2 = this;

    var filters = Object.keys(this.filters).map(function (x) {
      return _this2.filters[x];
    }).filter(function (x) {
      return x.value !== null;
    });
    items = items.filter(function (item) {
      var has = true;
      filters.forEach(function (filter) {
        if (filter !== skipFilter) {
          has = has && filter.match(item);
        }
      });
      return has;
    });
    return items;
  };

  _proto.updateFilterStates = function updateFilterStates(filters, items) {
    var _this3 = this;

    Object.keys(filters).forEach(function (x) {
      var filter = filters[x];

      var filteredItems = _this3.filterItems(items, filter);

      filter.options.forEach(function (option) {
        var count = 0;

        if (option.value) {
          var i = 0;

          while (i < filteredItems.length) {
            var item = filteredItems[i];

            if (filter.filter(item, option.value)) {
              count++;
            }

            i++;
          }
        } else {
          count = filteredItems.length;
        }

        option.count = count;
        option.disabled = count === 0;
      });
    });
  };

  _proto.reset = function reset() {
    var _this4 = this;

    var filter;
    Object.keys(this.filters).forEach(function (x) {
      filter = _this4.filters[x];
      filter.values = [];
    });

    if (filter) {
      filter.change$.next();
    }
  };

  return FilterService;
}();var FormService = /*#__PURE__*/function () {
  function FormService() {}

  FormService.toSelectOptions = function toSelectOptions(options) {
    options = options.slice().map(function (x) {
      return {
        id: x.value,
        name: x.label
      };
    });
    options.unshift({
      id: null,
      name: 'select'
    });
    return options;
  };

  return FormService;
}();var AmbienceService = /*#__PURE__*/function () {
  function AmbienceService() {}

  AmbienceService.all$ = function all$() {
    return ApiService.get$('/ambience/all.json');
  };

  AmbienceService.filters$ = function filters$() {
    return ApiService.get$('/ambience/filters.json');
  };

  return AmbienceService;
}();var AmbienceComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AmbienceComponent, _Component);

  function AmbienceComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AmbienceComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.ambienceId = this.ambienceId || null;
    this.items = [];
    this.filteredItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      ambience: new rxcompForm.FormControl(null),
      category: new rxcompForm.FormControl(null),
      material: new rxcompForm.FormControl(null),
      designer: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('AmbienceComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('ambience', form.value.ambience);

      _this.setFilterByKeyAndValue('category', form.value.category);

      _this.setFilterByKeyAndValue('material', form.value.material);

      _this.setFilterByKeyAndValue('designer', form.value.designer);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.ambience.options = FormService.toSelectOptions(_this.filters.ambience.options);
      controls.category.options = FormService.toSelectOptions(_this.filters.category.options);
      controls.material.options = FormService.toSelectOptions(_this.filters.material.options);
      controls.designer.options = FormService.toSelectOptions(_this.filters.designer.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([AmbienceService.all$(), AmbienceService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'ambience':
                return item.ambience.id === value;

              case 'category':
                return item.category.id === value;

              case 'material':
                return item.materials.indexOf(value) !== -1;

              case 'designer':
                return item.designers.indexOf(value) !== -1;

              case 'search':
                return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var ambience = this.ambienceId ? this.ambienceId : this.filters.ambience.values.length ? this.filters.ambience.values[0] : null;
    var category = this.filters.category.values.length ? this.filters.category.values[0] : null;
    var material = this.filters.material.values.length ? this.filters.material.values[0] : null;
    var designer = this.filters.designer.values.length ? this.filters.designer.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      ambience: ambience,
      category: category,
      material: material,
      designer: designer,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('AmbienceComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('AmbienceComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('ambience', this.form.value.ambience);
    this.setFilterByKeyAndValue('category', this.form.value.category);
    this.setFilterByKeyAndValue('material', this.form.value.material);
    this.setFilterByKeyAndValue('designer', this.form.value.designer);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return AmbienceComponent;
}(rxcomp.Component);
AmbienceComponent.meta = {
  selector: '[ambience]',
  inputs: ['ambienceId']
};var AteliersAndStoresService = /*#__PURE__*/function () {
  function AteliersAndStoresService() {}

  AteliersAndStoresService.all$ = function all$() {
    return ApiService.get$('/ateliers-and-stores/all.json');
  };

  AteliersAndStoresService.ateliers$ = function ateliers$() {
    return ApiService.get$('/ateliers-and-stores/ateliers.json');
  };

  AteliersAndStoresService.stores$ = function stores$() {
    return ApiService.get$('/ateliers-and-stores/stores.json');
  };

  AteliersAndStoresService.filters$ = function filters$() {
    return ApiService.get$('/ateliers-and-stores/filters.json');
  };

  return AteliersAndStoresService;
}();var AteliersAndStoresComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AteliersAndStoresComponent, _Component);

  function AteliersAndStoresComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AteliersAndStoresComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.types = {
      Atelier: 1,
      Store: 2
    };
    this.items = [];
    this.filteredItems = [];
    this.filteredAteliers = [];
    this.filteredStores = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      country: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('AteliersAndStoresComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('country', form.value.country);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.country.options = FormService.toSelectOptions(_this.filters.country.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([AteliersAndStoresService.all$(), AteliersAndStoresService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'country':
                return item.country.id === value;

              case 'search':
                return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.country.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var country = this.filters.country.values.length ? this.filters.country.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      country: country,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;
      _this2.filteredAteliers = filteredItems.filter(function (x) {
        return x.type === _this2.types.Atelier;
      });
      _this2.filteredStores = filteredItems.filter(function (x) {
        return x.type === _this2.types.Store;
      });

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('AteliersAndStoresComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('AteliersAndStoresComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('country', this.form.value.country);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return AteliersAndStoresComponent;
}(rxcomp.Component);
AteliersAndStoresComponent.meta = {
  selector: '[ateliers-and-stores]'
};function push_(event) {
  var dataLayer = window.dataLayer || [];
  dataLayer.push(event);
  console.log('GtmService.dataLayer', event);
}

var GtmService = /*#__PURE__*/function () {
  function GtmService() {}

  GtmService.push = function push(event) {
    return push_(event);
  };

  return GtmService;
}();var CareersService = /*#__PURE__*/function () {
  function CareersService() {}

  CareersService.data$ = function data$() {
    return ApiService.get$('/careers/data.json');
  };

  CareersService.submit$ = function submit$() {
    return ApiService.post$('/careers/submit.json');
  };

  return CareersService;
}();var CareersComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CareersComponent, _Component);

  function CareersComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = CareersComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    this.success = false;
    var form = this.form = new rxcompForm.FormGroup({
      firstName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      lastName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
      telephone: new rxcompForm.FormControl(null),
      country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      city: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      domain: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      cv: new rxcompForm.FormControl(null),
      message: new rxcompForm.FormControl(null),
      privacy: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      checkRequest: window.antiforgery,
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();

      LocomotiveScrollService.update();
    });
    this.load$().pipe(operators.first()).subscribe();
  };

  _proto.load$ = function load$() {
    var _this2 = this;

    return CareersService.data$().pipe(operators.tap(function (data) {
      var controls = _this2.controls;
      controls.country.options = FormService.toSelectOptions(data.country.options);
      controls.domain.options = FormService.toSelectOptions(data.domain.options);

      _this2.pushChanges();
    }));
  };

  _proto.test = function test() {
    var form = this.form;
    var controls = this.controls;
    var country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
    var domain = controls.domain.options.length > 1 ? controls.domain.options[1].id : null;
    form.patch({
      firstName: 'Jhon',
      lastName: 'Appleseed',
      email: 'jhonappleseed@gmail.com',
      telephone: '0721 411112',
      country: country,
      city: 'Pesaro',
      domain: domain,
      message: 'Hi!',
      privacy: true,
      checkRequest: window.antiforgery,
      checkField: ''
    });
  };

  _proto.reset = function reset() {
    var form = this.form;
    form.reset();
  };

  _proto.onSubmit = function onSubmit(model) {
    var _this3 = this;

    var form = this.form;
    console.log('CareersComponent.onSubmit', form.value); // console.log('CareersComponent.onSubmit', 'form.valid', valid);

    if (form.valid) {
      // console.log('CareersComponent.onSubmit', form.value);
      form.submitted = true;
      CareersService.submit$(form.value).pipe(operators.first()).subscribe(function (_) {
        _this3.success = true;
        form.reset();
        GtmService.push({
          'event': "Careers",
          'form_name': "Lavora con noi"
        });
      }, function (error) {
        console.log('CareersComponent.error', error);
        _this3.error = error;

        _this3.pushChanges();

        LocomotiveScrollService.update();
      });
    } else {
      form.touched = true;
    }
  };

  _proto.scrollTo = function scrollTo(selector, event) {
    if (event) {
      event.preventDefault();
    }

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector(selector);
    LocomotiveScrollService.scrollTo(target, {
      offset: -130
    });
  };

  return CareersComponent;
}(rxcomp.Component);
CareersComponent.meta = {
  selector: '[careers]'
};var ContactsService = /*#__PURE__*/function () {
  function ContactsService() {}

  ContactsService.data$ = function data$() {
    return ApiService.get$('/contacts/data.json');
  };

  ContactsService.submit$ = function submit$() {
    return ApiService.post$('/contacts/submit.json');
  };

  return ContactsService;
}();var ContactsComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ContactsComponent, _Component);

  function ContactsComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ContactsComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    this.success = false;
    var form = this.form = new rxcompForm.FormGroup({
      firstName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      lastName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
      telephone: new rxcompForm.FormControl(null),
      country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      city: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      message: new rxcompForm.FormControl(null),
      privacy: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      newsletter: new rxcompForm.FormControl(this.flag),
      checkRequest: window.antiforgery,
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();

      LocomotiveScrollService.update();
    });
    this.load$().pipe(operators.first()).subscribe();
  };

  _proto.load$ = function load$() {
    var _this2 = this;

    return ContactsService.data$().pipe(operators.tap(function (data) {
      var controls = _this2.controls;
      controls.country.options = FormService.toSelectOptions(data.country.options);

      _this2.pushChanges();
    }));
  };

  _proto.test = function test() {
    var form = this.form;
    var controls = this.controls;
    var country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
    form.patch({
      firstName: 'Jhon',
      lastName: 'Appleseed',
      email: 'jhonappleseed@gmail.com',
      telephone: '0721 411112',
      country: country,
      city: 'Pesaro',
      message: 'Hi!',
      privacy: true,
      checkRequest: window.antiforgery,
      checkField: ''
    });
  };

  _proto.reset = function reset() {
    var form = this.form;
    form.reset();
  };

  _proto.onSubmit = function onSubmit(model) {
    var _this3 = this;

    var form = this.form;
    console.log('ContactsComponent.onSubmit', form.value); // console.log('ContactsComponent.onSubmit', 'form.valid', valid);

    if (form.valid) {
      // console.log('ContactsComponent.onSubmit', form.value);
      form.submitted = true;
      ContactsService.submit$(form.value).pipe(operators.first()).subscribe(function (_) {
        _this3.success = true;
        form.reset();
        GtmService.push({
          'event': "Contact",
          'form_name': "Contatti"
        });

        if (form.value.newsletter) {
          GtmService.push({
            'event': "ContactNewsletter",
            'form_name': "ContattiNewsletter"
          });
        }
      }, function (error) {
        console.log('ContactsComponent.error', error);
        _this3.error = error;

        _this3.pushChanges();

        LocomotiveScrollService.update();
      });
    } else {
      form.touched = true;
    }
  };

  _proto.scrollTo = function scrollTo(selector, event) {
    if (event) {
      event.preventDefault();
    }

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector(selector);
    LocomotiveScrollService.scrollTo(target, {
      offset: -130
    });
  };

  return ContactsComponent;
}(rxcomp.Component);
ContactsComponent.meta = {
  selector: '[contacts]'
};var DealersService = /*#__PURE__*/function () {
  function DealersService() {}

  DealersService.all$ = function all$() {
    return ApiService.get$('/dealers/all.json').pipe(operators.map(function (items) {
      return items.sort(function (a, b) {
        return b.regions.length - a.regions.length;
      });
    }));
  };

  DealersService.filters$ = function filters$() {
    return ApiService.get$('/dealers/filters.json');
  };

  return DealersService;
}();var DealersComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(DealersComponent, _Component);

  function DealersComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = DealersComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.items = [];
    this.filteredItems = [];
    this.visibleItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      country: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('DealersComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('country', form.value.country);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.country.options = FormService.toSelectOptions(_this.filters.country.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([DealersService.all$(), DealersService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'country':
                return item.countries && item.countries.find(function (x) {
                  return x.value === value;
                });

              case 'search':
                return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || // item.address.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                item.city && item.city.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.countries && item.countries.find(function (x) {
                  return x.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
                });
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var country = this.filters.country.values.length ? this.filters.country.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      country: country,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;
      _this2.visibleItems = filteredItems.slice(0, Math.min(12, filteredItems.length));

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('DealersComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.showMore = function showMore(event) {
    this.visibleItems = this.filteredItems.slice();
    this.pushChanges();
    LocomotiveScrollService.update();
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('DealersComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('country', this.form.value.country);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return DealersComponent;
}(rxcomp.Component);
DealersComponent.meta = {
  selector: '[dealers]'
};var DesignersService = /*#__PURE__*/function () {
  function DesignersService() {}

  DesignersService.all$ = function all$() {
    return ApiService.get$('/designers/all.json');
  };

  DesignersService.filters$ = function filters$() {
    return ApiService.get$('/designers/filters.json');
  };

  return DesignersService;
}();var DesignersComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(DesignersComponent, _Component);

  function DesignersComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = DesignersComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.items = [];
    this.filteredItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      category: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('DesignersComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('category', form.value.category);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.category.options = FormService.toSelectOptions(_this.filters.category.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([DesignersService.all$(), DesignersService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'category':
                return item.category.id === value;

              case 'search':
                return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var category = this.filters.category.values.length ? this.filters.category.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      category: category,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('DesignersComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('DesignersComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('category', this.form.value.category);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return DesignersComponent;
}(rxcomp.Component);
DesignersComponent.meta = {
  selector: '[designers]'
};var MaterialsModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MaterialsModalComponent, _Component);

  function MaterialsModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MaterialsModalComponent.prototype;

  _proto.onInit = function onInit() {
    _Component.prototype.onInit.call(this);

    this.item = null;
    this.items = null;

    var _getContext = rxcomp.getContext(this),
        parentInstance = _getContext.parentInstance;

    if (parentInstance instanceof ModalOutletComponent) {
      var data = parentInstance.modal.data;
      this.item = data.item;
      this.items = data.items; // console.log('MaterialsModalComponent.onInit', data);
    }

    LocomotiveScrollService.stop();
  };

  _proto.hasPrev = function hasPrev() {
    return true;
  };

  _proto.hasNext = function hasNext() {
    return true;
  };

  _proto.onPrev = function onPrev() {
    var index = this.items.indexOf(this.item);
    index--;

    if (index < 0) {
      index = this.items.length - 1;
    }

    this.item = this.items[index];
    this.pushChanges();
  };

  _proto.onNext = function onNext() {
    var index = this.items.indexOf(this.item);
    index++;

    if (index === this.items.length) {
      index = 0;
    }

    this.item = this.items[index];
    this.pushChanges();
  };

  _proto.onClose = function onClose() {
    ModalService.reject();
  };

  _proto.onDestroy = function onDestroy() {
    LocomotiveScrollService.start();
  };

  return MaterialsModalComponent;
}(rxcomp.Component);
MaterialsModalComponent.meta = {
  selector: '[materials-modal]'
};var MaterialsService = /*#__PURE__*/function () {
  function MaterialsService() {}

  MaterialsService.all$ = function all$() {
    return ApiService.get$('/materials/all.json');
  };

  MaterialsService.filters$ = function filters$() {
    return ApiService.get$('/materials/filters.json');
  };

  MaterialsService.fake$ = function fake$() {
    return rxjs.combineLatest([MaterialsService.all$(), ApiService.get$('/materials/all_.json')]).pipe(operators.map(function (data) {
      var items = data[0];
      var items_ = data[1];
      items.forEach(function (item, i) {
        var item_ = items_.find(function (x) {
          return x.id === item.id;
        });

        if (item_) {
          item.image = item_.image.replace(/\s/g, '_').toLowerCase();
          item.zoom = item_.zoom.replace(/\s/g, '_').toLowerCase();
        } // item.collection = MaterialsService.toTitleCase(item.collection);
        // item.title = MaterialsService.toTitleCase(item.title);

      });
      console.log(JSON.stringify(items));
      return items;
    }));
  };

  MaterialsService.toTitleCase = function toTitleCase(sentence, seps) {
    if (seps === void 0) {
      seps = ' _-/';
    }

    var capitalize = function capitalize(str) {
      return str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
    };

    var escape = function escape(str) {
      return str.replace(/./g, function (c) {
        return "\\" + c;
      });
    };

    var wordPattern = new RegExp("[^" + escape(seps) + "]+", 'g');
    return sentence.replace(wordPattern, capitalize);
  };

  return MaterialsService;
}();var MaterialsComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MaterialsComponent, _Component);

  function MaterialsComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MaterialsComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.categories = [];
    this.selectedItem = null;
    this.items = [];
    this.filteredItems = [];
    this.visibleItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      category: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.setFilterByKeyAndValue('category', form.value.category);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.category.options = FormService.toSelectOptions(_this.filters.category.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([MaterialsService.fake$(), MaterialsService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'category':
                return item.category.id === value;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    this.categories = this.filters.category.options;
    var category = this.filters.category.values.length ? this.filters.category.values[0] : null;
    this.form.patch({
      category: category,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;
      _this2.visibleItems = _this2.filteredItems.slice(0, Math.min(16, _this2.filteredItems.length));

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('MaterialsComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.showMore = function showMore(event) {
    var pageSize = 32;

    if (this.visibleItems.length + pageSize >= this.filteredItems.length) {
      this.visibleItems = this.filteredItems.slice();
    } else {
      this.visibleItems = this.filteredItems.slice(0, Math.min(this.visibleItems.length + pageSize, this.filteredItems.length));
    }

    this.pushChanges();
    LocomotiveScrollService.update();
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onToggle = function onToggle(item) {
    this.selectedItem = this.selectedItem === item ? null : item;
    /*
    if (this.selectedItem) {
    	const selector = '#cat-' + item.category.id + '-' + item.id;
    	this.scrollTo(selector);
    }
    */

    this.pushChanges();
  };

  _proto.onOpen = function onOpen(item, items) {
    ModalService.open$({
      src: environment.template.modal.materialsModal,
      data: {
        item: item,
        items: items
      }
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      console.log('MaterialComponent.onOpen', event);
      /*
      if (event instanceof ModalResolveEvent) {
      	window.location.href = environment.slug.reservedArea;
      }
      */
    });
  };

  _proto.setCategory = function setCategory(category, event) {
    var _this3 = this;

    if (event) {
      event.preventDefault();
    }

    this.controls.category.value = category.value;
    setTimeout(function () {
      LocomotiveScrollService.update();

      _this3.scrollTo('#category-' + category.value);
    }, 100);
  };

  _proto.scrollTo = function scrollTo(selector, event) {
    if (event) {
      event.preventDefault();
    }

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector(selector);
    LocomotiveScrollService.scrollTo(target, {
      offset: -130
    });
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return MaterialsComponent;
}(rxcomp.Component);
MaterialsComponent.meta = {
  selector: '[materials]'
};var NewsService = /*#__PURE__*/function () {
  function NewsService() {}

  NewsService.all$ = function all$() {
    return ApiService.get$('/news/all.json');
  };

  NewsService.filters$ = function filters$() {
    return ApiService.get$('/news/filters.json');
  };

  return NewsService;
}();var NewsComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(NewsComponent, _Component);

  function NewsComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = NewsComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.items = [];
    this.filteredItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      country: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('NewsComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('country', form.value.country);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.country.options = FormService.toSelectOptions(_this.filters.country.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([NewsService.all$(), NewsService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'country':
                return item.country.id === value;

              case 'search':
                return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.abstract.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var country = this.filters.country.values.length ? this.filters.country.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      country: country,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('NewsComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('NewsComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('country', this.form.value.country);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return NewsComponent;
}(rxcomp.Component);
NewsComponent.meta = {
  selector: '[news]'
};var NewsletterService = /*#__PURE__*/function () {
  function NewsletterService() {}

  NewsletterService.data$ = function data$() {
    return ApiService.get$('/newsletter/data.json');
  };

  NewsletterService.submit$ = function submit$() {
    return ApiService.post$('/newsletter/submit.json');
  };

  return NewsletterService;
}();var NewsletterComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(NewsletterComponent, _Component);

  function NewsletterComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = NewsletterComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    this.success = false;
    var email = LocationService.deserialize('email'); // console.log('NewsletterComponent', email);

    var form = this.form = new rxcompForm.FormGroup({
      firstName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      lastName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      email: new rxcompForm.FormControl(email, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
      occupation: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      telephone: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      city: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      engagement: new rxcompForm.FormControl(null),
      newsletter: true,
      newsletterLanguage: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      privacy: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      checkRequest: window.antiforgery,
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();

      LocomotiveScrollService.update();
    });
    this.load$().pipe(operators.first()).subscribe();
  };

  _proto.load$ = function load$() {
    var _this2 = this;

    return NewsletterService.data$().pipe(operators.tap(function (data) {
      var controls = _this2.controls;
      controls.occupation.options = FormService.toSelectOptions(data.occupation.options);
      controls.country.options = FormService.toSelectOptions(data.country.options);
      controls.engagement.options = FormService.toSelectOptions(data.engagement.options);
      controls.newsletterLanguage.options = FormService.toSelectOptions(data.newsletterLanguage.options);

      _this2.pushChanges();
    }));
  };

  _proto.test = function test() {
    var form = this.form;
    var controls = this.controls;
    var occupation = controls.occupation.options.length > 1 ? controls.occupation.options[1].id : null;
    var country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
    var engagement = controls.engagement.options.length > 1 ? controls.engagement.options[1].id : null;
    var newsletterLanguage = controls.newsletterLanguage.options.length > 1 ? controls.newsletterLanguage.options[1].id : null;
    form.patch({
      firstName: 'Jhon',
      lastName: 'Appleseed',
      email: 'jhonappleseed@gmail.com',
      telephone: '0721 411112',
      occupation: occupation,
      country: country,
      city: 'Pesaro',
      engagement: engagement,
      newsletterLanguage: newsletterLanguage,
      privacy: true,
      checkRequest: window.antiforgery,
      checkField: ''
    });
  };

  _proto.reset = function reset() {
    var form = this.form;
    form.reset();
  };

  _proto.onSubmit = function onSubmit(model) {
    var _this3 = this;

    var form = this.form;
    console.log('NewsletterComponent.onSubmit', form.value); // console.log('NewsletterComponent.onSubmit', 'form.valid', valid);

    if (form.valid) {
      // console.log('NewsletterComponent.onSubmit', form.value);
      form.submitted = true;
      NewsletterService.submit$(form.value).pipe(operators.first()).subscribe(function (_) {
        _this3.success = true;
        form.reset();
        GtmService.push({
          'event': "Newsletter",
          'form_name': "Newsletter"
        });
      }, function (error) {
        console.log('NewsletterComponent.error', error);
        _this3.error = error;

        _this3.pushChanges();

        LocomotiveScrollService.update();
      });
    } else {
      form.touched = true;
    }
  };

  _proto.scrollTo = function scrollTo(selector, event) {
    if (event) {
      event.preventDefault();
    }

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector(selector);
    LocomotiveScrollService.scrollTo(target, {
      offset: -130
    });
  };

  return NewsletterComponent;
}(rxcomp.Component);
NewsletterComponent.meta = {
  selector: '[newsletter]'
};var breadcumbStyle = "font-size: .8rem; text-transform: uppercase; letter-spacing: 0.075em; color: #37393b;";
var titleStyle = "letter-spacing: 0; font-family: 'Bauer Bodoni', sans-serif; font-size: 2.9rem; margin: 0;word-wrap: break-word;text-transform: uppercase;color:#37393b;";
var designerStyle = "font-size: .8rem; letter-spacing: 0.075em;margin-bottom: 15px;word-wrap: break-word;text-transform: uppercase;";
var descriptionStyle = "font-size: .8rem; text-align: left;margin-bottom: 15px; letter-spacing: 0.05em;";
var key = 'a9$hhVGHxos';
var ProductsConfigureComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ProductsConfigureComponent, _Component);

  function ProductsConfigureComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProductsConfigureComponent.prototype;

  _proto.onInit = function onInit() {
    this.isReady = false;
    this.isComplete = false;
    this.isConfiguring = false;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var iframe = this.iframe = node.querySelector('#showefy');

    if (!iframe) {
      throw 'missing iframe';
    }

    this.onEvent = this.onEvent.bind(this);
    HttpService.http$('POST', 'https://www.showefy.com/en/ApiExt/token/v1', {
      grant_type: 'client_credentials'
    }, 'json', 'giorgetti:AGdW%Q_8@Pe,2&#').pipe(operators.first()).subscribe(function (response) {
      console.log(response);
    });
    var sfy = this.sfy = new SFYFrame(iframe, key, this.onEvent);
    sfy.init();
    console.log('ProductsConfigureComponent.onInit', sfy, iframe);
  };

  _proto.getIframeDocument = function getIframeDocument(iframe) {
    var content = iframe.contentWindow || iframe.contentDocument;
    var iframeDocument = content.document ? content.document : content;
    return iframeDocument;
  };

  _proto.onEvent = function onEvent(data) {
    var event = JSON.parse(data);
    var eventName = event.emit;

    if (event.status == 0) {
      // console.log('ProductsConfigureComponent.onEvent', event);
      switch (eventName) {
        case 'showefy_ready':
          this.onReady(event);
          break;

        case 'showefy_complete':
          this.onShowefyComplete(event);
          break;

        case 'start_configurator':
          this.onStartConfigurator(event);
          break;

        case 'button_pressed':
          this.onButtonPressed(event);
          break;

        case 'setButtonStatus':
          this.onSetButtonStatus(event);
          break;

        case 'getIframeSize':
          this.onGetIframeSize(event);
          break;

        case 'getProductExtData':
          this.onGetProductExtData(event);
          break;

        case 'getFastProductExtData':
          this.onGetFastProductExtData(event);
          break;
      }

      if (this.isConfiguring && this.isReady && this.isComplete) {
        console.log('set taratura impaginazione configuratore');

        var _getContext2 = rxcomp.getContext(this),
            node = _getContext2.node; // window.scroll(0, findPos(document.getElementById('container_ifrshowefy')));


        LocomotiveScrollService.update();
        LocomotiveScrollService.scrollTo(node, {
          offset: -100
        });
      }
    } else {
      console.log('ProductsConfigureComponent.onEvent.error', event.status, event.statusTxt, eventName);
    }
  };

  _proto.onReady = function onReady(event) {
    console.log('ProductsConfigureComponent.onReady', event);
    this.isReady = true;
    this.addTexts();
    this.addButtons();
    this.addBreadcrumb();
    return;
  };

  _proto.onShowefyComplete = function onShowefyComplete(event) {
    console.log('ProductsConfigureComponent.onShowefyComplete', event);

    if (this.isConfiguring) {
      this.isComplete = true;
    }
  };

  _proto.onStartConfigurator = function onStartConfigurator(event) {
    console.log('ProductsConfigureComponent.onStartConfigurator', event);
    this.isConfiguring = true;
  };

  _proto.onButtonPressed = function onButtonPressed(event) {
    console.log('ProductsConfigureComponent.onButtonPressed', event, 'buttonId', event.data.id);
  };

  _proto.onSetButtonStatus = function onSetButtonStatus(event) {
    console.log('ProductsConfigureComponent.onSetButtonStatus', event);
  };

  _proto.onGetIframeSize = function onGetIframeSize(event) {
    console.log('ProductsConfigureComponent.onGetIframeSize', event);
  };

  _proto.onGetProductExtData = function onGetProductExtData(event) {
    console.log('ProductsConfigureComponent.onGetProductExtData', event);
  };

  _proto.onGetFastProductExtData = function onGetFastProductExtData(event) {
    console.log('ProductsConfigureComponent.onGetFastProductExtData', event);
  };

  _proto.findPos = function findPos(obj) {
    var curtop = 0;

    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);

      return [curtop];
    }
  } // methods
  ;

  _proto.addTexts = function addTexts() {
    var sfy = this.sfy;
    var html = sfy.HTML;
    var index = 0;
    html.text[index++] =
    /* html */
    "<h1 style=\"" + titleStyle + "\">Nome Prodotto</h1>";
    html.text[index++] =
    /* html */
    "<h5 style=\"" + designerStyle + "\">Designer</h5>";
    html.text[index++] =
    /* html */
    "<div style=\"" + descriptionStyle + "\"><p>Descrizione</p></div>";
    sfy.printHTML(html);
  };

  _proto.addButtons = function addButtons() {
    var sfy = this.sfy;
    var buttons = sfy.BUTTONS;
    var index = 0;
    buttons.element[index] = new sfy.PROPERTIES();
    buttons.element[index].visibility = true;
    buttons.element[index].id = 'order';
    buttons.element[index].label = new sfy.LABEL();
    buttons.element[index].label.en = 'ADD TO CART';
    index++;
    buttons.element[index] = new sfy.PROPERTIES();
    buttons.element[index].visibility = true;
    buttons.element[index].id = 'save_configuration';
    buttons.element[index].label = new sfy.LABEL();
    buttons.element[index].label.en = 'SAVE CONFIGURATION';
    index++;
    sfy.setButtonStatus(buttons);
  };

  _proto.addBreadcrumb = function addBreadcrumb() {
    var sfy = this.sfy;
    var breadcrumb = sfy.BREADCUMB;
    var index = 0;
    breadcrumb.element[index] = new sfy.PROPERTIES();
    breadcrumb.element[index].visibility = true;
    breadcrumb.element[index].id = 'breadcumb_home';
    breadcrumb.element[index].label = new sfy.LABEL();
    breadcrumb.element[index].label.en =
    /* html */
    " Home <span aria-hidden='true'>/</span>&nbsp; ";
    breadcrumb.element[index].style = breadcumbStyle;
    index++;
    breadcrumb.element[index] = new sfy.PROPERTIES();
    breadcrumb.element[index].visibility = true;
    breadcrumb.element[index].id = 'breadcumb_products';
    breadcrumb.element[index].label = new sfy.LABEL();
    breadcrumb.element[index].label.en =
    /* html */
    " Products <span aria-hidden='true'>/</span>&nbsp; ";
    breadcrumb.element[index].style = breadcumbStyle;
    index++;
    breadcrumb.element[index] = new sfy.PROPERTIES();
    breadcrumb.element[index].visibility = true;
    breadcrumb.element[index].id = 'breadcumb_products';
    breadcrumb.element[index].label = new sfy.LABEL();
    breadcrumb.element[index].label.en =
    /* html */
    " Nome prodotto";
    breadcrumb.element[index].style = breadcumbStyle;
    index++;
    sfy.printBreadcumb(breadcrumb);
  };

  _proto.getCartData = function getCartData() {
    var sfy = this.sfy;

    if (sfy) {
      sfy.getProductExtData();
    }
  };

  _proto.getFastData = function getFastData() {
    var sfy = this.sfy;

    if (sfy) {
      sfy.getFastProductExtData();
    }
  };

  return ProductsConfigureComponent;
}(rxcomp.Component);
ProductsConfigureComponent.meta = {
  selector: '[products-configure]'
};var ProductsDetailService = /*#__PURE__*/function () {
  function ProductsDetailService() {}

  ProductsDetailService.versions$ = function versions$() {
    return ApiService.get$('/products-detail/versions.json');
  };

  return ProductsDetailService;
}();var ProductsDetailComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ProductsDetailComponent, _Component);

  function ProductsDetailComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProductsDetailComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.items = [];
    this.visibleItems = [];
    ProductsDetailService.versions$().pipe(operators.first()).subscribe(function (items) {
      _this.items = items;
      _this.visibleItems = _this.items.slice(0, Math.min(4, _this.items.length));

      _this.pushChanges();
    });
  };

  _proto.isAddedToCart = function isAddedToCart(item) {
    return CartService.hasItem(item);
  };

  _proto.onAddToCart = function onAddToCart(item) {
    var _this2 = this;

    if (this.isAddedToCart(item)) {
      CartService.setActive(true);
    } else {
      CartService.addItem$(item).pipe(operators.first()).subscribe(function (_) {
        _this2.pushChanges();
      });
    }
  };

  _proto.scrollTo = function scrollTo(id) {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector(id);

    if (target) {
      LocomotiveScrollService.scrollTo(target, {
        offset: -200
      });
    }
  };

  _proto.showMore = function showMore(event) {
    var pageSize = 12;

    if (this.visibleItems.length + pageSize >= this.items.length) {
      this.visibleItems = this.items.slice();
    } else {
      this.visibleItems = this.items.slice(0, Math.min(this.visibleItems.length + pageSize, this.items.length));
    }

    this.pushChanges();
    LocomotiveScrollService.update();
  };

  _proto.scrollTo = function scrollTo(selector, event) {
    if (event) {
      event.preventDefault();
    }

    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    var target = node.querySelector(selector);
    LocomotiveScrollService.scrollTo(target, {
      offset: -130
    });
  };

  _proto.configureProduct = function configureProduct(item) {
    window.location.href = environment.slug.configureProduct;
  };

  return ProductsDetailComponent;
}(rxcomp.Component);
ProductsDetailComponent.meta = {
  selector: '[products-detail]'
};// import { combineLatest } from 'rxjs';
var ProductsService = /*#__PURE__*/function () {
  function ProductsService() {}

  ProductsService.all$ = function all$() {
    return ApiService.get$('/products/all.json');
  };

  ProductsService.filters$ = function filters$() {
    return ApiService.get$('/products/filters.json');
  }
  /*
  static fake$() {
  	return combineLatest([ProductsService.all$(), ApiService.get$('/products/all_.json')]).pipe(
  		map(data => {
  			const items = data[0];
  			const items_ = data[1];
  			items.forEach((item, i) => {
  				const other = items_.find(x => x.title === item.title);
  				if (other) {
  					item.category = {
  						id: 1,
  						name: other.url.replace('https://www.giorgettimeda.com/it/prodotti/', '').split('/')[0],
  					};
  				}
  			});
  			console.log(JSON.stringify(items));
  			return items;
  		})
  	);
  }
  */
  ;

  return ProductsService;
}();var ProductsComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ProductsComponent, _Component);

  function ProductsComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProductsComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.categoryId = this.categoryId || null;
    this.items = [];
    this.filteredItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      category: new rxcompForm.FormControl(null),
      ambience: new rxcompForm.FormControl(null),
      material: new rxcompForm.FormControl(null),
      designer: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('ProductsComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('category', form.value.category);

      _this.setFilterByKeyAndValue('ambience', form.value.ambience);

      _this.setFilterByKeyAndValue('material', form.value.material);

      _this.setFilterByKeyAndValue('designer', form.value.designer);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.category.options = FormService.toSelectOptions(_this.filters.category.options);
      controls.ambience.options = FormService.toSelectOptions(_this.filters.ambience.options);
      controls.material.options = FormService.toSelectOptions(_this.filters.material.options);
      controls.designer.options = FormService.toSelectOptions(_this.filters.designer.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([ProductsService.all$(), ProductsService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'category':
                return item.category.id === value;

              case 'ambience':
                return item.ambience.id === value;

              case 'material':
                return item.materials.indexOf(value) !== -1;

              case 'designer':
                return item.designers.indexOf(value) !== -1;

              case 'search':
                return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var category = this.categoryId ? this.categoryId : this.filters.category.values.length ? this.filters.category.values[0] : null;
    var ambience = this.filters.ambience.values.length ? this.filters.ambience.values[0] : null;
    var material = this.filters.material.values.length ? this.filters.material.values[0] : null;
    var designer = this.filters.designer.values.length ? this.filters.designer.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      category: category,
      ambience: ambience,
      material: material,
      designer: designer,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('ProductsComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('ProductsComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('category', this.form.value.category);
    this.setFilterByKeyAndValue('ambience', this.form.value.ambience);
    this.setFilterByKeyAndValue('material', this.form.value.material);
    this.setFilterByKeyAndValue('designer', this.form.value.designer);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return ProductsComponent;
}(rxcomp.Component);
ProductsComponent.meta = {
  selector: '[products]',
  inputs: ['categoryId']
};var ProjectsRegistrationModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ProjectsRegistrationModalComponent, _Component);

  function ProjectsRegistrationModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProjectsRegistrationModalComponent.prototype;

  _proto.onInit = function onInit() {
    _Component.prototype.onInit.call(this);

    var _getContext = rxcomp.getContext(this),
        parentInstance = _getContext.parentInstance;

    if (parentInstance instanceof ModalOutletComponent) {
      var data = parentInstance.modal.data;
    }

    LocomotiveScrollService.stop();
  };

  _proto.onClose = function onClose() {
    ModalService.reject();
  };

  _proto.onDestroy = function onDestroy() {
    LocomotiveScrollService.start();
  };

  return ProjectsRegistrationModalComponent;
}(rxcomp.Component);
ProjectsRegistrationModalComponent.meta = {
  selector: '[projects-registration-modal]'
};var ProjectsRegistrationService = /*#__PURE__*/function () {
  function ProjectsRegistrationService() {}

  ProjectsRegistrationService.data$ = function data$() {
    return ApiService.get$('/projects-registration/data.json');
  };

  ProjectsRegistrationService.submit$ = function submit$() {
    return ApiService.get$('/projects-registration/submit.json');
  };

  return ProjectsRegistrationService;
}();var ProjectsRegistrationComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ProjectsRegistrationComponent, _Component);

  function ProjectsRegistrationComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProjectsRegistrationComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    this.success = false;
    var form = this.form = new rxcompForm.FormGroup({
      dealer: new rxcompForm.FormGroup({
        fullName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
        country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
        city: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
      }),
      client: new rxcompForm.FormGroup({
        fullName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
        country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
        city: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
      }),
      architect: new rxcompForm.FormGroup({
        fullName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
        country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
        city: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
        email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
        telephone: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
      }),
      type: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      destination: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      products: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      picture: new rxcompForm.FormControl(null),
      privacy: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      checkRequest: window.antiforgery,
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();

      LocomotiveScrollService.update();
    });
    this.load$().pipe(operators.first(), operators.takeUntil(this.unsubscribe$)).subscribe();
  };

  _proto.load$ = function load$() {
    var _this2 = this;

    return ProjectsRegistrationService.data$().pipe(operators.tap(function (data) {
      var controls = _this2.controls;
      controls.dealer.controls.country.options = FormService.toSelectOptions(data.country.options);
      controls.client.controls.country.options = FormService.toSelectOptions(data.country.options);
      controls.architect.controls.country.options = FormService.toSelectOptions(data.country.options);

      _this2.pushChanges();
    }));
  };

  _proto.test = function test() {
    var form = this.form;
    var controls = this.controls;
    var country = controls.dealer.controls.country.options.length > 1 ? controls.dealer.controls.country.options[1].id : null;
    form.patch({
      dealer: {
        fullName: 'Agente Jhon Appleseed',
        country: country,
        city: 'Pesaro'
      },
      client: {
        fullName: 'Cliente Jhon Appleseed',
        country: country,
        city: 'Pesaro'
      },
      architect: {
        fullName: 'Architetto Jhon Appleseed',
        country: country,
        city: 'Pesaro',
        email: 'jhonappleseed@gmail.com',
        telephone: '0721411112'
      },
      type: 'Hotel',
      destination: 'Hospitality',
      products: 'Adam, Clop',
      privacy: true
    });
  };

  _proto.reset = function reset() {
    var form = this.form;
    form.reset();
  };

  _proto.onSubmit = function onSubmit() {
    var _this3 = this;

    var form = this.form;
    console.log('ProjectsRegistrationComponent.onSubmit', form.value);

    if (form.valid) {
      form.submitted = true;
      ProjectsRegistrationService.submit$(form.value).pipe(operators.first()).subscribe(function (response) {
        console.log('ProjectsRegistrationComponent.onSubmit', response);
        _this3.success = true;
        GtmService.push({
          'event': "Project Registration",
          'form_name': "Registrazione Progetto"
        });

        if (!_this3.isModal) {
          form.reset();
        } else {
          _this3.pushChanges();
        }
      }, function (error) {
        console.log('ProjectsRegistrationComponent.error', error);
        _this3.error = error;
        form.submitted = false;

        _this3.pushChanges();

        LocomotiveScrollService.update();
      });
    } else {
      form.touched = true;
    }
  };

  _proto.onClose = function onClose() {
    this.close.next(this.form.value);
  };

  return ProjectsRegistrationComponent;
}(rxcomp.Component);
ProjectsRegistrationComponent.meta = {
  selector: '[projects-registration]',
  outputs: ['close'],
  inputs: ['isModal']
};var ProjectsService = /*#__PURE__*/function () {
  function ProjectsService() {}

  ProjectsService.all$ = function all$() {
    return ApiService.get$('/projects/all.json');
  };

  ProjectsService.filters$ = function filters$() {
    return ApiService.get$('/projects/filters.json');
  };

  return ProjectsService;
}();var ProjectsComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ProjectsComponent, _Component);

  function ProjectsComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProjectsComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.items = [];
    this.filteredItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      category: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('ProjectsComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('category', form.value.category);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.category.options = FormService.toSelectOptions(_this.filters.category.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([ProjectsService.all$(), ProjectsService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'category':
                return item.category.id === value;

              case 'search':
                return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.country.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var category = this.filters.category.values.length ? this.filters.category.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      category: category,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('ProjectsComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('ProjectsComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('category', this.form.value.category);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return ProjectsComponent;
}(rxcomp.Component);
ProjectsComponent.meta = {
  selector: '[projects]'
};var FilesService = /*#__PURE__*/function () {
  function FilesService() {}

  FilesService.hasFile = function hasFile(file) {
    var files = this.currentFiles;
    var index = files.reduce(function (p, c, i) {
      return p !== -1 ? p : c.id === file.id ? i : p;
    }, -1);
    return index !== -1;
  };

  FilesService.setFiles = function setFiles(files) {
    if (files) {
      LocalStorageService.set('files', files);
    } else {
      LocalStorageService.delete('files');
    }

    this.files$_.next(files);
  };

  FilesService.files$ = function files$() {
    var _this = this;

    var localFiles = LocalStorageService.get('files') || [];
    return rxjs.of(localFiles).pipe(operators.switchMap(function (files) {
      _this.setFiles(files);

      return _this.files$_;
    }));
  };

  FilesService.addFile$ = function addFile$(file) {
    var _this2 = this;

    return rxjs.of(file).pipe(operators.map(function (file) {
      var files = _this2.currentFiles.slice();

      var index = files.reduce(function (p, c, i) {
        return p !== -1 ? p : c.id === file.id ? i : p;
      }, -1);

      if (index === -1) {
        files.push(file);

        _this2.setFiles(files);

        return file;
      } else {
        return null;
      }
    }));
  };

  FilesService.removeFile$ = function removeFile$(file) {
    var _this3 = this;

    return rxjs.of(file).pipe(operators.map(function (file) {
      var files = _this3.currentFiles.slice();

      var index = files.reduce(function (p, c, i) {
        return p !== -1 ? p : c.id === file.id ? i : p;
      }, -1);

      if (index !== -1) {
        files.splice(index, 1);

        _this3.setFiles(files);

        return file;
      } else {
        return null;
      }
    }));
  };

  FilesService.removeAll$ = function removeAll$() {
    var _this4 = this;

    return rxjs.of([]).pipe(operators.map(function (files) {
      _this4.setFiles(files);

      return files;
    }));
  };

  _createClass(FilesService, null, [{
    key: "currentFiles",
    get: function get() {
      return this.files$_.getValue();
    }
  }]);

  return FilesService;
}();

_defineProperty(FilesService, "files$_", new rxjs.BehaviorSubject([]));var ReservedAreaService = /*#__PURE__*/function () {
  function ReservedAreaService() {}

  ReservedAreaService.all$ = function all$() {
    return ApiService.get$('/reserved-area/all.json').pipe(operators.map(function (items) {
      items.forEach(function (x) {
        x.title = ReservedAreaService.toTitleCase(x.title.replace(/_/g, ' '));
      });
      return items;
    }));
  };

  ReservedAreaService.all_$ = function all_$() {
    return rxjs.combineLatest([ReservedAreaService.get$(), FilesService.files$()]).pipe(operators.map(function (data) {
      var items = data[0];
      var files = data[1];
      items.forEach(function (item) {
        if (files.find(function (x) {
          return x.id === item.id;
        })) {
          item.added = true;
        } else {
          item.added = false;
        }
      });
      return items;
    }));
  };

  ReservedAreaService.toTitleCase = function toTitleCase(sentence, seps) {
    if (seps === void 0) {
      seps = ' _-/';
    }

    var capitalize = function capitalize(str) {
      return str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
    };

    var escape = function escape(str) {
      return str.replace(/./g, function (c) {
        return "\\" + c;
      });
    };

    var wordPattern = new RegExp("[^" + escape(seps) + "]+", 'g');
    return sentence.replace(wordPattern, capitalize);
  };

  return ReservedAreaService;
}();var ReservedAreaComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ReservedAreaComponent, _Component);

  function ReservedAreaComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ReservedAreaComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.user = undefined;
    this.items = [];
    this.tree = [];
    this.files = [];
    this.visibleFiles = [];
    this.item = null;
    this.load$().pipe(operators.first()).subscribe();
    UserService.me$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (user) {
      console.log('ReservedAreaComponent.user', user);
      _this.user = user;

      _this.pushChanges();

      LocomotiveScrollService.update();
    });
  };

  _proto.load$ = function load$() {
    var _this2 = this;

    return ReservedAreaService.all$().pipe(operators.tap(function (items) {
      _this2.items = items;
      _this2.tree = _this2.getTree(items);

      _this2.pushChanges();
    }));
  };

  _proto.getTree = function getTree(items, parentId) {
    var _this3 = this;

    var tree = items.filter(function (x) {
      return x.parentId === parentId && x.type === 'folder';
    }).map(function (x) {
      var item = Object.assign({}, x);
      item.items = _this3.getTree(items, x.id);
      return item;
    });
    return tree;
  };

  _proto.onOpen = function onOpen(item) {
    if (item.active) {
      this.item = item;
      this.files = this.items.filter(function (x) {
        return x.type === 'file' && x.parentId === item.id;
      });
      this.visibleFiles = this.files.slice(0, Math.min(8, this.files.length));
      this.pushChanges();
      LocomotiveScrollService.update();
    }
  };

  _proto.showMore = function showMore(event) {
    this.visibleFiles = this.files.slice();
    this.pushChanges();
    LocomotiveScrollService.update();
  };

  _proto.onProjectRegistration = function onProjectRegistration(event) {
    ModalService.open$({
      src: environment.template.modal.projectsRegistrationModal
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      console.log('ReservedAreaComponent.onProjectRegistration', event);
    });
  };

  _proto.onToggleFile = function onToggleFile(file) {
    var _this4 = this;

    (this.isAddedToFiles(file) ? FilesService.removeFile$(file) : FilesService.addFile$(file)).pipe(operators.first()).subscribe(function (_) {
      _this4.pushChanges();
    });
  };

  _proto.isAddedToFiles = function isAddedToFiles(file) {
    return FilesService.hasFile(file);
  };

  _proto.scrollTo = function scrollTo(selector, event) {
    if (event) {
      event.preventDefault();
    }

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector(selector);
    LocomotiveScrollService.scrollTo(target, {
      offset: -130
    });
  };

  return ReservedAreaComponent;
}(rxcomp.Component);
ReservedAreaComponent.meta = {
  selector: '[reserved-area]'
};var StoreLocatorService = /*#__PURE__*/function () {
  function StoreLocatorService() {}

  StoreLocatorService.all$ = function all$() {
    return ApiService.get$('/store-locator/all.json').pipe(operators.map(function (items) {
      return items.sort(function (a, b) {
        return a.rank - b.rank;
      });
    }));
  };

  StoreLocatorService.filters$ = function filters$() {
    return ApiService.get$('/store-locator/filters.json');
  };

  return StoreLocatorService;
}();var StoreLocatorComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(StoreLocatorComponent, _Component);

  function StoreLocatorComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = StoreLocatorComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.items = [];
    this.filteredItems = [];
    this.visibleItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      country: new rxcompForm.FormControl(null),
      category: new rxcompForm.FormControl(null),
      search: new rxcompForm.FormControl(null)
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      // console.log('StoreLocatorComponent.changes$', form.value);
      _this.setFilterByKeyAndValue('country', form.value.country);

      _this.setFilterByKeyAndValue('category', form.value.category);

      _this.setFilterByKeyAndValue('search', form.value.search);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];
      controls.country.options = FormService.toSelectOptions(_this.filters.country.options);
      controls.category.options = FormService.toSelectOptions(_this.filters.category.options);

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([StoreLocatorService.all$(), StoreLocatorService.filters$()]);
  };

  _proto.onLoad = function onLoad() {
    var _this2 = this;

    var items = this.items;
    var filters = this.filters;
    Object.keys(filters).forEach(function (key) {
      filters[key].mode = filters[key].mode || FilterMode.OR;
    });
    var initialParams = {};
    var filterService = new FilterService(filters, initialParams, function (key, filter) {
      switch (key) {
        default:
          filter.filter = function (item, value) {
            switch (key) {
              case 'country':
                return item.country && item.country.id === value;

              case 'category':
                return item.category && item.category.id === value;

              case 'search':
                return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || // item.address.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                item.city.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.country.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            }
          };

      }
    });
    this.filterService = filterService;
    this.filters = filterService.filters;
    var country = this.filters.country.values.length ? this.filters.country.values[0] : null;
    var category = this.filters.category.values.length ? this.filters.category.values[0] : null;
    var search = this.filters.search.values.length ? this.filters.search.values[0] : null;
    this.form.patch({
      country: country,
      category: category,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;
      _this2.visibleItems = filteredItems.slice(0, Math.min(12, filteredItems.length));

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('StoreLocatorComponent.filteredItems', filteredItems.length);
    });
  };

  _proto.showMore = function showMore(event) {
    this.visibleItems = this.filteredItems.slice();
    this.pushChanges();
    LocomotiveScrollService.update();
  };

  _proto.setFilterByKeyAndValue = function setFilterByKeyAndValue(key, value) {
    var filter = this.filters[key];

    if (filter) {
      if (filter.mode === FilterMode.QUERY) {
        filter.set(value);
      } else {
        var option = filter.options.find(function (x) {
          return x.value === value;
        }); // console.log(filter.options, option);

        if (option) {
          filter.set(option);
        } else {
          filter.clear();
        }
      }
    }
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('StoreLocatorComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('country', this.form.value.country);
    this.setFilterByKeyAndValue('category', this.form.value.category);
    this.setFilterByKeyAndValue('search', this.form.value.search);
    this.pushChanges();
  };

  _proto.clearFilter = function clearFilter(event, filter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    filter.clear();
    this.pushChanges();
  };

  return StoreLocatorComponent;
}(rxcomp.Component);
StoreLocatorComponent.meta = {
  selector: '[store-locator]'
};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Extends an object's prototype by another's.
 *
 * @param type1 The Type to be extended.
 * @param type2 The Type to extend with.
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend(type1, type2) {
    // eslint-disable-next-line prefer-const
    for (var property in type2.prototype) {
        type1.prototype[property] = type2.prototype[property];
    }
}
/**
 * @ignore
 */
var OverlayViewSafe = /** @class */ (function () {
    function OverlayViewSafe() {
        // MarkerClusterer implements google.maps.OverlayView interface. We use the
        // extend function to extend MarkerClusterer with google.maps.OverlayView
        // because it might not always be available when the code is defined so we
        // look for it at the last possible moment. If it doesn't exist now then
        // there is no point going ahead :)
        extend(OverlayViewSafe, google.maps.OverlayView);
    }
    return OverlayViewSafe;
}());

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *
 * @hidden
 */
function toCssText(styles) {
    return Object.keys(styles)
        .reduce(function (acc, key) {
        if (styles[key]) {
            acc.push(key + ":" + styles[key]);
        }
        return acc;
    }, [])
        .join(";");
}
/**
 *
 * @hidden
 */
function coercePixels(pixels) {
    return pixels ? pixels + "px" : undefined;
}
/**
 * A cluster icon.
 */
var ClusterIcon = /** @class */ (function (_super) {
    __extends(ClusterIcon, _super);
    /**
     * @param cluster_ The cluster with which the icon is to be associated.
     * @param styles_ An array of {@link ClusterIconStyle} defining the cluster icons
     *  to use for various cluster sizes.
     */
    function ClusterIcon(cluster_, styles_) {
        var _this = _super.call(this) || this;
        _this.cluster_ = cluster_;
        _this.styles_ = styles_;
        _this.center_ = null;
        _this.div_ = null;
        _this.sums_ = null;
        _this.visible_ = false;
        _this.style = null;
        _this.setMap(cluster_.getMap()); // Note: this causes onAdd to be called
        return _this;
    }
    /**
     * Adds the icon to the DOM.
     */
    ClusterIcon.prototype.onAdd = function () {
        var _this = this;
        var cMouseDownInCluster;
        var cDraggingMapByCluster;
        var mc = this.cluster_.getMarkerClusterer();
        var _a = google.maps.version.split("."), major = _a[0], minor = _a[1];
        var gmVersion = parseInt(major, 10) * 100 + parseInt(minor, 10);
        this.div_ = document.createElement("div");
        if (this.visible_) {
            this.show();
        }
        this.getPanes().overlayMouseTarget.appendChild(this.div_);
        // Fix for Issue 157
        this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function () {
            cDraggingMapByCluster = cMouseDownInCluster;
        });
        google.maps.event.addDomListener(this.div_, "mousedown", function () {
            cMouseDownInCluster = true;
            cDraggingMapByCluster = false;
        });
        // March 1, 2018: Fix for this 3.32 exp bug, https://issuetracker.google.com/issues/73571522
        // But it doesn't work with earlier releases so do a version check.
        if (gmVersion >= 332) {
            // Ugly version-dependent code
            google.maps.event.addDomListener(this.div_, "touchstart", function (e) {
                e.stopPropagation();
            });
        }
        google.maps.event.addDomListener(this.div_, "click", function (e) {
            cMouseDownInCluster = false;
            if (!cDraggingMapByCluster) {
                /**
                 * This event is fired when a cluster marker is clicked.
                 * @name MarkerClusterer#click
                 * @param {Cluster} c The cluster that was clicked.
                 * @event
                 */
                google.maps.event.trigger(mc, "click", _this.cluster_);
                google.maps.event.trigger(mc, "clusterclick", _this.cluster_); // deprecated name
                // The default click handler follows. Disable it by setting
                // the zoomOnClick property to false.
                if (mc.getZoomOnClick()) {
                    // Zoom into the cluster.
                    var mz_1 = mc.getMaxZoom();
                    var theBounds_1 = _this.cluster_.getBounds();
                    mc.getMap().fitBounds(theBounds_1);
                    // There is a fix for Issue 170 here:
                    setTimeout(function () {
                        mc.getMap().fitBounds(theBounds_1);
                        // Don't zoom beyond the max zoom level
                        if (mz_1 !== null && mc.getMap().getZoom() > mz_1) {
                            mc.getMap().setZoom(mz_1 + 1);
                        }
                    }, 100);
                }
                // Prevent event propagation to the map:
                e.cancelBubble = true;
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
            }
        });
        google.maps.event.addDomListener(this.div_, "mouseover", function () {
            /**
             * This event is fired when the mouse moves over a cluster marker.
             * @name MarkerClusterer#mouseover
             * @param {Cluster} c The cluster that the mouse moved over.
             * @event
             */
            google.maps.event.trigger(mc, "mouseover", _this.cluster_);
        });
        google.maps.event.addDomListener(this.div_, "mouseout", function () {
            /**
             * This event is fired when the mouse moves out of a cluster marker.
             * @name MarkerClusterer#mouseout
             * @param {Cluster} c The cluster that the mouse moved out of.
             * @event
             */
            google.maps.event.trigger(mc, "mouseout", _this.cluster_);
        });
    };
    /**
     * Removes the icon from the DOM.
     */
    ClusterIcon.prototype.onRemove = function () {
        if (this.div_ && this.div_.parentNode) {
            this.hide();
            google.maps.event.removeListener(this.boundsChangedListener_);
            google.maps.event.clearInstanceListeners(this.div_);
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        }
    };
    /**
     * Draws the icon.
     */
    ClusterIcon.prototype.draw = function () {
        if (this.visible_) {
            var pos = this.getPosFromLatLng_(this.center_);
            this.div_.style.top = pos.y + "px";
            this.div_.style.left = pos.x + "px";
        }
    };
    /**
     * Hides the icon.
     */
    ClusterIcon.prototype.hide = function () {
        if (this.div_) {
            this.div_.style.display = "none";
        }
        this.visible_ = false;
    };
    /**
     * Positions and shows the icon.
     */
    ClusterIcon.prototype.show = function () {
        if (this.div_) {
            this.div_.className = this.className_;
            this.div_.style.cssText = this.createCss_(this.getPosFromLatLng_(this.center_));
            this.div_.innerHTML =
                (this.style.url ? this.getImageElementHtml() : "") +
                    this.getLabelDivHtml();
            if (typeof this.sums_.title === "undefined" || this.sums_.title === "") {
                this.div_.title = this.cluster_.getMarkerClusterer().getTitle();
            }
            else {
                this.div_.title = this.sums_.title;
            }
            this.div_.style.display = "";
        }
        this.visible_ = true;
    };
    ClusterIcon.prototype.getLabelDivHtml = function () {
        var mc = this.cluster_.getMarkerClusterer();
        var ariaLabel = mc.ariaLabelFn(this.sums_.text);
        var divStyle = {
            position: "absolute",
            top: coercePixels(this.anchorText_[0]),
            left: coercePixels(this.anchorText_[1]),
            color: this.style.textColor,
            "font-size": coercePixels(this.style.textSize),
            "font-family": this.style.fontFamily,
            "font-weight": this.style.fontWeight,
            "font-style": this.style.fontStyle,
            "text-decoration": this.style.textDecoration,
            "text-align": "center",
            width: coercePixels(this.style.width),
            "line-height": coercePixels(this.style.textLineHeight),
        };
        return "\n<div aria-label=\"" + ariaLabel + "\" style=\"" + toCssText(divStyle) + "\" tabindex=\"0\">\n  <span aria-hidden=\"true\">" + this.sums_.text + "</span>\n</div>\n";
    };
    ClusterIcon.prototype.getImageElementHtml = function () {
        // NOTE: values must be specified in px units
        var bp = (this.style.backgroundPosition || "0 0").split(" ");
        var spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ""), 10);
        var spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ""), 10);
        var dimensions = {};
        if (this.cluster_.getMarkerClusterer().getEnableRetinaIcons()) {
            dimensions = {
                width: coercePixels(this.style.width),
                height: coercePixels(this.style.height),
            };
        }
        else {
            var _a = [
                -1 * spriteV,
                -1 * spriteH + this.style.width,
                -1 * spriteV + this.style.height,
                -1 * spriteH,
            ], Y1 = _a[0], X1 = _a[1], Y2 = _a[2], X2 = _a[3];
            dimensions = {
                clip: "rect(" + Y1 + "px, " + X1 + "px, " + Y2 + "px, " + X2 + "px)",
            };
        }
        var overrideDimensionsDynamicIcon = this.sums_.url
            ? { width: "100%", height: "100%" }
            : {};
        var cssText = toCssText(__assign(__assign({ position: "absolute", top: coercePixels(spriteV), left: coercePixels(spriteH) }, dimensions), overrideDimensionsDynamicIcon));
        return "<img alt=\"" + this.sums_.text + "\" aria-hidden=\"true\" src=\"" + this.style.url + "\" style=\"" + cssText + "\"/>";
    };
    /**
     * Sets the icon styles to the appropriate element in the styles array.
     *
     * @ignore
     * @param sums The icon label text and styles index.
     */
    ClusterIcon.prototype.useStyle = function (sums) {
        this.sums_ = sums;
        var index = Math.max(0, sums.index - 1);
        index = Math.min(this.styles_.length - 1, index);
        this.style = this.sums_.url
            ? __assign(__assign({}, this.styles_[index]), { url: this.sums_.url }) : this.styles_[index];
        this.anchorText_ = this.style.anchorText || [0, 0];
        this.anchorIcon_ = this.style.anchorIcon || [
            Math.floor(this.style.height / 2),
            Math.floor(this.style.width / 2),
        ];
        this.className_ =
            this.cluster_.getMarkerClusterer().getClusterClass() +
                " " +
                (this.style.className || "cluster-" + index);
    };
    /**
     * Sets the position at which to center the icon.
     *
     * @param center The latlng to set as the center.
     */
    ClusterIcon.prototype.setCenter = function (center) {
        this.center_ = center;
    };
    /**
     * Creates the `cssText` style parameter based on the position of the icon.
     *
     * @param pos The position of the icon.
     * @return The CSS style text.
     */
    ClusterIcon.prototype.createCss_ = function (pos) {
        return toCssText({
            "z-index": "" + this.cluster_.getMarkerClusterer().getZIndex(),
            top: coercePixels(pos.y),
            left: coercePixels(pos.x),
            width: coercePixels(this.style.width),
            height: coercePixels(this.style.height),
            cursor: "pointer",
            position: "absolute",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-o-user-select": "none",
            "user-select": "none",
        });
    };
    /**
     * Returns the position at which to place the DIV depending on the latlng.
     *
     * @param latlng The position in latlng.
     * @return The position in pixels.
     */
    ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
        var pos = this.getProjection().fromLatLngToDivPixel(latlng);
        pos.x = Math.floor(pos.x - this.anchorIcon_[1]);
        pos.y = Math.floor(pos.y - this.anchorIcon_[0]);
        return pos;
    };
    return ClusterIcon;
}(OverlayViewSafe));

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Creates a single cluster that manages a group of proximate markers.
 *  Used internally, do not call this constructor directly.
 */
var Cluster = /** @class */ (function () {
    /**
     *
     * @param markerClusterer_ The `MarkerClusterer` object with which this
     *  cluster is associated.
     */
    function Cluster(markerClusterer_) {
        this.markerClusterer_ = markerClusterer_;
        this.map_ = this.markerClusterer_.getMap();
        this.minClusterSize_ = this.markerClusterer_.getMinimumClusterSize();
        this.averageCenter_ = this.markerClusterer_.getAverageCenter();
        this.markers_ = []; // TODO: type;
        this.center_ = null;
        this.bounds_ = null;
        this.clusterIcon_ = new ClusterIcon(this, this.markerClusterer_.getStyles());
    }
    /**
     * Returns the number of markers managed by the cluster. You can call this from
     * a `click`, `mouseover`, or `mouseout` event handler for the `MarkerClusterer` object.
     *
     * @return The number of markers in the cluster.
     */
    Cluster.prototype.getSize = function () {
        return this.markers_.length;
    };
    /**
     * Returns the array of markers managed by the cluster. You can call this from
     * a `click`, `mouseover`, or `mouseout` event handler for the `MarkerClusterer` object.
     *
     * @return The array of markers in the cluster.
     */
    Cluster.prototype.getMarkers = function () {
        return this.markers_;
    };
    /**
     * Returns the center of the cluster. You can call this from
     * a `click`, `mouseover`, or `mouseout` event handler
     * for the `MarkerClusterer` object.
     *
     * @return The center of the cluster.
     */
    Cluster.prototype.getCenter = function () {
        return this.center_;
    };
    /**
     * Returns the map with which the cluster is associated.
     *
     * @return The map.
     * @ignore
     */
    Cluster.prototype.getMap = function () {
        return this.map_;
    };
    /**
     * Returns the `MarkerClusterer` object with which the cluster is associated.
     *
     * @return The associated marker clusterer.
     * @ignore
     */
    Cluster.prototype.getMarkerClusterer = function () {
        return this.markerClusterer_;
    };
    /**
     * Returns the bounds of the cluster.
     *
     * @return the cluster bounds.
     * @ignore
     */
    Cluster.prototype.getBounds = function () {
        var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
        var markers = this.getMarkers();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        return bounds;
    };
    /**
     * Removes the cluster from the map.
     *
     * @ignore
     */
    Cluster.prototype.remove = function () {
        this.clusterIcon_.setMap(null);
        this.markers_ = [];
        delete this.markers_;
    };
    /**
     * Adds a marker to the cluster.
     *
     * @param marker The marker to be added.
     * @return True if the marker was added.
     * @ignore
     */
    Cluster.prototype.addMarker = function (marker) {
        if (this.isMarkerAlreadyAdded_(marker)) {
            return false;
        }
        if (!this.center_) {
            this.center_ = marker.getPosition();
            this.calculateBounds_();
        }
        else {
            if (this.averageCenter_) {
                var l = this.markers_.length + 1;
                var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
                var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
                this.center_ = new google.maps.LatLng(lat, lng);
                this.calculateBounds_();
            }
        }
        marker.isAdded = true;
        this.markers_.push(marker);
        var mCount = this.markers_.length;
        var mz = this.markerClusterer_.getMaxZoom();
        if (mz !== null && this.map_.getZoom() > mz) {
            // Zoomed in past max zoom, so show the marker.
            if (marker.getMap() !== this.map_) {
                marker.setMap(this.map_);
            }
        }
        else if (mCount < this.minClusterSize_) {
            // Min cluster size not reached so show the marker.
            if (marker.getMap() !== this.map_) {
                marker.setMap(this.map_);
            }
        }
        else if (mCount === this.minClusterSize_) {
            // Hide the markers that were showing.
            for (var i = 0; i < mCount; i++) {
                this.markers_[i].setMap(null);
            }
        }
        else {
            marker.setMap(null);
        }
        return true;
    };
    /**
     * Determines if a marker lies within the cluster's bounds.
     *
     * @param marker The marker to check.
     * @return True if the marker lies in the bounds.
     * @ignore
     */
    Cluster.prototype.isMarkerInClusterBounds = function (marker) {
        return this.bounds_.contains(marker.getPosition());
    };
    /**
     * Calculates the extended bounds of the cluster with the grid.
     */
    Cluster.prototype.calculateBounds_ = function () {
        var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
        this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
    };
    /**
     * Updates the cluster icon.
     */
    Cluster.prototype.updateIcon = function () {
        var mCount = this.markers_.length;
        var mz = this.markerClusterer_.getMaxZoom();
        if (mz !== null && this.map_.getZoom() > mz) {
            this.clusterIcon_.hide();
            return;
        }
        if (mCount < this.minClusterSize_) {
            // Min cluster size not yet reached.
            this.clusterIcon_.hide();
            return;
        }
        var numStyles = this.markerClusterer_.getStyles().length;
        var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
        this.clusterIcon_.setCenter(this.center_);
        this.clusterIcon_.useStyle(sums);
        this.clusterIcon_.show();
    };
    /**
     * Determines if a marker has already been added to the cluster.
     *
     * @param marker The marker to check.
     * @return True if the marker has already been added.
     */
    Cluster.prototype.isMarkerAlreadyAdded_ = function (marker) {
        if (this.markers_.indexOf) {
            return this.markers_.indexOf(marker) !== -1;
        }
        else {
            for (var i = 0; i < this.markers_.length; i++) {
                if (marker === this.markers_[i]) {
                    return true;
                }
            }
        }
        return false;
    };
    return Cluster;
}());

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @ignore
 */
var getOption = function (options, prop, def) {
    if (options[prop] !== undefined) {
        return options[prop];
    }
    else {
        return def;
    }
};
var MarkerClusterer = /** @class */ (function (_super) {
    __extends(MarkerClusterer, _super);
    /**
     * Creates a MarkerClusterer object with the options specified in {@link MarkerClustererOptions}.
     * @param map The Google map to attach to.
     * @param markers The markers to be added to the cluster.
     * @param options The optional parameters.
     */
    function MarkerClusterer(map, markers, options) {
        if (markers === void 0) { markers = []; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.markers_ = [];
        _this.clusters_ = [];
        _this.listeners_ = [];
        _this.activeMap_ = null;
        _this.ready_ = false;
        _this.ariaLabelFn = _this.options.ariaLabelFn || (function () { return ""; });
        _this.zIndex_ = _this.options.zIndex || Number(google.maps.Marker.MAX_ZINDEX) + 1;
        _this.gridSize_ = _this.options.gridSize || 60;
        _this.minClusterSize_ = _this.options.minimumClusterSize || 2;
        _this.maxZoom_ = _this.options.maxZoom || null;
        _this.styles_ = _this.options.styles || [];
        _this.title_ = _this.options.title || "";
        _this.zoomOnClick_ = getOption(_this.options, "zoomOnClick", true);
        _this.averageCenter_ = getOption(_this.options, "averageCenter", false);
        _this.ignoreHidden_ = getOption(_this.options, "ignoreHidden", false);
        _this.enableRetinaIcons_ = getOption(_this.options, "enableRetinaIcons", false);
        _this.imagePath_ = _this.options.imagePath || MarkerClusterer.IMAGE_PATH;
        _this.imageExtension_ = _this.options.imageExtension || MarkerClusterer.IMAGE_EXTENSION;
        _this.imageSizes_ = _this.options.imageSizes || MarkerClusterer.IMAGE_SIZES;
        _this.calculator_ = _this.options.calculator || MarkerClusterer.CALCULATOR;
        _this.batchSize_ = _this.options.batchSize || MarkerClusterer.BATCH_SIZE;
        _this.batchSizeIE_ = _this.options.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE;
        _this.clusterClass_ = _this.options.clusterClass || "cluster";
        if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
            // Try to avoid IE timeout when processing a huge number of markers:
            _this.batchSize_ = _this.batchSizeIE_;
        }
        _this.setupStyles_();
        _this.addMarkers(markers, true);
        _this.setMap(map); // Note: this causes onAdd to be called
        return _this;
    }
    /**
     * Implementation of the onAdd interface method.
     * @ignore
     */
    MarkerClusterer.prototype.onAdd = function () {
        var _this = this;
        this.activeMap_ = this.getMap();
        this.ready_ = true;
        this.repaint();
        this.prevZoom_ = this.getMap().getZoom();
        // Add the map event listeners
        this.listeners_ = [
            google.maps.event.addListener(this.getMap(), "zoom_changed", function () {
                var map = _this.getMap(); // eslint-disable-line @typescript-eslint/no-explicit-any
                // Fix for bug #407
                // Determines map type and prevents illegal zoom levels
                var minZoom = map.minZoom || 0;
                var maxZoom = Math.min(map.maxZoom || 100, map.mapTypes[map.getMapTypeId()].maxZoom);
                var zoom = Math.min(Math.max(_this.getMap().getZoom(), minZoom), maxZoom);
                if (_this.prevZoom_ != zoom) {
                    _this.prevZoom_ = zoom;
                    _this.resetViewport_(false);
                }
            }),
            google.maps.event.addListener(this.getMap(), "idle", function () {
                _this.redraw_();
            }),
        ];
    };
    /**
     * Implementation of the onRemove interface method.
     * Removes map event listeners and all cluster icons from the DOM.
     * All managed markers are also put back on the map.
     * @ignore
     */
    MarkerClusterer.prototype.onRemove = function () {
        // Put all the managed markers back on the map:
        for (var i = 0; i < this.markers_.length; i++) {
            if (this.markers_[i].getMap() !== this.activeMap_) {
                this.markers_[i].setMap(this.activeMap_);
            }
        }
        // Remove all clusters:
        for (var i = 0; i < this.clusters_.length; i++) {
            this.clusters_[i].remove();
        }
        this.clusters_ = [];
        // Remove map event listeners:
        for (var i = 0; i < this.listeners_.length; i++) {
            google.maps.event.removeListener(this.listeners_[i]);
        }
        this.listeners_ = [];
        this.activeMap_ = null;
        this.ready_ = false;
    };
    /**
     * Implementation of the draw interface method.
     * @ignore
     */
    MarkerClusterer.prototype.draw = function () { };
    /**
     * Sets up the styles object.
     */
    MarkerClusterer.prototype.setupStyles_ = function () {
        if (this.styles_.length > 0) {
            return;
        }
        for (var i = 0; i < this.imageSizes_.length; i++) {
            var size = this.imageSizes_[i];
            this.styles_.push(MarkerClusterer.withDefaultStyle({
                url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
                height: size,
                width: size,
            }));
        }
    };
    /**
     *  Fits the map to the bounds of the markers managed by the clusterer.
     */
    MarkerClusterer.prototype.fitMapToMarkers = function (padding) {
        var markers = this.getMarkers();
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            // March 3, 2018: Bug fix -- honor the ignoreHidden property
            if (markers[i].getVisible() || !this.getIgnoreHidden()) {
                bounds.extend(markers[i].getPosition());
            }
        }
        this.getMap().fitBounds(bounds, padding);
    };
    /**
     * Returns the value of the `gridSize` property.
     *
     * @return The grid size.
     */
    MarkerClusterer.prototype.getGridSize = function () {
        return this.gridSize_;
    };
    /**
     * Sets the value of the `gridSize` property.
     *
     * @param gridSize The grid size.
     */
    MarkerClusterer.prototype.setGridSize = function (gridSize) {
        this.gridSize_ = gridSize;
    };
    /**
     * Returns the value of the `minimumClusterSize` property.
     *
     * @return The minimum cluster size.
     */
    MarkerClusterer.prototype.getMinimumClusterSize = function () {
        return this.minClusterSize_;
    };
    /**
     * Sets the value of the `minimumClusterSize` property.
     *
     * @param minimumClusterSize The minimum cluster size.
     */
    MarkerClusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
        this.minClusterSize_ = minimumClusterSize;
    };
    /**
     *  Returns the value of the `maxZoom` property.
     *
     *  @return The maximum zoom level.
     */
    MarkerClusterer.prototype.getMaxZoom = function () {
        return this.maxZoom_;
    };
    /**
     *  Sets the value of the `maxZoom` property.
     *
     *  @param maxZoom The maximum zoom level.
     */
    MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
        this.maxZoom_ = maxZoom;
    };
    MarkerClusterer.prototype.getZIndex = function () {
        return this.zIndex_;
    };
    MarkerClusterer.prototype.setZIndex = function (zIndex) {
        this.zIndex_ = zIndex;
    };
    /**
     *  Returns the value of the `styles` property.
     *
     *  @return The array of styles defining the cluster markers to be used.
     */
    MarkerClusterer.prototype.getStyles = function () {
        return this.styles_;
    };
    /**
     *  Sets the value of the `styles` property.
     *
     *  @param styles The array of styles to use.
     */
    MarkerClusterer.prototype.setStyles = function (styles) {
        this.styles_ = styles;
    };
    /**
     * Returns the value of the `title` property.
     *
     * @return The content of the title text.
     */
    MarkerClusterer.prototype.getTitle = function () {
        return this.title_;
    };
    /**
     *  Sets the value of the `title` property.
     *
     *  @param title The value of the title property.
     */
    MarkerClusterer.prototype.setTitle = function (title) {
        this.title_ = title;
    };
    /**
     * Returns the value of the `zoomOnClick` property.
     *
     * @return True if zoomOnClick property is set.
     */
    MarkerClusterer.prototype.getZoomOnClick = function () {
        return this.zoomOnClick_;
    };
    /**
     *  Sets the value of the `zoomOnClick` property.
     *
     *  @param zoomOnClick The value of the zoomOnClick property.
     */
    MarkerClusterer.prototype.setZoomOnClick = function (zoomOnClick) {
        this.zoomOnClick_ = zoomOnClick;
    };
    /**
     * Returns the value of the `averageCenter` property.
     *
     * @return True if averageCenter property is set.
     */
    MarkerClusterer.prototype.getAverageCenter = function () {
        return this.averageCenter_;
    };
    /**
     *  Sets the value of the `averageCenter` property.
     *
     *  @param averageCenter The value of the averageCenter property.
     */
    MarkerClusterer.prototype.setAverageCenter = function (averageCenter) {
        this.averageCenter_ = averageCenter;
    };
    /**
     * Returns the value of the `ignoreHidden` property.
     *
     * @return True if ignoreHidden property is set.
     */
    MarkerClusterer.prototype.getIgnoreHidden = function () {
        return this.ignoreHidden_;
    };
    /**
     *  Sets the value of the `ignoreHidden` property.
     *
     *  @param ignoreHidden The value of the ignoreHidden property.
     */
    MarkerClusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
        this.ignoreHidden_ = ignoreHidden;
    };
    /**
     * Returns the value of the `enableRetinaIcons` property.
     *
     * @return True if enableRetinaIcons property is set.
     */
    MarkerClusterer.prototype.getEnableRetinaIcons = function () {
        return this.enableRetinaIcons_;
    };
    /**
     *  Sets the value of the `enableRetinaIcons` property.
     *
     *  @param enableRetinaIcons The value of the enableRetinaIcons property.
     */
    MarkerClusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
        this.enableRetinaIcons_ = enableRetinaIcons;
    };
    /**
     * Returns the value of the `imageExtension` property.
     *
     * @return The value of the imageExtension property.
     */
    MarkerClusterer.prototype.getImageExtension = function () {
        return this.imageExtension_;
    };
    /**
     *  Sets the value of the `imageExtension` property.
     *
     *  @param imageExtension The value of the imageExtension property.
     */
    MarkerClusterer.prototype.setImageExtension = function (imageExtension) {
        this.imageExtension_ = imageExtension;
    };
    /**
     * Returns the value of the `imagePath` property.
     *
     * @return The value of the imagePath property.
     */
    MarkerClusterer.prototype.getImagePath = function () {
        return this.imagePath_;
    };
    /**
     *  Sets the value of the `imagePath` property.
     *
     *  @param imagePath The value of the imagePath property.
     */
    MarkerClusterer.prototype.setImagePath = function (imagePath) {
        this.imagePath_ = imagePath;
    };
    /**
     * Returns the value of the `imageSizes` property.
     *
     * @return The value of the imageSizes property.
     */
    MarkerClusterer.prototype.getImageSizes = function () {
        return this.imageSizes_;
    };
    /**
     *  Sets the value of the `imageSizes` property.
     *
     *  @param imageSizes The value of the imageSizes property.
     */
    MarkerClusterer.prototype.setImageSizes = function (imageSizes) {
        this.imageSizes_ = imageSizes;
    };
    /**
     * Returns the value of the `calculator` property.
     *
     * @return the value of the calculator property.
     */
    MarkerClusterer.prototype.getCalculator = function () {
        return this.calculator_;
    };
    /**
     * Sets the value of the `calculator` property.
     *
     * @param calculator The value of the calculator property.
     */
    MarkerClusterer.prototype.setCalculator = function (calculator) {
        this.calculator_ = calculator;
    };
    /**
     * Returns the value of the `batchSizeIE` property.
     *
     * @return the value of the batchSizeIE property.
     */
    MarkerClusterer.prototype.getBatchSizeIE = function () {
        return this.batchSizeIE_;
    };
    /**
     * Sets the value of the `batchSizeIE` property.
     *
     *  @param batchSizeIE The value of the batchSizeIE property.
     */
    MarkerClusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
        this.batchSizeIE_ = batchSizeIE;
    };
    /**
     * Returns the value of the `clusterClass` property.
     *
     * @return the value of the clusterClass property.
     */
    MarkerClusterer.prototype.getClusterClass = function () {
        return this.clusterClass_;
    };
    /**
     * Sets the value of the `clusterClass` property.
     *
     *  @param clusterClass The value of the clusterClass property.
     */
    MarkerClusterer.prototype.setClusterClass = function (clusterClass) {
        this.clusterClass_ = clusterClass;
    };
    /**
     *  Returns the array of markers managed by the clusterer.
     *
     *  @return The array of markers managed by the clusterer.
     */
    MarkerClusterer.prototype.getMarkers = function () {
        return this.markers_;
    };
    /**
     *  Returns the number of markers managed by the clusterer.
     *
     *  @return The number of markers.
     */
    MarkerClusterer.prototype.getTotalMarkers = function () {
        return this.markers_.length;
    };
    /**
     * Returns the current array of clusters formed by the clusterer.
     *
     * @return The array of clusters formed by the clusterer.
     */
    MarkerClusterer.prototype.getClusters = function () {
        return this.clusters_;
    };
    /**
     * Returns the number of clusters formed by the clusterer.
     *
     * @return The number of clusters formed by the clusterer.
     */
    MarkerClusterer.prototype.getTotalClusters = function () {
        return this.clusters_.length;
    };
    /**
     * Adds a marker to the clusterer. The clusters are redrawn unless
     *  `nodraw` is set to `true`.
     *
     * @param marker The marker to add.
     * @param nodraw Set to `true` to prevent redrawing.
     */
    MarkerClusterer.prototype.addMarker = function (marker, nodraw) {
        this.pushMarkerTo_(marker);
        if (!nodraw) {
            this.redraw_();
        }
    };
    /**
     * Adds an array of markers to the clusterer. The clusters are redrawn unless
     *  `nodraw` is set to `true`.
     *
     * @param markers The markers to add.
     * @param nodraw Set to `true` to prevent redrawing.
     */
    MarkerClusterer.prototype.addMarkers = function (markers, nodraw) {
        for (var key in markers) {
            if (Object.prototype.hasOwnProperty.call(markers, key)) {
                this.pushMarkerTo_(markers[key]);
            }
        }
        if (!nodraw) {
            this.redraw_();
        }
    };
    /**
     * Pushes a marker to the clusterer.
     *
     * @param marker The marker to add.
     */
    MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
        var _this = this;
        // If the marker is draggable add a listener so we can update the clusters on the dragend:
        if (marker.getDraggable()) {
            google.maps.event.addListener(marker, "dragend", function () {
                if (_this.ready_) {
                    marker.isAdded = false;
                    _this.repaint();
                }
            });
        }
        marker.isAdded = false;
        this.markers_.push(marker);
    };
    /**
     * Removes a marker from the cluster.  The clusters are redrawn unless
     *  `nodraw` is set to `true`. Returns `true` if the
     *  marker was removed from the clusterer.
     *
     * @param marker The marker to remove.
     * @param nodraw Set to `true` to prevent redrawing.
     * @return True if the marker was removed from the clusterer.
     */
    MarkerClusterer.prototype.removeMarker = function (marker, nodraw) {
        var removed = this.removeMarker_(marker);
        if (!nodraw && removed) {
            this.repaint();
        }
        return removed;
    };
    /**
     * Removes an array of markers from the cluster. The clusters are redrawn unless
     *  `nodraw` is set to `true`. Returns `true` if markers were removed from the clusterer.
     *
     * @param markers The markers to remove.
     * @param nodraw Set to `true` to prevent redrawing.
     * @return True if markers were removed from the clusterer.
     */
    MarkerClusterer.prototype.removeMarkers = function (markers, nodraw) {
        var removed = false;
        for (var i = 0; i < markers.length; i++) {
            var r = this.removeMarker_(markers[i]);
            removed = removed || r;
        }
        if (!nodraw && removed) {
            this.repaint();
        }
        return removed;
    };
    /**
     * Removes a marker and returns true if removed, false if not.
     *
     * @param marker The marker to remove
     * @return Whether the marker was removed or not
     */
    MarkerClusterer.prototype.removeMarker_ = function (marker) {
        var index = -1;
        if (this.markers_.indexOf) {
            index = this.markers_.indexOf(marker);
        }
        else {
            for (var i = 0; i < this.markers_.length; i++) {
                if (marker === this.markers_[i]) {
                    index = i;
                    break;
                }
            }
        }
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        marker.setMap(null);
        this.markers_.splice(index, 1); // Remove the marker from the list of managed markers
        return true;
    };
    /**
     * Removes all clusters and markers from the map and also removes all markers
     *  managed by the clusterer.
     */
    MarkerClusterer.prototype.clearMarkers = function () {
        this.resetViewport_(true);
        this.markers_ = [];
    };
    /**
     * Recalculates and redraws all the marker clusters from scratch.
     *  Call this after changing any properties.
     */
    MarkerClusterer.prototype.repaint = function () {
        var oldClusters = this.clusters_.slice();
        this.clusters_ = [];
        this.resetViewport_(false);
        this.redraw_();
        // Remove the old clusters.
        // Do it in a timeout to prevent blinking effect.
        setTimeout(function () {
            for (var i = 0; i < oldClusters.length; i++) {
                oldClusters[i].remove();
            }
        }, 0);
    };
    /**
     * Returns the current bounds extended by the grid size.
     *
     * @param bounds The bounds to extend.
     * @return The extended bounds.
     * @ignore
     */
    MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
        var projection = this.getProjection();
        // Turn the bounds into latlng.
        var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
        var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
        // Convert the points to pixels and the extend out by the grid size.
        var trPix = projection.fromLatLngToDivPixel(tr);
        trPix.x += this.gridSize_;
        trPix.y -= this.gridSize_;
        var blPix = projection.fromLatLngToDivPixel(bl);
        blPix.x -= this.gridSize_;
        blPix.y += this.gridSize_;
        // Convert the pixel points back to LatLng
        var ne = projection.fromDivPixelToLatLng(trPix);
        var sw = projection.fromDivPixelToLatLng(blPix);
        // Extend the bounds to contain the new bounds.
        bounds.extend(ne);
        bounds.extend(sw);
        return bounds;
    };
    /**
     * Redraws all the clusters.
     */
    MarkerClusterer.prototype.redraw_ = function () {
        this.createClusters_(0);
    };
    /**
     * Removes all clusters from the map. The markers are also removed from the map
     *  if `hide` is set to `true`.
     *
     * @param hide Set to `true` to also remove the markers from the map.
     */
    MarkerClusterer.prototype.resetViewport_ = function (hide) {
        // Remove all the clusters
        for (var i = 0; i < this.clusters_.length; i++) {
            this.clusters_[i].remove();
        }
        this.clusters_ = [];
        // Reset the markers to not be added and to be removed from the map.
        for (var i = 0; i < this.markers_.length; i++) {
            var marker = this.markers_[i];
            marker.isAdded = false;
            if (hide) {
                marker.setMap(null);
            }
        }
    };
    /**
     * Calculates the distance between two latlng locations in km.
     *
     * @param p1 The first lat lng point.
     * @param p2 The second lat lng point.
     * @return The distance between the two points in km.
     * @link http://www.movable-type.co.uk/scripts/latlong.html
     */
    MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
        var R = 6371; // Radius of the Earth in km
        var dLat = ((p2.lat() - p1.lat()) * Math.PI) / 180;
        var dLon = ((p2.lng() - p1.lng()) * Math.PI) / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((p1.lat() * Math.PI) / 180) *
                Math.cos((p2.lat() * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    /**
     * Determines if a marker is contained in a bounds.
     *
     * @param marker The marker to check.
     * @param bounds The bounds to check against.
     * @return True if the marker is in the bounds.
     */
    MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
        return bounds.contains(marker.getPosition());
    };
    /**
     * Adds a marker to a cluster, or creates a new cluster.
     *
     * @param marker The marker to add.
     */
    MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
        var distance = 40000; // Some large number
        var clusterToAddTo = null;
        for (var i = 0; i < this.clusters_.length; i++) {
            var cluster = this.clusters_[i];
            var center = cluster.getCenter();
            if (center) {
                var d = this.distanceBetweenPoints_(center, marker.getPosition());
                if (d < distance) {
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }
        if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
            clusterToAddTo.addMarker(marker);
        }
        else {
            var cluster = new Cluster(this);
            cluster.addMarker(marker);
            this.clusters_.push(cluster);
        }
    };
    /**
     * Creates the clusters. This is done in batches to avoid timeout errors
     *  in some browsers when there is a huge number of markers.
     *
     * @param iFirst The index of the first marker in the batch of
     *  markers to be added to clusters.
     */
    MarkerClusterer.prototype.createClusters_ = function (iFirst) {
        var _this = this;
        if (!this.ready_) {
            return;
        }
        // Cancel previous batch processing if we're working on the first batch:
        if (iFirst === 0) {
            google.maps.event.trigger(this, "clusteringbegin", this);
            if (typeof this.timerRefStatic !== "undefined") {
                clearTimeout(this.timerRefStatic);
                delete this.timerRefStatic;
            }
        }
        // Get our current map view bounds.
        // Create a new bounds object so we don't affect the map.
        //
        // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
        var mapBounds;
        if (this.getMap().getZoom() > 3) {
            mapBounds = new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast());
        }
        else {
            mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
        }
        var bounds = this.getExtendedBounds(mapBounds);
        var iLast = Math.min(iFirst + this.batchSize_, this.markers_.length);
        for (var i = iFirst; i < iLast; i++) {
            var marker = this.markers_[i];
            if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
                if (!this.ignoreHidden_ ||
                    (this.ignoreHidden_ && marker.getVisible())) {
                    this.addToClosestCluster_(marker);
                }
            }
        }
        if (iLast < this.markers_.length) {
            this.timerRefStatic = window.setTimeout(function () {
                _this.createClusters_(iLast);
            }, 0);
        }
        else {
            delete this.timerRefStatic;
            google.maps.event.trigger(this, "clusteringend", this);
            for (var i = 0; i < this.clusters_.length; i++) {
                this.clusters_[i].updateIcon();
            }
        }
    };
    /**
     * The default function for determining the label text and style
     * for a cluster icon.
     *
     * @param markers The array of markers represented by the cluster.
     * @param numStyles The number of marker styles available.
     * @return The information resource for the cluster.
     */
    MarkerClusterer.CALCULATOR = function (markers, numStyles) {
        var index = 0;
        var count = markers.length;
        var dv = count;
        while (dv !== 0) {
            dv = Math.floor(dv / 10);
            index++;
        }
        index = Math.min(index, numStyles);
        return {
            text: count.toString(),
            index: index,
            title: "",
        };
    };
    /**
     * Generates default styles augmented with user passed values.
     * Useful when you want to override some default values but keep untouched
     *
     * @param overrides override default values
     */
    MarkerClusterer.withDefaultStyle = function (overrides) {
        return __assign({ textColor: "black", textSize: 11, textDecoration: "none", textLineHeight: overrides.height, fontWeight: "bold", fontStyle: "normal", fontFamily: "Arial,sans-serif", backgroundPosition: "0 0" }, overrides);
    };
    /**
     * The number of markers to process in one batch.
     */
    MarkerClusterer.BATCH_SIZE = 2000;
    /**
     * The number of markers to process in one batch (IE only).
     */
    MarkerClusterer.BATCH_SIZE_IE = 500;
    /**
     * The default root name for the marker cluster images.
     */
    MarkerClusterer.IMAGE_PATH = "../images/m";
    /**
     * The default extension name for the marker cluster images.
     */
    MarkerClusterer.IMAGE_EXTENSION = "png";
    /**
     * The default array of sizes for the marker cluster images.
     */
    MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];
    return MarkerClusterer;
}(OverlayViewSafe));var MAP_STYLE = [{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#444444"
  }]
}, {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "color": "#f2f2f2"
  }]
}, {
  "featureType": "poi",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road",
  "elementType": "all",
  "stylers": [{
    "saturation": -100
  }, {
    "lightness": 45
  }]
}, {
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [{
    "visibility": "simplified"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
    "color": "#e2e0df"
  }, {
    "visibility": "on"
  }]
}];var GOOGLE_MAPS;
var MapComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MapComponent, _Component);

  function MapComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MapComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var apiKey = environment.googleMaps.apiKey;

    if (GOOGLE_MAPS != null) {
      this.initMap();
    } else {
      window.onGoogleMapsLoaded = function () {
        GOOGLE_MAPS = window.google.maps;

        _this.initMap();
      };

      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', "https://maps.googleapis.com/maps/api/js?callback=onGoogleMapsLoaded" + (apiKey ? "&key=" + apiKey : '') + "&libraries=places");
      (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script);
    }
  };

  _proto.initMap = function initMap() {
    var google = window.google;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var center = this.center;
    var item = this.items && this.items.length ? this.items[0] : null;
    var position = item ? new google.maps.LatLng(item.latitude, item.longitude) : null;
    var mapOptions = {
      zoom: 15,
      // 9,
      center: position,
      scrollwheel: false,
      // mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT
      },
      // overviewMapControl: true,
      scaleControl: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: true,
      styles: MAP_STYLE
    };
    var mapElement = node.querySelector('.map');
    var map = this.map = new google.maps.Map(mapElement, mapOptions);
    this.addMarkers(this.items);

    if (!this.items) {
      map.fitBounds(this.getItalyBounds());
    }
  };

  _proto.onChanges = function onChanges() {
    this.clearMarkers();
    this.addMarkers(this.items);
  };

  _proto.calculateDistance = function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

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
  };

  _proto.clearMarkers = function clearMarkers() {
    if (this.markerCluster) {
      this.markerCluster.clearMarkers();
    }

    if (this.markers) {
      this.markers.forEach(function (marker) {
        return marker.setMap(null);
      });
    }
  };

  _proto.addMarkers = function addMarkers(items) {
    var _this2 = this;

    var map = this.map;

    if (map && items) {
      var bounds = new google.maps.LatLngBounds();
      var markers = items.map(function (item) {
        var position = new google.maps.LatLng(item.latitude, item.longitude);
        bounds.extend(position);
        var content =
        /* html */
        "<div class=\"card--store-locator\">\n\t\t\t\t\t<div class=\"card__content\">\n\t\t\t\t\t\t<div class=\"card__name\"><span>" + item.name + "</span></div>\n\t\t\t\t\t\t<div class=\"card__address\">" + item.address + "</div>\n\t\t\t\t\t\t<div class=\"card__city\">" + item.city + "</div>\n\t\t\t\t\t\t<div class=\"card__country\">" + item.country.name + "</div>\n\t\t\t\t\t\t" + (item.phone ? "<a class=\"card__phone\" href=\"tel:" + item.phone + "\">" + item.phone + "</a>" : '') + "\n\t\t\t\t\t\t" + (item.fax ? "<a class=\"card__fax\" href=\"tel:" + item.fax + "\">" + item.fax + "</a>" : '') + "\n\t\t\t\t\t\t" + (item.email ? "<a class=\"card__email\" href=\"mailto:" + item.email + "\">" + item.email + "</a>" : '') + "\n\t\t\t\t\t</div>\n\t\t\t\t</div>";
        /*
        `<div class="marker__content">
        	<div class="title"><span>${item.name}</span></div>
        	<div class="group group--info">
        		<div class="address">
        			${item.address}<br>
        			${item.city} ${item.country}<br>
        			${item.phone ? `<span><a href="tel:${item.phone}">${item.phone}</a><br></span>` : ''}
        			${item.fax ? `<span><a href="tel:${item.fax}">${item.fax}</a><br></span>` : ''}
        			${item.email ? `<span><a href="mailto:${item.email}">${item.email}</a><br></span>` : ''}
        		</div>
        		${item.address !== '' ? `<div class="distance">${this.labels.approximately} <b>${Math.floor(item.distance)} km</b></div>` : ``}
        	</div>
        	<div class="group group--cta">
        		${item.address !== '' ? `<a id="locator-marker" href="https://www.google.it/maps/dir/${position.lat()},${position.lng()}/${item.title}/@${item.latitude},${item.longitude}/" target="_blank" class="btn btn--link"><span>${this.labels.reachStore}</span></a>` : ``}
        		${item.type === 8 || item.type === 9 ? `<a id="contact-item" href="${window.itemLocatorSettings.urlStoreContact}?item=${item.id}" target="_blank" class="btn btn--link"><span>${this.labels.contactStore}</span></a>` : ''}
        	</div>
        </div>`
        */

        var markerImage = new google.maps.MarkerImage(environment.assets + "img/maps/marker-sm.png", new google.maps.Size(24, 32));
        var marker = new google.maps.Marker({
          position: position,
          map:  null ,
          icon: markerImage,
          title: item.title,
          item: item,
          content: content
        });
        marker.addListener('click', function () {
          _this2.setMarkerWindow(marker.position, content); // this.scrollToStore(item);
          // GtmService.push({ event: 'dealerlocator', action: 'marker-click', label: item.title });

        });
        item.marker = marker;
        return marker;
      });

      {
        var markerCluster = new MarkerClusterer(this.map, markers, {
          imagePath: environment.assets + "img/maps/cluster-"
        });
        var styles = markerCluster.getStyles();
        var sizes = [48, 56, 64, 72, 80];
        styles.forEach(function (style, i) {
          style.width = sizes[i];
          style.height = sizes[i];
          style.textLineHeight = sizes[i];
          style.textSize = Math.floor(style.width / 5);
          style.textColor = '#ffffff';
        });
        markerCluster.setStyles(styles);
        this.markerCluster = markerCluster;
      }

      this.markers = markers;
      map.fitBounds(bounds);
    }
  };

  _proto.getGeolocation = function getGeolocation(map) {
    var _this3 = this;

    this.error = null;
    this.busyLocation = true;
    var position = this.map.getCenter(); // Try HTML5 geolocation.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (location) {
        position = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        var geocoder = _this3.geocoder || new google.maps.Geocoder();
        _this3.geocoder = geocoder;
        geocoder.geocode({
          'location': position
        }, function (results, status) {
          if (status == 'OK') {
            var filteredInfoCity = results.filter(function (address_component) {
              return address_component.types.includes("locality");
            });
            _this3.model.city = filteredInfoCity.length ? filteredInfoCity[0].formatted_address : undefined;
            _this3.model.address = results[0].formatted_address;

            for (var i = 0; i < results[0].address_components.length; i++) {
              if (results[0].address_components[i].types[0] == "country" || results[0].address_components[i].types[0] == "political") {
                _this3.searchCountry = results[0].address_components[i].short_name;
              }
            }

            _this3.setInfoWindow(position, 1);

            _this3.searchPosition(position).finally(function () {
              return _this3.busyLocation = false;
            });

            _this3.map.setCenter(position);

            _this3.map.setZoom(ZOOM_LEVEL);
          }
        });
      }, function () {
        _this3.setInfoWindow(position, 2);

        _this3.searchPosition(position).finally(function () {
          return _this3.busyLocation = false;
        });
      });
    } else {
      // Browser doesn't support Geolocation
      this.setInfoWindow(position, 3);
      this.searchPosition(position).finally(function () {
        return _this3.busyLocation = false;
      });
    }
  };

  _proto.fitBounds = function fitBounds(items) {
    if (items.length) {
      var bounds = new google.maps.LatLngBounds();
      items.forEach(function (item) {
        var position = new google.maps.LatLng(item.latitude, item.longitude);
        bounds.extend(position);
      });
      this.map.fitBounds(bounds); // console.log('fitBounds');
    }
  };

  _proto.findNearStores = function findNearStores(items, position) {
    var _this4 = this;

    if (items) {
      items.forEach(function (item) {
        item.distance = _this4.calculateDistance(item.latitude, item.longitude, position.lat(), position.lng(), 'K');
        item.visible = (item.cod_stato == window.userCountry || !window.userCountry) && item.distance <= MAX_DISTANCE
        /* Km */
        ;

        if (item.visible) {
          if (item.removed) {
            _this4.markerCluster.addMarker(item.marker);
          }

          delete item.removed;
        } else {
          _this4.markerCluster.removeMarker(item.marker);

          item.removed = true;
        }
      });
      items = items.slice();
      items.sort(function (a, b) {
        return a.distance * (a.importante ? 0.5 : 1) - b.distance * (b.importante ? 0.5 : 1);
      });
      var visibleStores = items.filter(function (item) {
        return item.visible;
      }).slice(0, 50);
      this.$timeout(function () {
        _this4.visibleStores = visibleStores;
      }, 1); // console.log('findNearStores', visibleStores);

      return visibleStores;
    }
  };

  _proto.panTo = function panTo(item) {
    var position = new google.maps.LatLng(item.latitude, item.longitude);
    this.map.setZoom(ZOOM_LEVEL);
    this.map.panTo(position);
    var marker = this.markers.find(function (x) {
      return x.item === item;
    });
    this.setMarkerWindow(marker.position, marker.content);
  };

  _proto.setMarkerWindow = function setMarkerWindow(position, content) {
    if (position) {
      var markerWindow = this.markerWindow || new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(0, -35)
      });
      this.markerWindow = markerWindow;
      markerWindow.setPosition(position);
      markerWindow.setContent(content);
      markerWindow.open(this.map);
    } else {
      this.closeMarkerWindow();
    }
  };

  _proto.closeMarkerWindow = function closeMarkerWindow() {
    if (this.markerWindow) {
      this.markerWindow.close();
    }
  };

  _proto.getWorldBounds = function getWorldBounds() {
    return new google.maps.LatLngBounds(new google.maps.LatLng(61, 60), new google.maps.LatLng(-37, -92));
  };

  _proto.getItalyBounds = function getItalyBounds() {
    return new google.maps.LatLngBounds(new google.maps.LatLng(46.4657567, 5.233972), new google.maps.LatLng(36.8257773, 18.963541));
  };

  return MapComponent;
}(rxcomp.Component);
MapComponent.meta = {
  selector: '[map]',
  inputs: ['center', 'items']
};var SwiperGalleryDirective = /*#__PURE__*/function (_SwiperDirective) {
  _inheritsLoose(SwiperGalleryDirective, _SwiperDirective);

  function SwiperGalleryDirective() {
    return _SwiperDirective.apply(this, arguments) || this;
  }

  var _proto = SwiperGalleryDirective.prototype;

  _proto.onInit = function onInit() {
    this.options = {
      slidesPerView: 'auto',
      spaceBetween: 40,
      speed: 600,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 100,
      keyboardControl: true,
      mousewheelControl: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    };
    this.init_(); // console.log('SwiperGalleryDirective.onInit');
  };

  return SwiperGalleryDirective;
}(SwiperDirective);
SwiperGalleryDirective.meta = {
  selector: '[swiper-gallery]'
};var SwiperHomepageDirective = /*#__PURE__*/function (_SwiperDirective) {
  _inheritsLoose(SwiperHomepageDirective, _SwiperDirective);

  function SwiperHomepageDirective() {
    return _SwiperDirective.apply(this, arguments) || this;
  }

  var _proto = SwiperHomepageDirective.prototype;

  _proto.onInit = function onInit() {
    this.options = {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      keyboardControl: true,
      mousewheelControl: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    };
    this.init_(); // console.log('SwiperHomepageDirective.onInit');
  };

  return SwiperHomepageDirective;
}(SwiperDirective);
SwiperHomepageDirective.meta = {
  selector: '[swiper-homepage]'
};var SwiperNewsPropositionDirective = /*#__PURE__*/function (_SwiperDirective) {
  _inheritsLoose(SwiperNewsPropositionDirective, _SwiperDirective);

  function SwiperNewsPropositionDirective() {
    return _SwiperDirective.apply(this, arguments) || this;
  }

  var _proto = SwiperNewsPropositionDirective.prototype;

  _proto.onInit = function onInit() {
    this.options = {
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 50
        },
        1440: {
          slidesPerView: 2,
          spaceBetween: 60
        },
        1920: {
          slidesPerView: 2,
          spaceBetween: 70
        }
      },
      speed: 600,
      centeredSlides: false,
      loop: false,
      loopAdditionalSlides: 100,
      keyboardControl: true,
      mousewheelControl: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    };

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector('.swiper-container');
    this.init_(target); // console.log('SwiperNewsPropositionDirective.onInit');
  };

  return SwiperNewsPropositionDirective;
}(SwiperDirective);
SwiperNewsPropositionDirective.meta = {
  selector: '[swiper-news-proposition]'
};var SwiperProductsPropositionDirective = /*#__PURE__*/function (_SwiperDirective) {
  _inheritsLoose(SwiperProductsPropositionDirective, _SwiperDirective);

  function SwiperProductsPropositionDirective() {
    return _SwiperDirective.apply(this, arguments) || this;
  }

  var _proto = SwiperProductsPropositionDirective.prototype;

  _proto.onInit = function onInit() {
    this.options = {
      slidesPerView: 1.5,
      spaceBetween: 30,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 60
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 70
        }
      },
      speed: 600,
      centeredSlides: false,
      loop: false,
      loopAdditionalSlides: 100,
      keyboardControl: true,
      mousewheelControl: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    };

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector('.swiper-container');
    this.init_(target); // console.log('SwiperProductsPropositionDirective.onInit');
  };

  return SwiperProductsPropositionDirective;
}(SwiperDirective);
SwiperProductsPropositionDirective.meta = {
  selector: '[swiper-products-proposition]'
};var SwiperProjectsPropositionDirective = /*#__PURE__*/function (_SwiperDirective) {
  _inheritsLoose(SwiperProjectsPropositionDirective, _SwiperDirective);

  function SwiperProjectsPropositionDirective() {
    return _SwiperDirective.apply(this, arguments) || this;
  }

  var _proto = SwiperProjectsPropositionDirective.prototype;

  _proto.onInit = function onInit() {
    this.options = {
      slidesPerView: 1.5,
      spaceBetween: 30,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 60
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 70
        }
      },
      speed: 600,
      centeredSlides: false,
      loop: false,
      loopAdditionalSlides: 100,
      keyboardControl: true,
      mousewheelControl: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    };

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector('.swiper-container');
    this.init_(target); // console.log('SwiperProjectsPropositionDirective.onInit');
  };

  return SwiperProjectsPropositionDirective;
}(SwiperDirective);
SwiperProjectsPropositionDirective.meta = {
  selector: '[swiper-projects-proposition]'
};var CartMiniComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CartMiniComponent, _Component);

  function CartMiniComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = CartMiniComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.showCart = false;
    this.items = [];
    CartService.items$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (items) {
      if (CartService.active) {
        _this.items = items;

        _this.pushChanges();
      }
    });
  };

  _proto.onToggleCart = function onToggleCart(event) {
    this.showCart = !this.showCart;
    this.pushChanges();
  };

  _proto.isAddedToCart = function isAddedToCart(item) {
    return CartService.hasItem(item);
  };

  _proto.onIncrement = function onIncrement(item) {
    var _this2 = this;

    CartService.incrementItem$(item).pipe(operators.first()).subscribe(function (_) {
      _this2.pushChanges();
    });
  };

  _proto.onDecrement = function onDecrement(item) {
    var _this3 = this;

    CartService.decrementItem$(item).pipe(operators.first()).subscribe(function (_) {
      _this3.pushChanges();
    });
  };

  _proto.onRemoveAll = function onRemoveAll() {
    CartService.removeAll$().pipe(operators.first()).subscribe();
  };

  _proto.onClose = function onClose(event) {
    CartService.setActive(false);
  };

  return CartMiniComponent;
}(rxcomp.Component);
CartMiniComponent.meta = {
  selector: '[cart-mini]'
};var FilesComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(FilesComponent, _Component);

  function FilesComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FilesComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.showFiles = false;
    this.user = null;
    UserService.me$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (user) {
      _this.user = user;

      _this.pushChanges();
    });
    this.files = [];
    FilesService.files$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (files) {
      _this.files = files;

      _this.pushChanges();
    });
  };

  _proto.onToggleFiles = function onToggleFiles(event) {
    this.showFiles = !this.showFiles;
    this.pushChanges();
  };

  _proto.onToggleFile = function onToggleFile(file) {
    var _this2 = this;

    (this.isAddedToFiles(file) ? FilesService.removeFile$(file) : FilesService.addFile$(file)).pipe(operators.first()).subscribe(function (_) {
      _this2.pushChanges();
    });
  };

  _proto.isAddedToFiles = function isAddedToFiles(file) {
    return FilesService.hasFile(file);
  };

  _proto.onDownloadAll = function onDownloadAll(event) {
    event.preventDefault();

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    FilesService.currentFiles.forEach(function (file) {
      var link = document.createElement('a');
      link.setAttribute('href', file.url);
      link.setAttribute('download', file.title);
      link.setAttribute('target', '_blank');
      link.click();
      /*
      const item = node.querySelector(`[href]="${file.url}"`);
      if (item) {
      	item.click();
      }
      */
      // window.open(file.url, '_blank');
    });
  };

  _proto.onRemoveAll = function onRemoveAll() {
    FilesService.removeAll$().pipe(operators.first()).subscribe();
  };

  return FilesComponent;
}(rxcomp.Component);
FilesComponent.meta = {
  selector: '[files]'
};var HeaderMode = {
  IDLE: 'idle',
  MENU: 'menu',
  SEARCH: 'search',
  CART: 'cart'
};
var HeaderComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(HeaderComponent, _Component);

  function HeaderComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "direction_", null);

    _defineProperty(_assertThisInitialized(_this), "scrolled_", null);

    return _this;
  }

  var _proto = HeaderComponent.prototype;

  _proto.onInit = function onInit() {
    var _this2 = this;

    this.show = HeaderMode.IDLE;
    var pictogram = document.querySelector('.page > .pictogram');
    LocomotiveScrollService.scroll$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      _this2.direction = event.direction;
      _this2.scrolled = event.scroll.y > 100;
      var opacity = 0.1 - 0.1 * Math.min(1, Math.max(0, (event.scroll.y - window.innerHeight * 3) / window.innerHeight / 3));
      gsap.set(pictogram, {
        opacity: opacity
      }); // console.log('HeaderComponent', event.scroll.y, event.direction, event.speed);
    });
    this.user = null;
    UserService.me$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (user) {
      _this2.user = user;

      _this2.pushChanges();
    });
    this.cart = CartService;
  };

  _proto.onLogin = function onLogin() {
    ModalService.open$({
      src: environment.template.modal.userModal,
      data: {
        view: 1
      }
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      console.log('HeaderComponent.onLogin', event);

      if (event instanceof ModalResolveEvent) {
        window.location.href = environment.slug.reservedArea;
      }
    });
  };

  _proto.onLogout = function onLogout() {
    UserService.signout$().pipe(operators.first()).subscribe();
  };

  _proto.onToggleMenu = function onToggleMenu() {
    this.show = this.show === HeaderMode.MENU ? HeaderMode.IDLE : HeaderMode.MENU;
    this.pushChanges();
  };

  _proto.onToggleSearch = function onToggleSearch() {
    this.show = this.show === HeaderMode.SEARCH ? HeaderMode.IDLE : HeaderMode.SEARCH;
    this.pushChanges();
  };

  _proto.onToggleCart = function onToggleCart() {
    CartService.setActive(!CartService.active);
  };

  _createClass(HeaderComponent, [{
    key: "direction",
    get: function get() {
      return this.direction_;
    },
    set: function set(direction) {
      if (this.direction_ !== direction) {
        var _getContext = rxcomp.getContext(this),
            node = _getContext.node;

        node.classList.remove("scrolling-" + this.direction_);
        node.classList.add("scrolling-" + direction);
        this.direction_ = direction;
      }
    }
  }, {
    key: "scrolled",
    get: function get() {
      return this.scrolled_;
    },
    set: function set(scrolled) {
      if (this.scrolled_ !== scrolled) {
        this.scrolled_ = scrolled;

        var _getContext2 = rxcomp.getContext(this),
            node = _getContext2.node;

        scrolled ? node.classList.add("scrolled") : node.classList.remove("scrolled");
      }
    }
  }]);

  return HeaderComponent;
}(rxcomp.Component);
HeaderComponent.meta = {
  selector: '[header]'
};var MENUS = [];
var MenuDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(MenuDirective, _Directive);

  function MenuDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = MenuDirective.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var submenus = this.submenus = document.querySelector(".group--submenus");
    var target = this.target = document.querySelector("#menu-" + this.menu);
    var preview = target.querySelector('[data-target]');
    var previewSrc = this.previewSrc = preview.src;
    var container = this.container = target.querySelector(".container");
    this.onOver = this.onOver.bind(this);
    this.onLeave = this.onLeave.bind(this);
    node.addEventListener('click', this.onOver);
    MENUS.push(this);
  };

  _proto.onOver = function onOver(event) {
    event.preventDefault();
    MENUS.forEach(function (x) {
      return x.onLeave(true);
    });
    var submenus = this.submenus;
    submenus.classList.add('active');
    var target = this.target;
    var preview = target.querySelector('[data-target]');
    preview.src = this.previewSrc;
    target.classList.add('active');
    var container = this.container;
    container.addEventListener('mouseleave', this.onLeave);
  };

  _proto.onLeave = function onLeave(keepBackground) {
    if (keepBackground !== true) {
      var submenus = this.submenus;
      submenus.classList.remove('active');
    }

    var target = this.target;
    target.classList.remove('active');
    var container = this.container;
    container.removeEventListener('mouseleave', this.onLeave);
  };

  _proto.onDestroy = function onDestroy() {
    this.onLeave();

    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    node.removeEventListener('mouseover', this.onOver);
  };

  return MenuDirective;
}(rxcomp.Directive);
MenuDirective.meta = {
  selector: '[menu]',
  inputs: ['menu']
};var NewsletterPropositionComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(NewsletterPropositionComponent, _Component);

  function NewsletterPropositionComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = NewsletterPropositionComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var form = this.form = new rxcompForm.FormGroup({
      email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();
    });
  };

  _proto.onNewsletter = function onNewsletter(event) {
    console.log('NewsletterPropositionComponent.onNewsletter', this.form.value);
    var encoded = LocationService.encode('email', this.form.value.email, {});
    window.location.href = this.action + "?params=" + encoded;
  };

  return NewsletterPropositionComponent;
}(rxcomp.Component);
NewsletterPropositionComponent.meta = {
  selector: '[newsletter-proposition]',
  inputs: ['action']
};var SubmenuDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(SubmenuDirective, _Directive);

  function SubmenuDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = SubmenuDirective.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var items = Array.prototype.slice.call(node.querySelectorAll('[data-picture]'));
    var target = node.querySelector('[data-target]');
    gsap.set(target, {
      opacity: 1
    });
    items.forEach(function (item) {
      item.addEventListener('mouseover', function (event) {
        var picture = item.getAttribute('data-picture');
        gsap.set(target, {
          opacity: 0
        });

        target.onload = function () {
          gsap.to(target, {
            duration: 0.5,
            delay: 0.1,
            opacity: 1,
            ease: Power4.easeOut,
            overwrite: 'all'
          });
        };

        target.src = picture;
      });
    });
  };

  return SubmenuDirective;
}(rxcomp.Directive);
SubmenuDirective.meta = {
  selector: '[submenu]'
};var TreeComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TreeComponent, _Component);

  function TreeComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TreeComponent.prototype;

  _proto.hasItems = function hasItems(item) {
    return item.items && item.items.length > 0;
  };

  _proto.onClick = function onClick(item) {
    var _this = this;

    this.tree.forEach(function (x) {
      x.active = x.id === item.id ? _this.hasItems(item) ? !item.active : true : false;
    });

    if (item.active) {
      this.open.next(item);
    }

    this.pushChanges();
  };

  _proto.onOpen = function onOpen(item) {
    this.open.next(item);
  };

  return TreeComponent;
}(rxcomp.Component);
TreeComponent.meta = {
  selector: '[tree]',
  inputs: ['tree'],
  outputs: ['open'],
  template:
  /* html */
  "\n\t\t<li class=\"folder\" [class]=\"{ active: item.active }\" *for=\"let item of tree\">\n\t\t\t<span [innerHTML]=\"item.title\" (click)=\"onClick(item)\"></span>\n\t\t\t<ul [tree]=\"item.items\" (open)=\"onOpen($event)\"></ul>\n\t\t</li>\n\t"
};var UserForgotComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UserForgotComponent, _Component);

  function UserForgotComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserForgotComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    this.success = false;
    var form = this.form = new rxcompForm.FormGroup({
      email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
      checkRequest: window.antiforgery,
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();

      LocomotiveScrollService.update();
    });
  };

  _proto.test = function test() {
    var form = this.form;
    form.patch({
      email: 'jhonappleseed@gmail.com'
    });
  };

  _proto.reset = function reset() {
    var form = this.form;
    form.reset();
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    var form = this.form;
    console.log('UserForgotComponent.onSubmit', form.value);

    if (form.valid) {
      form.submitted = true;
      UserService.forgot$(form.value).pipe(operators.first()).subscribe(function (response) {
        console.log('UserForgotComponent.onSubmit', response);
        _this2.success = true;
        GtmService.push({
          'event': "Forgot",
          'form_name': "Recupero Password"
        });
        form.reset();

        _this2.forgot.next(true);
      }, function (error) {
        console.log('UserForgotComponent.error', error);
        _this2.error = error;
        form.submitted = false;

        _this2.pushChanges();

        LocomotiveScrollService.update();
      });
    } else {
      form.touched = true;
    }
  };

  _proto.onSignIn = function onSignIn() {
    this.viewSignIn.next();
  };

  _proto.onSignUp = function onSignUp() {
    this.viewSignUp.next();
  };

  return UserForgotComponent;
}(rxcomp.Component);
UserForgotComponent.meta = {
  selector: '[user-forgot]',
  outputs: ['forgot', 'viewSignIn', 'viewSignUp']
};var UserComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UserComponent, _Component);

  function UserComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserComponent.prototype;

  _proto.onInit = function onInit() {
    this.views = UserViews;
    this.view = this.view || UserViews.SIGN_UP;
  };

  _proto.setView = function setView(view) {
    this.view = view;
    this.pushChanges();

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    LocomotiveScrollService.scrollTo(node, {
      offset: -100
    });
  };

  _proto.onViewForgot = function onViewForgot(event) {
    // console.log('UserComponent.onForgot');
    this.setView(UserViews.FORGOTTEN);
  };

  _proto.onViewSignIn = function onViewSignIn(event) {
    // console.log('UserComponent.onSignIn');
    this.setView(UserViews.SIGN_IN);
  };

  _proto.onViewSignUp = function onViewSignUp(event) {
    // console.log('UserComponent.onSignUp');
    this.setView(UserViews.SIGN_UP);
  };

  _proto.onSignIn = function onSignIn(user) {
    console.log('UserComponent.onSignIn', user);
    UserService.setUser(user);

    if (this.navTo) {
      window.location.href = this.navTo;
    } // nav to profile

  };

  _proto.onSignUp = function onSignUp(user) {
    console.log('UserComponent.onSignUp', user);
    UserService.setUser(user);

    if (this.navTo) {
      window.location.href = this.navTo;
    } // nav to profile

  };

  _proto.onForgot = function onForgot(email) {
    /*
    console.log('UserComponent.onForgot', email);
    this.setView(UserViews.SIGN_IN);
    */
  };

  return UserComponent;
}(rxcomp.Component);
UserComponent.meta = {
  selector: '[user]',
  inputs: ['navTo', 'view']
};var UserModalComponent = /*#__PURE__*/function (_UserComponent) {
  _inheritsLoose(UserModalComponent, _UserComponent);

  function UserModalComponent() {
    return _UserComponent.apply(this, arguments) || this;
  }

  var _proto = UserModalComponent.prototype;

  _proto.onInit = function onInit() {
    _UserComponent.prototype.onInit.call(this);

    var _getContext = rxcomp.getContext(this),
        parentInstance = _getContext.parentInstance;

    if (parentInstance instanceof ModalOutletComponent) {
      var data = parentInstance.modal.data;
      this.view = data.view; // console.log('UserModalComponent.onInit', data);
    }

    LocomotiveScrollService.stop();
  };

  _proto.setView = function setView(view) {
    this.view = view;
    this.pushChanges();

    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    var target = window.innerWidth >= 1024 ? node.querySelector('.modal__inner') : node;
    target.scrollTo(0, 0);
  };

  _proto.onViewForgot = function onViewForgot() {
    console.log('UserModalComponent.onViewForgot');
    this.setView(UserViews.FORGOTTEN);
  };

  _proto.onViewSignIn = function onViewSignIn() {
    console.log('UserModalComponent.onViewSignIn');
    this.setView(UserViews.SIGN_IN);
  };

  _proto.onViewSignUp = function onViewSignUp() {
    console.log('UserModalComponent.onViewSignUp');
    this.setView(UserViews.SIGN_UP);
  };

  _proto.onClose = function onClose() {
    ModalService.reject();
  };

  _proto.onSignUp = function onSignUp(user) {
    // console.log('UserModalComponent.onSignUp', user);
    ModalService.resolve(user);
  };

  _proto.onSignIn = function onSignIn(user) {
    // console.log('UserModalComponent.onSignIn', user);
    ModalService.resolve(user);
  };

  _proto.onDestroy = function onDestroy() {
    LocomotiveScrollService.start();
  };

  return UserModalComponent;
}(UserComponent);
UserModalComponent.meta = {
  selector: '[user-modal]'
};var UserSigninComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UserSigninComponent, _Component);

  function UserSigninComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserSigninComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    this.success = false;
    var form = this.form = new rxcompForm.FormGroup({
      email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
      password: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      checkRequest: window.antiforgery,
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();

      LocomotiveScrollService.update();
    });
  };

  _proto.test = function test() {
    var form = this.form;
    form.patch({
      email: 'jhonappleseed@gmail.com',
      password: '********'
    });
  };

  _proto.reset = function reset() {
    var form = this.form;
    form.reset();
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    var form = this.form;
    console.log('UserSigninComponent.onSubmit', form.value);

    if (form.valid) {
      form.submitted = true;
      UserService.signin$(form.value).pipe(operators.first()).subscribe(function (response) {
        console.log('UserSigninComponent.onSubmit', response);
        _this2.success = true;
        GtmService.push({
          'event': "Signin",
          'form_name': "Login"
        });
        form.reset();

        _this2.signIn.next(response);
      }, function (error) {
        console.log('UserSigninComponent.error', error);
        _this2.error = error;
        form.submitted = false;

        _this2.pushChanges();

        LocomotiveScrollService.update();
      });
    } else {
      form.touched = true;
    }
  };

  _proto.onForgot = function onForgot(event) {
    this.viewForgot.next();
  };

  _proto.onSignUp = function onSignUp(event) {
    this.viewSignUp.next();
  };

  return UserSigninComponent;
}(rxcomp.Component);
UserSigninComponent.meta = {
  selector: '[user-signin]',
  outputs: ['signIn', 'viewForgot', 'viewSignUp']
};function MatchValidator(fieldName, formGroup) {
  return new rxcompForm.FormValidator(function (value) {
    var field = formGroup ? formGroup.get(fieldName) : null;

    if (!value || !field) {
      return null;
    }

    return value !== field.value ? {
      match: {
        value: value,
        match: field.value
      }
    } : null;
  });
}function RequiredIfValidator(fieldName, formGroup) {
  return new rxcompForm.FormValidator(function (value) {
    var field = formGroup ? formGroup.get(fieldName) : null;
    return field && field.value && !value ? {
      required: {
        value: value,
        requiredIf: fieldName
      }
    } : null;
  });
}var UserSignupComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UserSignupComponent, _Component);

  function UserSignupComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserSignupComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    this.success = false;
    var form = this.form = new rxcompForm.FormGroup({
      firstName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      lastName: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      city: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      company: new rxcompForm.FormControl(null),
      occupation: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
      password: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      passwordConfirm: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), MatchValidator('password', form)]),
      privacy: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      newsletter: new rxcompForm.FormControl(null),
      newsletterLanguage: new rxcompForm.FormControl(null, [RequiredIfValidator('newsletter', form)]),
      checkRequest: window.antiforgery,
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.pushChanges();

      LocomotiveScrollService.update();
    });
    this.load$().pipe(operators.first(), operators.takeUntil(this.unsubscribe$)).subscribe();
  };

  _proto.load$ = function load$() {
    var _this2 = this;

    return UserService.data$().pipe(operators.tap(function (data) {
      var controls = _this2.controls;
      controls.country.options = FormService.toSelectOptions(data.country.options);
      controls.occupation.options = FormService.toSelectOptions(data.occupation.options);
      controls.newsletterLanguage.options = FormService.toSelectOptions(data.newsletterLanguage.options);

      _this2.pushChanges();
    }));
  };

  _proto.test = function test() {
    var form = this.form;
    var controls = this.controls;
    var country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
    var occupation = controls.occupation.options.length > 1 ? controls.occupation.options[1].id : null;
    form.patch({
      firstName: 'Jhon',
      lastName: 'Appleseed',
      country: country,
      city: 'Pesaro',
      company: 'Websolute',
      occupation: occupation,
      email: 'jhonappleseed@gmail.com',
      password: '********',
      passwordConfirm: '********',
      privacy: true
    });
  };

  _proto.reset = function reset() {
    var form = this.form;
    form.reset();
  };

  _proto.onSubmit = function onSubmit() {
    var _this3 = this;

    var form = this.form;
    console.log('UserSignupComponent.onSubmit', form.value);

    if (form.valid) {
      form.submitted = true;
      UserService.signup$(form.value).pipe(operators.first()).subscribe(function (response) {
        console.log('UserSignupComponent.onSubmit', response);
        _this3.success = true;
        GtmService.push({
          'event': "Registration",
          'form_name': "Registrazione"
        });
        form.reset();

        _this3.signUp.next(response);
      }, function (error) {
        console.log('UserSignupComponent.error', error);
        _this3.error = error;
        form.submitted = false;

        _this3.pushChanges();

        LocomotiveScrollService.update();
      });
    } else {
      form.touched = true;
    }
  };

  _proto.onSignIn = function onSignIn() {
    this.viewSignIn.next();
  };

  return UserSignupComponent;
}(rxcomp.Component);
UserSignupComponent.meta = {
  selector: '[user-signup]',
  outputs: ['signUp', 'viewSignIn']
};var factories$2 = [CartMiniComponent, FilesComponent, HeaderComponent, MapComponent, MenuDirective, NewsletterPropositionComponent, SubmenuDirective, SwiperGalleryDirective, SwiperHomepageDirective, SwiperNewsPropositionDirective, SwiperProductsPropositionDirective, SwiperProjectsPropositionDirective, TreeComponent, UserComponent, UserForgotComponent, UserModalComponent, UserSigninComponent, UserSignupComponent];
var pipes$2 = [];
var SharedModule = /*#__PURE__*/function (_Module) {
  _inheritsLoose(SharedModule, _Module);

  function SharedModule() {
    return _Module.apply(this, arguments) || this;
  }

  return SharedModule;
}(rxcomp.Module);
SharedModule.meta = {
  imports: [],
  declarations: [].concat(factories$2, pipes$2),
  exports: [].concat(factories$2, pipes$2)
};var AppModule = /*#__PURE__*/function (_Module) {
  _inheritsLoose(AppModule, _Module);

  function AppModule() {
    return _Module.apply(this, arguments) || this;
  }

  return AppModule;
}(rxcomp.Module);
AppModule.meta = {
  imports: [rxcomp.CoreModule, rxcompForm.FormModule, CommonModule, ControlsModule, SharedModule],
  declarations: [AmbienceComponent, AteliersAndStoresComponent, CareersComponent, ContactsComponent, DealersComponent, DesignersComponent, MaterialsComponent, MaterialsModalComponent, NewsComponent, NewsletterComponent, ProductsComponent, ProductsConfigureComponent, ProductsDetailComponent, ProjectsComponent, ProjectsRegistrationComponent, ProjectsRegistrationModalComponent, ReservedAreaComponent, StoreLocatorComponent],
  bootstrap: AppComponent
};rxcomp.Browser.bootstrap(AppModule);})));