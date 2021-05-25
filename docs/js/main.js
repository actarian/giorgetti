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
  workers: {
    image: '/Client/docs/js/workers/image.service.worker.js',
    prefetch: '/Client/docs/js/workers/prefetch.service.worker.js'
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
  workers: {
    image: './js/workers/image.service.worker.js',
    prefetch: './js/workers/prefetch.service.worker.js'
  },
  githubDocs: 'https://raw.githubusercontent.com/actarian/giorgetti/main/docs/',
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

  _proto.init_ = function init_() {
    var _this = this;

    this.events$ = new rxjs.Subject();

    if (this.enabled) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      gsap.set(node, {
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
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      if (this.swiper) {
        this.swiper.update();
      } else {
        var swiper;
        var on = this.options.on || (this.options.on = {});
        var callback = on.init;

        if (!on.init || !on.init.swiperDirectiveInit) {
          on.init = function () {
            var _this2 = this;

            gsap.to(node, {
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

        gsap.set(node, {
          opacity: 1
        });
        swiper = new Swiper(node, this.options);
        console.log(swiper);
        this.swiper = swiper;
        this.swiper._opening = true;
        node.classList.add('swiper-init');
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

  HttpService.http$ = function http$(method, url, data, format) {
    var _this = this;

    var methods = ['POST', 'PUT', 'PATCH'];
    var response_ = null; // url = this.getUrl(url, format);

    return rxjs.from(fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: methods.indexOf(method) !== -1 ? JSON.stringify(data) : undefined
    }).then(function (response) {
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

    this.pushChanges();
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('AteliersAndStoresComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('country', this.form.value.country);
    this.setFilterByKeyAndValue('search', this.form.value.search);
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

    this.pushChanges();
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('DesignersComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('category', this.form.value.category);
    this.setFilterByKeyAndValue('search', this.form.value.search);
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

    LocomotiveScrollService.scroll$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      _this2.direction = event.direction;
      _this2.scrolled = event.scroll.y > 600; // console.log('HeaderComponent', event.scroll.y, event.direction, event.speed);
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
};var GOOGLE_MAPS;
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

    var latitude = node.getAttribute('data-latitude');
    var longitude = node.getAttribute('data-longitude');
    var position = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
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
      styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e9e9e9"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dedede"
        }, {
          "lightness": 21
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#333333"
        }, {
          "lightness": 40
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f2f2f2"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }]
    };
    var mapElement = node.querySelector('.map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var iconOptions = {
      home: {
        latitude: latitude,
        longitude: longitude
      },
      text: '<div class="map-popup"><h2>Websolute</h2><p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p></div>',
      icon_url: '/img/marker.png',
      zoom: 15
    };
    var icon = {
      url: iconOptions.icon_url,
      origin: new google.maps.Point(0, 0)
    };
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      draggable: false
    });
    var info = new google.maps.InfoWindow({
      content: iconOptions.text
    });
    google.maps.event.addListener(marker, 'click', function () {
      info.open(map, marker);
    });
  };

  return MapComponent;
}(rxcomp.Component);
MapComponent.meta = {
  selector: '[map]'
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

    this.pushChanges();
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('NewsComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('country', this.form.value.country);
    this.setFilterByKeyAndValue('search', this.form.value.search);
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

    this.pushChanges();
  };

  _proto.onSearch = function onSearch(model) {
    // console.log('ProjectsComponent.onSearch', this.form.value);
    this.setFilterByKeyAndValue('category', this.form.value.category);
    this.setFilterByKeyAndValue('search', this.form.value.search);
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
};var SwiperGalleryDirective = /*#__PURE__*/function (_SwiperDirective) {
  _inheritsLoose(SwiperGalleryDirective, _SwiperDirective);

  function SwiperGalleryDirective() {
    return _SwiperDirective.apply(this, arguments) || this;
  }

  var _proto = SwiperGalleryDirective.prototype;

  _proto.onInit = function onInit() {
    this.options = {
      slidesPerView: 1,
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
  FlagPipe, HeaderComponent, HtmlPipe, // IdDirective,
  LabelPipe, // LanguageComponent,
  // LazyDirective,
  LocomotiveScrollDirective, MapComponent, // ModalComponent,
  // ModalOutletComponent,
  NewsComponent, NewsletterPropositionComponent, ProjectsComponent, ScrollDirective, SlugPipe, // SvgIconStructure,
  SwiperDirective, SwiperGalleryDirective, TitleDirective // UploadItemComponent,
  // ValueDirective,
  // VirtualStructure
  ],
  bootstrap: AppComponent
};rxcomp.Browser.bootstrap(AppModule);})));