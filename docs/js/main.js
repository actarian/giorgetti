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
}var AppComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppComponent, _Component);

  function AppComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AppComponent.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.remove('hidden');
    console.log('AppComponent.onInit');
  };

  return AppComponent;
}(rxcomp.Component);
AppComponent.meta = {
  selector: '[app-component]'
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
};var Utils = /*#__PURE__*/function () {
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
    configureProduct: "/Client/docs/products-configure.html"
  },
  template: {
    modal: {
      myModal: '/template/modules/giorgetti/my-modal.cshtml'
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
    configureProduct: "/giorgetti/products-configure.html"
  },
  template: {
    modal: {
      myModal: '/my-modal.html'
    }
  },
  googleMaps: {
    apiKey: 'AIzaSyDvGw6iAoKdRv8mmaC9GeT-LWLPQtA8p60'
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
console.log('environment', environment);var EnvPipe = /*#__PURE__*/function (_Pipe) {
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

_defineProperty(KeyboardService, "keys", {});var ControlComponent = /*#__PURE__*/function (_Component) {
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
};var ControlCustomSelectComponent = /*#__PURE__*/function (_ControlComponent) {
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
        return 'select'; // LabelPipe.transform('select');
      }
    } else {
      var item = items.find(function (x) {
        return x.id === value || x.name === value;
      });

      if (item) {
        return item.name;
      } else {
        return 'select'; // LabelPipe.transform('select');
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
  inputs: ['control', 'label', 'multiple'],
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
};var LabelPipe = /*#__PURE__*/function (_Pipe) {
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
        }; // const body = document.querySelector('body');

        var previousY = window.pageYOffset; // body.scrollTop;

        window.addEventListener('scroll', function () {
          var y = window.pageYOffset; // body.scrollTop;

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
    if (!LocomotiveScrollService.useLocomotiveScroll()) {
      this.scroll$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {// console.log('ScrollDirective', event);
      });
    }
  };

  _proto.scroll$ = function scroll$() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var speed = node.hasAttribute('data-scroll-speed') ? parseFloat(node.getAttribute('data-scroll-speed')) : 1.5;
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
  selector: '[data-scroll]'
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
};var ID = 0;
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
    var THRON = window.THRONContentExperience || window.THRONPlayer;

    if (!THRON) {
      return;
    } // console.log('THRONContentExperience', window.THRONContentExperience, 'THRONPlayer', window.THRONPlayer);


    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = this.target = node.querySelector('.video > .thron');
    var id = target.id = "thron-" + ++ID;
    var media = this.thron;

    if (media.indexOf('pkey=') === -1) {
      var splitted = media.split('/');
      var clientId = splitted[6];
      var xcontentId = splitted[7];
      var pkey = splitted[8];
      media = "https://gruppoconcorde-view.thron.com/api/xcontents/resources/delivery/getContentDetail?clientId=" + clientId + "&xcontentId=" + xcontentId + "&pkey=" + pkey;
    }

    var controls = this.controls = node.hasAttribute('controls') ? true : false,
        loop = this.loop = node.hasAttribute('loop') ? true : false,
        autoplay = this.autoplay = node.hasAttribute('autoplay') ? true : false;
    var player = this.player = THRON(id, {
      media: media,
      loop: loop,
      autoplay: autoplay,
      muted: !controls,
      displayLinked: 'close',
      noSkin: !controls // lockBitrate: 'max',

    });
    this.onReady = this.onReady.bind(this);
    this.onCanPlay = this.onCanPlay.bind(this);
    this.onPlaying = this.onPlaying.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onComplete = this.onComplete.bind(this);
    player.on('ready', this.onReady);
    player.on('canPlay', this.onCanPlay);
    player.on('playing', this.onPlaying);
    player.on('play', this.onPlay);
    player.on('pause', this.onPause);
    player.on('complete', this.onComplete);
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
}();var LocationService = /*#__PURE__*/function () {
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
}();var HttpService = /*#__PURE__*/function () {
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

_defineProperty(ApiService, "currentLanguage", LanguageService.activeLanguage);var AteliersAndStoresService = /*#__PURE__*/function () {
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
      country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      search: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
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

      var options = _this.filters.country.options.slice().map(function (x) {
        return {
          id: x.value,
          name: x.label
        };
      });

      options.unshift({
        id: null,
        name: 'select'
      }); // , // LabelPipe.transform('select')

      controls.country.options = options;

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
      category: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      search: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
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

      var options = _this.filters.category.options.slice().map(function (x) {
        return {
          id: x.value,
          name: x.label
        };
      });

      options.unshift({
        id: null,
        name: 'select'
      }); // , // LabelPipe.transform('select')

      controls.category.options = options;

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
};var HeaderComponent = /*#__PURE__*/function (_Component) {
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

    var pictogram = document.querySelector('.page > .pictogram');
    LocomotiveScrollService.scroll$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      _this2.direction = event.direction;
      _this2.scrolled = event.scroll.y > 100;
      var opacity = 0.1 - 0.1 * Math.min(1, event.scroll.y / window.innerHeight / 4);
      gsap.set(pictogram, {
        opacity: opacity
      }); // console.log('HeaderComponent', event.scroll.y, event.direction, event.speed);
    });
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
};var MaterialsService = /*#__PURE__*/function () {
  function MaterialsService() {}

  MaterialsService.all$ = function all$() {
    return ApiService.get$('/materials/all.json');
  };

  MaterialsService.filters$ = function filters$() {
    return ApiService.get$('/materials/filters.json');
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

    this.selectedItem = null;
    this.items = [];
    this.filteredItems = [];
    this.filters = {};
    var form = this.form = new rxcompForm.FormGroup({
      category: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (_) {
      _this.setFilterByKeyAndValue('category', form.value.category);

      _this.pushChanges();
    });
    this.load$().pipe(operators.first()).subscribe(function (data) {
      _this.items = data[0];
      _this.filters = data[1];

      var options = _this.filters.category.options.slice().map(function (x) {
        return {
          id: x.value,
          name: x.label
        };
      });

      controls.category.options = options;

      _this.onLoad();

      _this.pushChanges();
    });
  };

  _proto.load$ = function load$() {
    return rxjs.combineLatest([MaterialsService.all$(), MaterialsService.filters$()]);
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
    var category = this.filters.category.values.length ? this.filters.category.values[0] : null;
    this.form.patch({
      category: category,
      search: search
    });
    filterService.items$(items).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (filteredItems) {
      _this2.filteredItems = filteredItems;

      _this2.pushChanges();

      LocomotiveScrollService.update(); // console.log('MaterialsComponent.filteredItems', filteredItems.length);
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

  _proto.onToggle = function onToggle(item) {
    this.selectedItem = this.selectedItem === item ? null : item;

    if (this.selectedItem) {
      var selector = '#cat-' + item.category.id + '-' + item.id;
      this.scrollTo(selector);
    }

    this.pushChanges();
  };

  _proto.scrollTo = function scrollTo(selector, event) {
    if (event) {
      event.preventDefault();
    }

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var target = node.querySelector(selector);
    LocomotiveScrollService.scrollTo(target, {
      offset: -100
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
    var container = this.container = target.querySelector(".container");
    this.onOver = this.onOver.bind(this);
    this.onLeave = this.onLeave.bind(this);
    node.addEventListener('mouseover', this.onOver);
    MENUS.push(this);
  };

  _proto.onOver = function onOver() {
    MENUS.forEach(function (x) {
      return x.onLeave(true);
    });
    var submenus = this.submenus;
    submenus.classList.add('active');
    var target = this.target;
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
      country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      search: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
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

      var options = _this.filters.country.options.slice().map(function (x) {
        return {
          id: x.value,
          name: x.label
        };
      });

      options.unshift({
        id: null,
        name: 'select'
      }); // , // LabelPipe.transform('select')

      controls.country.options = options;

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
  };

  return NewsletterPropositionComponent;
}(rxcomp.Component);
NewsletterPropositionComponent.meta = {
  selector: '[newsletter-proposition]'
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

  _proto.showVersions = function showVersions(event) {
    this.visibleItems = this.items.slice();
    this.pushChanges();
    LocomotiveScrollService.update();
  };

  _proto.configureProduct = function configureProduct(event) {
    window.location.href = environment.slug.configureProduct;
  };

  return ProductsDetailComponent;
}(rxcomp.Component);
ProductsDetailComponent.meta = {
  selector: '[products-detail]'
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
      category: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      search: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
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

      var options = _this.filters.category.options.slice().map(function (x) {
        return {
          id: x.value,
          name: x.label
        };
      });

      options.unshift({
        id: null,
        name: 'select'
      }); // , // LabelPipe.transform('select')

      controls.category.options = options;

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
      country: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      category: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()]),
      search: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator()])
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
      console.log(_this.items);
      _this.filters = data[1]; // countries

      var countries = _this.filters.country.options.slice().map(function (x) {
        return {
          id: x.value,
          name: x.label
        };
      });

      countries.unshift({
        id: null,
        name: 'select'
      }); // , // LabelPipe.transform('select')

      controls.country.options = countries; // categories

      var categories = _this.filters.category.options.slice().map(function (x) {
        return {
          id: x.value,
          name: x.label
        };
      });

      categories.unshift({
        id: null,
        name: 'select'
      }); // , // LabelPipe.transform('select')

      controls.category.options = categories;

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
};var AppModule = /*#__PURE__*/function (_Module) {
  _inheritsLoose(AppModule, _Module);

  function AppModule() {
    return _Module.apply(this, arguments) || this;
  }

  return AppModule;
}(rxcomp.Module);
AppModule.meta = {
  imports: [rxcomp.CoreModule, rxcompForm.FormModule],
  declarations: [AteliersAndStoresComponent, // ControlCheckboxComponent,
  ControlCustomSelectComponent, ControlEmailComponent, // ControlLinkComponent,
  // ControlNumberComponent,
  // ControlPasswordComponent,
  // ControlsComponent,
  // ControlSelectComponent,
  ControlSearchComponent, // ControlTextareaComponent,
  // ControlTextComponent,
  DesignersComponent, // DisabledDirective,
  // DropDirective,
  DropdownDirective, DropdownItemDirective, // DropdownItemDirective,
  EnvPipe, // ErrorsComponent,
  FlagPipe, HeaderComponent, HtmlPipe, IdDirective, LabelPipe, // LanguageComponent,
  // LazyDirective,
  LocomotiveScrollDirective, MapComponent, MaterialsComponent, MenuDirective, // ModalComponent,
  // ModalOutletComponent,
  NewsComponent, NewsletterPropositionComponent, ProductsConfigureComponent, ProductsDetailComponent, ProjectsComponent, ScrollDirective, SlugPipe, StoreLocatorComponent, SubmenuDirective, // SvgIconStructure,
  SwiperDirective, SwiperHomepageDirective, SwiperNewsPropositionDirective, SwiperProductsPropositionDirective, SwiperProjectsPropositionDirective, SwiperGalleryDirective, ThronComponent, TitleDirective // UploadItemComponent,
  // ValueDirective,
  // VirtualStructure
  ],
  bootstrap: AppComponent
};rxcomp.Browser.bootstrap(AppModule);})));