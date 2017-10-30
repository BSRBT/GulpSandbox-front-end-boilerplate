/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.getScrollBarWidth = getScrollBarWidth;
exports.hasVerticalScroll = hasVerticalScroll;
exports.truncateTextOfElement = truncateTextOfElement;
exports.getHeight = getHeight;
exports.getBreakPoint = getBreakPoint;
exports.blockScroll = blockScroll;
exports.freeScroll = freeScroll;
exports.onClickOut = onClickOut;
exports.isMobile = isMobile;
exports.getCookie = getCookie;
function forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, array[i], i);
  }
}

function getScrollBarWidth() {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);

  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);

  return w1 - w2;
}

function hasVerticalScroll(node) {
  if (node === undefined) {
    if (window.innerHeight) {
      return document.body.offsetHeight > window.innerHeight;
    } else {
      return document.documentElement.scrollHeight > document.documentElement.offsetHeight || document.body.scrollHeight > document.body.offsetHeight;
    }
  } else {
    return node.scrollHeight > node.offsetHeight;
  }
}

function truncateTextOfElement(el, length) {

  if (!el.hasAttribute('data-title')) {
    el.setAttribute('data-title', el.innerHTML);
  }

  if (el.getAttribute('data-title').length < length) {
    el.innerHTML = el.getAttribute('data-title');
    return;
  }

  var trimmedString = el.getAttribute('data-title').substring(0, length);
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...';

  el.innerHTML = trimmedString;
}

/**
 * getHeight - for elements with display:none
 */
function getHeight(el) {
  var el_style = window.getComputedStyle(el),
      el_display = el_style.display,
      el_position = el_style.position,
      el_visibility = el_style.visibility,
      el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
      wanted_height = 0;

  // if its not hidden we just return normal height
  if (el_display !== 'none' && el_max_height !== '0') {
    return el.offsetHeight;
  }

  // the element is hidden so:
  // making the el block so we can meassure its height but still be hidden
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  wanted_height = el.offsetHeight;

  // reverting to the original values
  el.style.display = el_display;
  el.style.position = el_position;
  el.style.visibility = el_visibility;

  return wanted_height;
}

function getBreakPoint(breakpointString) {
  var sideBarWidth = 0;
  var breakpoints = {
    'grid-breakpoints-sm': 480 + sideBarWidth,
    'grid-breakpoints-md': 720 + sideBarWidth,
    'grid-breakpoints-ld': 841 + sideBarWidth,
    'grid-breakpoints-lg': 1041 + sideBarWidth,
    'grid-breakpoints-xl': 1441 + sideBarWidth
  };

  return breakpoints[breakpointString];
}

function blockScroll() {
  var scrollY = window.scrollY //Modern Way (Chrome, Firefox)
  || window.pageYOffset // (Modern IE, including IE11
  || document.documentElement.scrollTop;

  document.documentElement.style.position = 'fixed';
  document.documentElement.style.width = '100%';
  document.documentElement.style.top = -scrollY + 'px';
  document.documentElement.setAttribute('data-scroll-position', scrollY);
}

function freeScroll() {
  var html = document.documentElement;
  html.removeAttribute('style');
  if (html.hasAttribute('data-scroll-position')) {
    window.scrollTo(0, html.getAttribute('data-scroll-position'));
    html.removeAttribute('data-scroll-position');
  }
}

/*
  Custom even to define if a click is outside an element.
 */
function onClickOut(el, elAlt, callback) {
  var outsideClickListener = function outsideClickListener(e) {
    var target = e.target;
    var condition = el !== target && !el.contains(target);

    if (elAlt) {
      condition = el !== target && !el.contains(target) && elAlt !== target && !elAlt.contains(target);
    }

    if (condition) {
      removeClickListener();
      if (typeof callback === 'function') {
        callback();
      }
    }
  };
  var removeClickListener = function removeClickListener() {
    document.removeEventListener('click', outsideClickListener);
    document.removeEventListener('touchstart', outsideClickListener);
  };
  document.addEventListener('click', outsideClickListener);
  document.addEventListener('touchstart', outsideClickListener);
}

/*
  Return yes is device is on iOS or Android
 */
function isMobile() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  var android = /Android/.test(navigator.userAgent) && !window.MSStream;

  return iOS || android;
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = scrollTo;
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b;
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function (t, b, c, d) {
  var tc = (t /= d) * t * t;
  return b + c * tc;
};

Math.inOutQuintic = function (t, b, c, d) {
  var ts = (t /= d) * t,
      tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

function scrollTo(to, callback, duration) {

  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }
  var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
  duration = typeof duration === 'undefined' ? 500 : duration;
  var animateScroll = function animateScroll() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof callback === 'function') {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  animateScroll();
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* flatpickr v3.1.4, @license MIT */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.flatpickr = factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function compareDates(date1, date2, timeless) {
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var getWeek = function (givenDate) {
    var onejan = new Date(givenDate.getFullYear(), 0, 1);
    return Math.ceil(((givenDate.getTime() - onejan.getTime()) / 86400000 +
        onejan.getDay() +
        1) /
        7);
};
var duration = {
    DAY: 86400000,
};

var defaults = {
    _disable: [],
    _enable: [],
    allowInput: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: window && window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enable: [],
    enableSeconds: false,
    enableTime: false,
    getWeek: getWeek,
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
};

var pad = function (number) { return ("0" + number).slice(-2); };
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        timeout !== null && clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
        if (immediate && !timeout)
            func.apply(context, args);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};
function mouseDelta(e) {
    var delta = e.wheelDelta || -e.deltaY;
    return delta >= 0 ? 1 : -1;
}

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    numInput.type = "text";
    numInput.pattern = "\\d*";
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}

var do_nothing = function () { return undefined; };
var revFormat = {
    D: do_nothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM) {
        dateObj.setHours(dateObj.getHours() % 12 + 12 * int(/pm/i.test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum) {
        var weekNumber = parseInt(weekNum);
        return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: do_nothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    w: do_nothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "(am|AM|Am|aM|pm|PM|Pm|pM)",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date) { return (date.getHours() > 11 ? "PM" : "AM"); },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return date.getFullYear(); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

function FlatpickrInstance(element, instanceConfig) {
    var self = {};
    self.parseDate = parseDate;
    self.formatDate = formatDate;
    self._animationLoop = [];
    self._handlers = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar
                    ? self.latestSelectedDateObj || self.config.minDate
                    : undefined);
            }
            updateValue(false);
        }
        self.showTimeInput =
            self.selectedDates.length > 0 || self.config.noCalendar;
        if (self.weekWrapper !== undefined && self.daysContainer !== undefined) {
            self.calendarContainer.style.width =
                self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
        }
        if (!self.isMobile)
            positionCalendar();
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function updateTime(e) {
        if (self.config.noCalendar && !self.selectedDates.length) {
            self.setDate(new Date().setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds), false);
            setHoursFromInputs();
            updateValue();
        }
        timeWrapper(e);
        if (self.selectedDates.length === 0)
            return;
        if (!self.minDateHasTime ||
            e.type !== "input" ||
            e.target.value.length >= 2) {
            setHoursFromInputs();
            updateValue();
        }
        else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, 1000);
        }
    }
    function ampm2military(hour, amPM) {
        return hour % 12 + 12 * int(amPM === "PM");
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined)
            hours = ampm2military(hours, self.amPM.textContent);
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {
            hours = Math.max(hours, self.config.minDate.getHours());
            if (hours === self.config.minDate.getHours())
                minutes = Math.max(minutes, self.config.minDate.getMinutes());
        }
        if (self.config.maxDate &&
            self.maxDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
            hours = Math.min(hours, self.config.maxDate.getHours());
            if (hours === self.config.maxDate.getHours())
                minutes = Math.min(minutes, self.config.maxDate.getMinutes());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date)
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? (12 + hours) % 12 + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = hours >= 12 ? "PM" : "AM";
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var year = parseInt(event.target.value) + (event.delta || 0);
        if (year.toString().length === 4 || event.key === "Enter") {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year.toString()))
                changeYear(year);
        }
    }
    function bind(element, event, handler) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler); });
        element.addEventListener(event, handler);
        self._handlers.push({ element: element, event: event, handler: handler });
    }
    function onClick(handler) {
        return function (evt) { return evt.which === 1 && handler(evt); };
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, 300);
        if (self.config.mode === "range" && self.daysContainer)
            bind(self.daysContainer, "mouseover", function (e) {
                return onMouseOver(e.target);
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.static)
            bind(self._input, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document.body, "touchstart", documentClick);
        bind(window.document.body, "mousedown", onClick(documentClick));
        bind(self._input, "blur", documentClick);
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "mousedown", onClick(self.open));
        }
        if (self.daysContainer !== undefined) {
            self.monthNav.addEventListener("wheel", function (e) { return e.preventDefault(); });
            bind(self.monthNav, "wheel", debounce(onMonthNavScroll, 10));
            bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "mousedown", onClick(selectDate));
            if (self.config.animate) {
                bind(self.daysContainer, ["webkitAnimationEnd", "animationend"], animateDays);
                bind(self.monthNav, ["webkitAnimationEnd", "animationend"], animateMonths);
            }
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return e.target.select();
            };
            bind(self.timeContainer, ["wheel", "input", "increment"], updateTime);
            bind(self.timeContainer, "mousedown", onClick(timeIncrement));
            bind(self.timeContainer, ["wheel", "increment"], self._debouncedChange);
            bind(self.timeContainer, "input", triggerChange);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "mousedown", onClick(function (e) {
                    updateTime(e);
                    triggerChange();
                }));
            }
        }
    }
    function processPostDayAnimation() {
        self._animationLoop.forEach(function (f) { return f(); });
        self._animationLoop = [];
    }
    function animateDays(e) {
        if (self.daysContainer && self.daysContainer.childNodes.length > 1) {
            switch (e.animationName) {
                case "fpSlideLeft":
                    self.daysContainer.lastChild &&
                        self.daysContainer.lastChild.classList.remove("slideLeftNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .firstChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                case "fpSlideRight":
                    self.daysContainer.firstChild &&
                        self.daysContainer.firstChild.classList.remove("slideRightNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .lastChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                default:
                    break;
            }
        }
    }
    function animateMonths(e) {
        switch (e.animationName) {
            case "fpSlideLeftNew":
            case "fpSlideRightNew":
                self.navigationCurrentMonth.classList.remove("slideLeftNew");
                self.navigationCurrentMonth.classList.remove("slideRightNew");
                var nav = self.navigationCurrentMonth;
                while (nav.nextSibling &&
                    /curr/.test(nav.nextSibling.className))
                    self.monthNav.removeChild(nav.nextSibling);
                while (nav.previousSibling &&
                    /curr/.test(nav.previousSibling.className))
                    self.monthNav.removeChild(nav.previousSibling);
                self.oldCurMonth = undefined;
                break;
        }
    }
    function jumpToDate(jumpDate) {
        var jumpTo = jumpDate !== undefined
            ? parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            console.error(e.stack);
            console.warn("Invalid date supplied: " + jumpTo);
        }
        self.redraw();
    }
    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow"))
            incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && e.target;
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline && !customAppend && self.element.parentNode) {
                self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0]) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        }
        else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] &&
                self.minRangeDate &&
                date > self.minRangeDate &&
                date < self.selectedDates[0])
                self.minRangeDate = date;
            else if (self.selectedDates[0] &&
                self.maxRangeDate &&
                date < self.maxRangeDate &&
                date > self.selectedDates[0])
                self.maxRangeDate = date;
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
            if (self.selectedDates.length === 1 &&
                self.minRangeDate !== undefined &&
                self.maxRangeDate !== undefined &&
                (date < self.minRangeDate || date > self.maxRangeDate))
                dayElement.classList.add("notAllowed");
        }
        if (self.weekNumbers &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" +
                self.config.getWeek(date) +
                "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0, targetNode = (currentIndex !== undefined
            ? self.days.childNodes[newIndex]
            : self.selectedDateElem ||
                self.todayDateElem ||
                self.days.childNodes[0]);
        var focus = function () {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        };
        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1, true, undefined, true);
                newIndex = newIndex % 42;
            }
            else if (offset < 0) {
                self.changeMonth(-1, true, undefined, true);
                newIndex += 42;
            }
            return afterDayAnim(focus);
        }
        focus();
    }
    function afterDayAnim(fn) {
        self.config.animate === true ? self._animationLoop.push(fn) : fn();
    }
    function buildDays(delta) {
        if (self.daysContainer === undefined) {
            return;
        }
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() -
            self.l10n.firstDayOfWeek +
            7) %
            7, isRangeMode = self.config.mode === "range";
        var prevMonthDays = self.utils.getDaysInMonth((self.currentMonth - 1 + 12) % 12);
        var daysInMonth = self.utils.getDaysInMonth(), days = window.document.createDocumentFragment();
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        if (self.weekNumbers && self.weekNumbers.firstChild)
            self.weekNumbers.textContent = "";
        if (isRangeMode) {
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow =
                self._hidePrevMonthArrow ||
                    (!!self.minRangeDate &&
                        self.minRangeDate > days.childNodes[0].dateObj);
            self._hideNextMonthArrow =
                self._hideNextMonthArrow ||
                    (!!self.maxRangeDate &&
                        self.maxRangeDate <
                            new Date(self.currentYear, self.currentMonth + 1, 1));
        }
        else
            updateNavigationCurrentMonth();
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        if (!self.config.animate || delta === undefined)
            clearNode(self.daysContainer);
        else {
            while (self.daysContainer.childNodes.length > 1)
                self.daysContainer.removeChild(self.daysContainer.firstChild);
        }
        if (delta && delta >= 0)
            self.daysContainer.appendChild(dayContainer);
        else
            self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
        self.days = self.daysContainer.childNodes[0];
    }
    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.currentMonthElement = createElement("span", "cur-month");
        self.currentMonthElement.title = self.l10n.scrollTitle;
        var yearInput = createNumberInput("cur-year");
        self.currentYearElement = yearInput.childNodes[0];
        self.currentYearElement.title = self.l10n.scrollTitle;
        if (self.config.minDate)
            self.currentYearElement.min = self.config.minDate
                .getFullYear()
                .toString();
        if (self.config.maxDate) {
            self.currentYearElement.max = self.config.maxDate
                .getFullYear()
                .toString();
            self.currentYearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        self.navigationCurrentMonth = createElement("span", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool)
                    self.prevMonthNav.style.display = bool ? "none" : "block";
                self.__hidePrevMonthArrow = bool;
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool)
                    self.nextMonthNav.style.display = bool ? "none" : "block";
                self.__hideNextMonthArrow = bool;
            },
        });
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];
        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? self.config.defaultHour
                : military2ampm(self.config.defaultHour));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : self.config.defaultMinute);
        self.hourElement.step = self.config.hourIncrement.toString();
        self.minuteElement.step = self.config.minuteIncrement.toString();
        self.hourElement.min = self.config.time_24hr ? "0" : "1";
        self.hourElement.max = self.config.time_24hr ? "23" : "12";
        self.minuteElement.min = "0";
        self.minuteElement.max = "59";
        self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : self.config.defaultSeconds);
            self.secondElement.step = self.minuteElement.step;
            self.secondElement.min = self.minuteElement.min;
            self.secondElement.max = self.minuteElement.max;
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
        }
        self.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + weekdays.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ";
        return self.weekdayContainer;
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, is_offset, animate, from_keyboard) {
        if (is_offset === void 0) { is_offset = true; }
        if (animate === void 0) { animate = self.config.animate; }
        if (from_keyboard === void 0) { from_keyboard = false; }
        var delta = is_offset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow) ||
            (delta > 0 && self._hideNextMonthArrow))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
        }
        buildDays(animate ? delta : undefined);
        if (!animate) {
            triggerEvent("onMonthChange");
            return updateNavigationCurrentMonth();
        }
        var nav = self.navigationCurrentMonth;
        if (delta < 0) {
            while (nav.nextSibling &&
                /curr/.test(nav.nextSibling.className))
                self.monthNav.removeChild(nav.nextSibling);
        }
        else if (delta > 0) {
            while (nav.previousSibling &&
                /curr/.test(nav.previousSibling.className))
                self.monthNav.removeChild(nav.previousSibling);
        }
        self.oldCurMonth = self.navigationCurrentMonth;
        self.navigationCurrentMonth = self.monthNav.insertBefore(self.oldCurMonth.cloneNode(true), delta > 0 ? self.oldCurMonth.nextSibling : self.oldCurMonth);
        var daysContainer = self.daysContainer;
        if (daysContainer.firstChild && daysContainer.lastChild) {
            if (delta > 0) {
                daysContainer.firstChild.classList.add("slideLeft");
                daysContainer.lastChild.classList.add("slideLeftNew");
                self.oldCurMonth.classList.add("slideLeft");
                self.navigationCurrentMonth.classList.add("slideLeftNew");
            }
            else if (delta < 0) {
                daysContainer.firstChild.classList.add("slideRightNew");
                daysContainer.lastChild.classList.add("slideRight");
                self.oldCurMonth.classList.add("slideRight");
                self.navigationCurrentMonth.classList.add("slideRightNew");
            }
        }
        self.currentMonthElement = self.navigationCurrentMonth
            .firstChild;
        self.currentYearElement = self.navigationCurrentMonth.lastChild
            .childNodes[0];
        updateNavigationCurrentMonth();
        if (self.oldCurMonth.firstChild)
            self.oldCurMonth.firstChild.textContent = monthToStr(self.currentMonth - delta, self.config.shorthandCurrentMonth, self.l10n);
        triggerEvent("onMonthChange");
        if (from_keyboard &&
            document.activeElement &&
            document.activeElement.$i) {
            var index_1 = document.activeElement.$i;
            afterDayAnim(function () {
                focusOnDay(index_1, 0);
            });
        }
    }
    function clear(triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        self.input.value = "";
        if (self.altInput)
            self.altInput.value = "";
        if (self.mobileInput)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        self.showTimeInput = false;
        self.redraw();
        if (triggerChangeEvent === true)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            self._input.classList.remove("active");
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            var h = self._handlers[i];
            h.element.removeEventListener(h.event, h.handler);
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode)
            self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
            self.input.value = "";
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input ||
                e.target === self.altInput ||
                self.element.contains(e.target) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput && !isCalendarElement;
            if (lostFocus &&
                self.config.ignoredFocusElements.indexOf(e.target) === -1) {
                self.close();
                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.currentYearElement.min &&
                newYear < parseInt(self.currentYearElement.min)) ||
            (self.currentYearElement.max &&
                newYear > parseInt(self.currentYearElement.max)))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
        }
    }
    function isEnabled(date, timeless) {
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable.length && !self.config.disable.length)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string" && dateToCheck !== undefined) {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function onKeyDown(e) {
        var isInput = e.target === self._input;
        var calendarElem = isCalendarElem(e.target);
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.key === "Enter" && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return e.target.blur();
            }
            else
                self.open();
        }
        else if (calendarElem || allowKeydown || allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(e.target);
            switch (e.key) {
                case "Enter":
                    if (isTimeObj)
                        updateValue();
                    else
                        selectDate(e);
                    break;
                case "Escape":
                    e.preventDefault();
                    self.close();
                    break;
                case "Backspace":
                case "Delete":
                    if (isInput && !self.config.allowInput)
                        self.clear();
                    break;
                case "ArrowLeft":
                case "ArrowRight":
                    if (!isTimeObj) {
                        e.preventDefault();
                        if (self.daysContainer) {
                            var delta_1 = e.key === "ArrowRight" ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(e.target.$i, delta_1);
                            else
                                changeMonth(delta_1, true, undefined, true);
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    e.preventDefault();
                    var delta = e.key === "ArrowDown" ? 1 : -1;
                    if (self.daysContainer && e.target.$i !== undefined) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(e.target.$i, delta * 7);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case "Tab":
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    }
                    else if (e.target === self.minuteElement &&
                        (self.secondElement || self.amPM)) {
                        e.preventDefault();
                        if (self.secondElement !== undefined)
                            self.secondElement.focus();
                        else if (self.amPM !== undefined)
                            self.amPM.focus();
                    }
                    else if (e.target === self.secondElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }
                    break;
                case "a":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "AM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                case "p":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "PM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                default:
                    break;
            }
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            !elem.classList.contains("flatpickr-day") ||
            self.minRangeDate === undefined ||
            self.maxRangeDate === undefined)
            return;
        var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], undefined, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }
        var _loop_1 = function (timestamp, i) {
            var outOfRange = timestamp < self.minRangeDate.getTime() ||
                timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            }
            else if (containsDisabled && !outOfRange)
                return "continue";
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("startRange");
            else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("endRange");
            if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                dayElem.classList.add("inRange");
        };
        for (var timestamp = self.days.childNodes[0].dateObj.getTime(), i = 0; i < 42; i++, timestamp += duration.DAY) {
            _loop_1(timestamp, i);
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._input; }
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target && e.target.blur();
            }
            setTimeout(function () {
                self.mobileInput !== undefined && self.mobileInput.click();
            }, 0);
            triggerEvent("onOpen");
            return;
        }
        if (self.isOpen || self._input.disabled || self.config.inline)
            return;
        self.isOpen = true;
        self.calendarContainer.classList.add("open");
        positionCalendar(positionElement);
        self._input.classList.add("active");
        triggerEvent("onOpen");
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var hooks = [
            "onChange",
            "onClose",
            "onDayCreate",
            "onDestroy",
            "onKeyDown",
            "onMonthChange",
            "onOpen",
            "onParseConfig",
            "onReady",
            "onValueUpdate",
            "onYearChange",
        ];
        self.config = __assign({}, flatpickr.defaultConfig);
        var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
        var formats$$1 = {};
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable || []; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable || []; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        if (!userConfig.dateFormat && userConfig.enableTime) {
            formats$$1.dateFormat = userConfig.noCalendar
                ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                : flatpickr.defaultConfig.dateFormat +
                    " H:i" +
                    (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            formats$$1.altFormat = userConfig.noCalendar
                ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                : flatpickr.defaultConfig.altFormat +
                    (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        Object.assign(self.config, formats$$1, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        for (var i = hooks.length; i--;) {
            if (self.config[hooks[i]] !== undefined) {
                self.config[hooks[i]] = arrayify(self.config[hooks[i]] || []).map(bindToInstance);
            }
        }
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (~hooks.indexOf(key)) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable.length &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        triggerEvent("onParseConfig");
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            console.warn("flatpickr: invalid locale " + self.config.locale);
        self.l10n = __assign({}, flatpickr.l10ns.default, typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined);
    }
    function positionCalendar(positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.calendarContainer === undefined)
            return;
        var calendarHeight = self.calendarContainer.offsetHeight, calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" ||
            (configPos !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(e.target, isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2)
                self.clear();
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear)
                triggerEvent("onYearChange");
            triggerEvent("onMonthChange");
        }
        buildDays();
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.config.enableTime &&
            compareDates(selectedDate, self.config.minDate) === 0)
            setHoursFromDate(self.config.minDate);
        updateValue();
        if (self.config.enableTime)
            setTimeout(function () { return (self.showTimeInput = true); }, 50);
        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(target);
                self._hidePrevMonthArrow =
                    self._hidePrevMonthArrow ||
                        (self.minRangeDate !== undefined &&
                            self.minRangeDate >
                                self.days.childNodes[0].dateObj);
                self._hideNextMonthArrow =
                    self._hideNextMonthArrow ||
                        (self.maxRangeDate !== undefined &&
                            self.maxRangeDate <
                                new Date(self.currentYear, self.currentMonth + 1, 1));
            }
            else
                updateNavigationCurrentMonth();
        }
        triggerEvent("onChange");
        if (!shouldChangeMonth)
            focusOnDay(target.$i, 0);
        else
            afterDayAnim(function () { return self.selectedDateElem && self.selectedDateElem.focus(); });
        if (self.hourElement !== undefined)
            setTimeout(function () { return self.hourElement !== undefined && self.hourElement.select(); }, 451);
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range)
                self.close();
        }
    }
    function set(option, value) {
        if (option !== null && typeof option === "object")
            Object.assign(self.config, option);
        else
            self.config[option] = value;
        self.redraw();
        jumpToDate();
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split("; ")
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
        self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = undefined; }
        if (date !== 0 && !date)
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];
        self.redraw();
        jumpToDate();
        setHoursFromDate();
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = new Date();
        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        var initialDate = self.selectedDates.length
            ? self.selectedDates[0]
            : self.config.minDate &&
                self.config.minDate.getTime() > self.now.getTime()
                ? self.config.minDate
                : self.config.maxDate &&
                    self.config.maxDate.getTime() < self.now.getTime()
                    ? self.config.maxDate
                    : self.now;
        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();
        if (self.selectedDates.length)
            self.latestSelectedDateObj = self.selectedDates[0];
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
        Object.defineProperty(self, "showTimeInput", {
            get: function () { return self._showTimeInput; },
            set: function (bool) {
                self._showTimeInput = bool;
                if (self.calendarContainer)
                    toggleClass(self.calendarContainer, "showTimeInput", bool);
                positionCalendar();
            },
        });
    }
    function formatDate(dateObj, frmt) {
        if (self.config !== undefined && self.config.formatDate !== undefined)
            return self.config.formatDate(dateObj, frmt);
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, self.l10n, self.config)
                : c !== "\\" ? c : "";
        })
            .join("");
    }
    function parseDate(date, givenFormat, timeless) {
        if (date !== 0 && !date)
            return undefined;
        var parsedDate;
        var date_orig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (self.config || flatpickr.defaultConfig).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr))
                parsedDate = new Date(date);
            else if (self.config && self.config.parseDate)
                parsedDate = self.config.parseDate(date, format);
            else {
                parsedDate =
                    !self.config || !self.config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate =
                            fn(parsedDate, val, self.l10n) || parsedDate);
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date)) {
            console.warn("flatpickr: invalid date " + date_orig);
            console.info(self.element);
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    }
    function setupInputs() {
        self.input = self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
        if (!self.input) {
            console.warn("Error: invalid input element specified", self.input);
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.type = "text";
            self.input.type = "hidden";
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar ? "time" : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = self.input.getAttribute("step") || "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date" ? "Y-m-d" : "H:i:S";
        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        self.mobileInput.addEventListener("change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle() {
        if (self.isOpen)
            return self.close();
        self.open();
    }
    function triggerEvent(event, data) {
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.currentMonthElement.textContent =
            monthToStr(self.currentMonth, self.config.shorthandCurrentMonth, self.l10n) + " ";
        self.currentYearElement.value = self.currentYear.toString();
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (!self.selectedDates.length)
            return self.clear(triggerChange);
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        var joinChar = self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator;
        self.input.value = self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, self.config.dateFormat); })
            .join(joinChar);
        if (self.altInput !== undefined) {
            self.altInput.value = self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, self.config.altFormat); })
                .join(joinChar);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavScroll(e) {
        e.preventDefault();
        var isYear = self.currentYearElement.parentNode &&
            self.currentYearElement.parentNode.contains(e.target);
        if (e.target === self.currentMonthElement || isYear) {
            var delta = mouseDelta(e);
            if (isYear) {
                changeYear(self.currentYear + delta);
                e.target.value = self.currentYear.toString();
            }
            else
                self.changeMonth(delta, true, false);
        }
    }
    function onMonthNavClick(e) {
        var isPrevMonth = self.prevMonthNav.contains(e.target);
        var isNextMonth = self.nextMonthNav.contains(e.target);
        if (isPrevMonth || isNextMonth)
            changeMonth(isPrevMonth ? -1 : 1);
        else if (e.target === self.currentYearElement) {
            e.preventDefault();
            self.currentYearElement.select();
        }
        else if (e.target.className === "arrowUp")
            self.changeYear(self.currentYear + 1);
        else if (e.target.className === "arrowDown")
            self.changeYear(self.currentYear - 1);
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", input = e.target;
        if (self.amPM !== undefined && e.target === self.amPM)
            self.amPM.textContent =
                self.l10n.amPM[self.amPM.textContent === "AM" ? 1 : 0];
        var min = Number(input.min), max = Number(input.max), step = Number(input.step), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown
                ? e.which === 38 ? 1 : -1
                : Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step))
                self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList);
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.warn(e, e.stack);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr;
flatpickr = function (selector, config) {
    if (selector instanceof NodeList)
        return _flatpickr(selector, config);
    else if (typeof selector === "string")
        return _flatpickr(window.document.querySelectorAll(selector), config);
    return _flatpickr([selector], config);
};
window.flatpickr = flatpickr;
flatpickr.defaultConfig = defaults;
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign({}, flatpickr.l10ns.default, l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
};
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
var flatpickr$1 = flatpickr;

return flatpickr$1;

})));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = function () {
  function Dropdown(el) {
    var _this = this;

    var mobileEnable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Dropdown);

    this.el = el;
    this.label = el.querySelector('.ds-filter-dropdown__label');
    this.head = el.querySelector('.ds-filter-dropdown__head');
    this.counter = el.querySelector('.ds-filter-dropdown__counter');
    this.resetBtn = el.querySelector('.ds-ico-close-mini');
    this.inputs = el.querySelectorAll('input');
    this.listContainer = el.querySelector('.ds-filter-dropdown__list');
    this.labelDefault = this.label.textContent;
    this.breakpointMobile = (0, _ds.getBreakPoint)('grid-breakpoints-md');
    this.isMoreDropdown = el.classList.contains('ds-filter-dropdown--more') ? true : false;
    this.isRadio = el.classList.contains('ds-filter-dropdown--radio') ? true : false;
    this.counterVisibleFrom = this.isMoreDropdown ? 1 : 2;
    this.mobileEnable = mobileEnable;

    this.head.addEventListener('click', function () {
      return _this.toggleDropdown();
    });
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', function () {
        return _this.reset();
      });
    }
    (0, _ds.forEach)(this.inputs, function (input) {
      input.addEventListener('change', function () {
        return _this.inputOnChange(input);
      });
      _this.inputOnChange(input); // Set default value
    });
  }

  _createClass(Dropdown, [{
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      if (this.el.classList.contains('is-open')) {
        this.hideDropdown();
      } else {
        var visibleDropdown = document.querySelectorAll('.ds-filter-dropdown.is-open');
        (0, _ds.forEach)(visibleDropdown, function (el) {
          el.classList.remove('is-open');
        });
        this.showDropdown();
      }
    }
  }, {
    key: 'hideDropdown',
    value: function hideDropdown() {
      this.el.classList.remove('is-open');
    }
  }, {
    key: 'showDropdown',
    value: function showDropdown() {
      var _this2 = this;

      this.el.classList.add('is-open');
      this.setDropdownPosition();
      (0, _ds.onClickOut)(this.el, this.listContainer, function () {
        _this2.hideDropdown();
      });
    }
  }, {
    key: 'setDropdownPosition',
    value: function setDropdownPosition() {
      this.listContainer.style.left = '';
      var size = this.listContainer.getBoundingClientRect();
      if (size.right >= window.innerWidth) {
        this.listContainer.style.left = window.innerWidth - size.right - 48 + 'px';
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      (0, _ds.forEach)(this.inputs, function (input) {
        input.checked = false;
      });
      this.label.textContent = this.labelDefault;
      this.el.classList.remove('is-active');
      this.el.classList.remove('has-counter');
      this.hideDropdown();
    }
  }, {
    key: 'inputOnChange',
    value: function inputOnChange(input) {
      if (window.innerWidth < this.breakpointMobile && !this.mobileEnable) {
        return false;
      }
      if (input.type === 'radio' && input.checked) {
        this.label.textContent = this.getInputLabel(input);
        this.hideDropdown();
      } else if (input.type === 'checkbox') {
        this.updateLabelDropdownCheckbox();
      }
    }
  }, {
    key: 'getInputLabel',
    value: function getInputLabel(input) {
      var inputLabel = document.querySelector('[for=' + input.id + ']');
      return inputLabel.textContent;
    }
  }, {
    key: 'getInputChecked',
    value: function getInputChecked() {
      var inputsChecked = [];
      (0, _ds.forEach)(this.inputs, function (input) {
        if (input.checked) {
          inputsChecked.push(input);
        }
      });
      return inputsChecked;
    }
  }, {
    key: 'updateLabelDropdownRadio',
    value: function updateLabelDropdownRadio() {
      var _this3 = this;

      (0, _ds.forEach)(this.inputs, function (input) {
        _this3.inputOnChange(input);
      });
    }
  }, {
    key: 'updateLabelDropdownCheckbox',
    value: function updateLabelDropdownCheckbox() {
      var inputsChecked = this.getInputChecked();
      var counter = inputsChecked.length;
      this.counter.textContent = counter;
      this.el.classList.add('is-active');
      if (counter === 0) {
        this.label.textContent = this.labelDefault;
        this.el.classList.remove('is-active');
      } else if (counter === 1 && !this.isMoreDropdown) {
        this.label.textContent = this.getInputLabel(inputsChecked[0]);
      } else {
        this.label.textContent = this.labelDefault;
      }

      // Show counter
      if (counter >= this.counterVisibleFrom) {
        this.el.classList.add('has-counter');
      } else {
        this.el.classList.remove('has-counter');
      }
      this.setDropdownPosition();
    }
  }, {
    key: 'updateLabel',
    value: function updateLabel() {
      if (this.isRadio) {
        this.updateLabelDropdownRadio();
      } else {
        this.updateLabelDropdownCheckbox();
      }
    }
  }, {
    key: 'resetLabel',
    value: function resetLabel() {
      this.label.textContent = this.labelDefault;
    }
  }]);

  return Dropdown;
}();

exports.default = Dropdown;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
;(function () {
    // helpers
    var regExp = function regExp(name) {
        return new RegExp('(^| )' + name + '( |$)');
    };
    var forEach = function forEach(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };

    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function add() {
            forEach(arguments, function (name) {
                if (!this.contains(name)) {
                    this.element.className += this.element.className.length > 0 ? ' ' + name : name;
                }
            }, this);
        },
        remove: function remove() {
            forEach(arguments, function (name) {
                this.element.className = this.element.className.replace(regExp(name), ' ');
            }, this);
        },
        toggle: function toggle(name) {
            return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function contains(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus..
        replace: function replace(oldName, newName) {
            this.remove(oldName);
            this.add(newName);
        }
    };

    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function get() {
                return new ClassList(this);
            }
        });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace === null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


;(function () {
  if (typeof window.CustomEvent === "function") {
    return false; //If not IE
  }

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ds = __webpack_require__(0);

var _ds2 = __webpack_require__(8);

var _ds3 = _interopRequireDefault(_ds2);

var _ds4 = __webpack_require__(9);

var _ds5 = _interopRequireDefault(_ds4);

var _ds6 = __webpack_require__(10);

var _ds7 = _interopRequireDefault(_ds6);

var _ds8 = __webpack_require__(11);

var _ds9 = _interopRequireDefault(_ds8);

var _ds10 = __webpack_require__(12);

var _ds11 = _interopRequireDefault(_ds10);

var _ds12 = __webpack_require__(13);

var _ds13 = _interopRequireDefault(_ds12);

var _ds14 = __webpack_require__(14);

var _ds15 = _interopRequireDefault(_ds14);

var _ds16 = __webpack_require__(15);

var _ds17 = _interopRequireDefault(_ds16);

var _ds18 = __webpack_require__(16);

var _ds19 = _interopRequireDefault(_ds18);

var _ds20 = __webpack_require__(17);

var _ds21 = _interopRequireDefault(_ds20);

var _ds22 = __webpack_require__(20);

var _ds23 = _interopRequireDefault(_ds22);

var _ds24 = __webpack_require__(21);

var _ds25 = _interopRequireDefault(_ds24);

var _ds26 = __webpack_require__(22);

var _ds27 = _interopRequireDefault(_ds26);

var _ds28 = __webpack_require__(23);

var _ds29 = _interopRequireDefault(_ds28);

var _ds30 = __webpack_require__(25);

var _ds31 = _interopRequireDefault(_ds30);

var _ds32 = __webpack_require__(26);

var _ds33 = _interopRequireDefault(_ds32);

var _ds34 = __webpack_require__(27);

var _ds35 = _interopRequireDefault(_ds34);

var _ds36 = __webpack_require__(28);

var _ds37 = _interopRequireDefault(_ds36);

var _ds38 = __webpack_require__(30);

var _ds39 = _interopRequireDefault(_ds38);

var _vanillaLazyload = __webpack_require__(34);

var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  var footer = new _ds5.default();
  var header = new _ds21.default();
  var banner = new _ds19.default();
  var breadcrumb = new _ds11.default();
  var filter = new _ds39.default();
  var cardResizer = new _ds3.default();
  var language = new _ds25.default();

  var tooltip = new _ds23.default();
  var picker = new _ds37.default();
  var input = new _ds27.default();
  var search = new _ds29.default();
  var counter = new _ds31.default();
  var select = new _ds33.default();
  var videoPlayer = new _ds13.default();

  var myLazyLoad = new _vanillaLazyload2.default({ elements_selector: ".ds-lazy" });

  // Need to create a few instances for the demo with 8 branded menu.
  (0, _ds.forEach)(document.querySelectorAll('.ds-menu'), function (el) {
    var menu = new _ds7.default(el);
  });
  (0, _ds.forEach)(document.querySelectorAll('.js-vplayer'), function (el) {
    var youtubePlayer = new _ds15.default(el);
  });
  (0, _ds.forEach)(document.querySelectorAll('.ds-highlight'), function (el) {
    var highlight = new _ds17.default(el);
  });
  (0, _ds.forEach)(document.querySelectorAll('.ds-sharing'), function (el) {
    var sharing = new _ds9.default(el);
  });
  (0, _ds.forEach)(document.querySelectorAll('.ds-select--checkbox'), function (el) {
    var multiSelect = new _ds35.default(el);
  });
}

window.uikit = {
  'init': init,
  'Select': _ds33.default,
  'MultiSelect': _ds35.default,
  'Input': _ds27.default,
  'Filter': _ds39.default,
  'Counter': _ds31.default,
  'Search': _ds29.default,
  'Share': _ds9.default,
  'YoutubeVideo': _ds15.default,
  'VideoPlayer': _ds13.default,
  'Tooltip': _ds23.default,
  'Picker': _ds37.default,
  'CardResizer': _ds3.default,
  'LazyLoad': _vanillaLazyload2.default,
  'Language': _ds25.default
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardResizer = function () {
  function CardResizer() {
    var _this = this;

    _classCallCheck(this, CardResizer);

    this.delay = 250; // delay between calls
    this.throttled = false; // are we currently throttled?

    this.resizeCardTitle();
    window.addEventListener('resize', function (e) {
      return _this.resizeEventThrottled(e);
    });
  }

  _createClass(CardResizer, [{
    key: 'resizeCardTitle',
    value: function resizeCardTitle() {
      var _this2 = this;

      (0, _ds.forEach)(document.querySelectorAll('.ds-card'), function (el) {
        var cardTitle = el.querySelector('h4');

        if (el.offsetWidth < 320) {
          _this2.nbChar = 34;
        } else {
          _this2.nbChar = 200;
        }
        (0, _ds.truncateTextOfElement)(cardTitle, _this2.nbChar);

        var cardDesc = el.querySelector('p');

        if (cardDesc !== null) {
          if (el.offsetWidth < 320) {
            _this2.nbChar = 85;
          } else {
            _this2.nbChar = 228;
          }
          (0, _ds.truncateTextOfElement)(cardDesc, _this2.nbChar);
        }
      });
    }
  }, {
    key: 'resizeEventThrottled',
    value: function resizeEventThrottled(e) {
      var _this3 = this;

      // only run if we're not throttled
      if (!this.throttled) {
        // actual callback action
        this.resizeCardTitle();
        // we're throttled!
        this.throttled = true;
        // set a timeout to un-throttle
        setTimeout(function () {
          _this3.throttled = false;
        }, this.delay);
      }
    }
  }]);

  return CardResizer;
}();

exports.default = CardResizer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Footer = function () {
  function Footer() {
    var _this = this;

    _classCallCheck(this, Footer);

    (0, _ds.forEach)(document.querySelectorAll('.ds-footer__links h5'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.toggleAccordion(e);
      });
    });
  }

  _createClass(Footer, [{
    key: 'toggleAccordion',
    value: function toggleAccordion(e) {
      var target = e.currentTarget;
      var targetParent = target.parentNode.querySelector('.ds-footer__slide-wrapper');

      //the whole things seems complicated for an accordion only but it's only because we dont use
      //jQuery. So no toggleFade...
      if (target.parentNode.classList.contains('is-open')) {
        target.parentNode.classList.remove('is-open');
        targetParent.style.height = '';
      } else {
        var $openLink = document.querySelector('.ds-footer__links .is-open');

        if ($openLink) {
          $openLink.classList.remove('is-open');
          $openLink.querySelector('.ds-footer__slide-wrapper').style.height = '';
        }
        target.parentNode.classList.add('is-open');
        //the 18 value stands for a weird ul margin-bottom that I can not for a no understandable reason...
        targetParent.style.height = targetParent.querySelector('ul').offsetHeight + 18 + 'px';
      }
    }
  }]);

  return Footer;
}();

exports.default = Footer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
  function Menu(el) {
    _classCallCheck(this, Menu);

    this.$menu = typeof el !== 'undefined' ? el : document.querySelector('.ds-menu');
    this.$header = document.querySelector('.ds-g-menu');
    this.lastScrollPosition = 0;
    this.scrollPositionAtLastChange = 0;

    this.bodyHandler = function (e) {
      this.reInitMenu(e);
    }.bind(this);

    this.stopProgagationHandler = function (e) {
      e.stopPropagation();
    }.bind(this);

    if (this.$menu) {
      this.setEvent();
    }
  }

  _createClass(Menu, [{
    key: 'setEvent',
    value: function setEvent() {
      var _this = this;

      this.$menu.querySelector('.ds-menu__title').addEventListener('click', function (e) {
        return _this.showNavigation(e);
      });
      (0, _ds.forEach)(this.$menu.querySelectorAll('.ds-menu__dropdown'), function (el) {
        el.addEventListener('click', function (e) {
          return _this.showDropdown(e);
        });
      });

      window.addEventListener('scroll', function (e) {
        return _this.stickyMenu(e);
      });
      window.addEventListener('resize', function (e) {
        return _this.reInitDropdown(e);
      });

      document.addEventListener('gmenuopen', function (e) {
        _this.reInitMenu();
      });

      //for ie9...
      setTimeout(function (e) {
        _this.$menu.classList.toggle('ie-fix');
      }, 250);
    }
  }, {
    key: 'showNavigation',
    value: function showNavigation(e) {
      var menuBoundingRect = this.$menu.getBoundingClientRect();
      this.$menu.classList.toggle('is-open');

      if (window.innerWidth < (0, _ds.getBreakPoint)('grid-breakpoints-lg') && this.$menu.classList.contains('is-open')) {
        (0, _ds.blockScroll)();

        //if the menu is not sticky it means that it is just under the header if the header exist, so the behaviour when open is different
        var header = document.querySelector('.ds-g-menu');
        if (!this.$menu.classList.contains('ds-menu--sticky') && header) {
          this.$menu.style.top = menuBoundingRect.top + 'px';
          this.$menu.style.height = this.$menu.offsetHeight - menuBoundingRect.top + 'px';
        }
      } else {
        document.body.removeAttribute('style');
        (0, _ds.freeScroll)();

        this.$menu.removeAttribute('style');

        this.reInitMenu();
      }
    }
  }, {
    key: 'showDropdown',
    value: function showDropdown(e) {
      var _this2 = this;

      e.preventDefault();
      e.stopPropagation();

      var target = e.currentTarget;

      //remove all visible and open for dropdown
      (0, _ds.forEach)(document.querySelectorAll('.ds-menu__dropdown'), function (el) {
        if (el !== target) {
          el.classList.remove('is-open');
          el.nextElementSibling.classList.remove('is-visible');
          _this2.$menu.classList.remove('is-open');
        }
      });

      //adding visible only to the one clicked
      document.querySelector('.ds-menu__links').classList.toggle('is-open');
      target.classList.toggle('is-open');
      target.nextElementSibling.classList.toggle('is-visible');
      this.$menu.classList.toggle('is-open');
      this.setDropdownPosition(target.nextElementSibling);

      //in desktop mode when we click everywhere else, the menu dropdown closes
      if (window.innerWidth >= (0, _ds.getBreakPoint)('grid-breakpoints-lg')) {
        target.nextElementSibling.addEventListener('click', this.stopProgagationHandler);
        document.body.addEventListener('click', this.bodyHandler);
      }

      //if at the end nothing is visible/closed, then let the menu take back his previous behaviour
      var backToOldBehavior = true;
      (0, _ds.forEach)(document.querySelectorAll('.ds-menu__dropdown'), function (el) {
        if (el.classList.contains('is-open')) {
          backToOldBehavior = false;
        }
      });

      if (backToOldBehavior) {
        document.querySelector('.ds-menu__links').classList.remove('is-open');
        if (window.innerWidth >= (0, _ds.getBreakPoint)('grid-breakpoints-lg')) {
          this.$menu.classList.remove('is-open');
        }
      }
    }
  }, {
    key: 'setDropdownPosition',
    value: function setDropdownPosition(el) {
      el.style.left = '';
      var size = el.getBoundingClientRect();
      if (size.right >= window.innerWidth) {
        el.style.left = window.innerWidth - size.right - 80 + 'px';
      }
    }
  }, {
    key: 'stickyMenu',
    value: function stickyMenu(e) {
      var _this3 = this;

      var scrollY = window.scrollY //Modern Way (Chrome, Firefox)
      || window.pageYOffset // (Modern IE, including IE11
      || document.documentElement.scrollTop;

      //if the menu is open, we want the sticky to remain.
      if (this.$menu.classList.contains('is-open')) {
        if (document.documentElement.style.position !== 'fixed' && scrollY <= window.innerHeight / 4) {
          this.reInitMenu(e);
        }
        return;
      }

      if (scrollY < this.lastScrollPosition && this.scrollPositionAtLastChange === 0) {
        this.scrollPositionAtLastChange = this.lastScrollPosition;
      }

      if (scrollY > this.lastScrollPosition && this.scrollPositionAtLastChange !== 0) {
        this.scrollPositionAtLastChange = 0;
      }

      var delta = this.scrollPositionAtLastChange - scrollY;

      if (this.$header && scrollY <= this.$header.offsetHeight) {
        this.removeSticky();
        this.removeDown();
      } else if (scrollY > window.innerHeight / 4) {

        if (!this.$menu.classList.contains('ds-menu--sticky')) {
          this.$menu.style.transform = "translateY(-100%)";
          //this.reInitMenu();

          //the setTimeout is here to avoid the first css transition.
          setTimeout(function (e) {
            _this3.addSticky();
            _this3.$menu.style.transform = "";
          }, 10);
        }
      }

      if (this.$menu.classList.contains('ds-menu--sticky')) {
        if (delta > 30) {
          this.$menu.classList.add('ds-menu--down');
          this.addDown();
        } else {
          this.removeDown();
          //this.reInitMenu();
        }
      }

      this.lastScrollPosition = scrollY;
    }
  }, {
    key: 'reInitDropdown',
    value: function reInitDropdown(e) {
      if (window.innerWidth >= (0, _ds.getBreakPoint)('grid-breakpoints-lg')) {
        (0, _ds.forEach)(this.$menu.querySelectorAll('.ds-menu__dropdown'), function (el) {
          el.nextElementSibling.removeAttribute('style');
        });

        this.reInitMenu();
      }
    }
  }, {
    key: 'reInitMenu',
    value: function reInitMenu(e) {
      (0, _ds.forEach)(this.$menu.querySelectorAll('ul ul'), function (el) {
        el.classList.remove('is-visible');
      });

      this.$menu.classList.remove('is-open');

      (0, _ds.forEach)(document.querySelectorAll('.ds-menu__dropdown'), function (el) {
        el.classList.remove('is-open');
        el.nextElementSibling.classList.remove('is-visible');

        //if(window.innerWidth < getBreakPoint('grid-breakpoints-lg'))
        //slideUp(el.nextElementSibling);
      });

      (0, _ds.freeScroll)();

      document.body.removeAttribute('style');
      this.$menu.removeAttribute('style');
      document.body.removeEventListener('click', this.bodyHandler);
    }
  }, {
    key: 'addSticky',
    value: function addSticky(e) {
      this.$menu.classList.add('ds-menu--sticky');
      //this.$menu.dispatchEvent(new Event('menu-sticky'));
    }
  }, {
    key: 'removeSticky',
    value: function removeSticky(e) {
      this.$menu.classList.remove('ds-menu--sticky');
      //this.$menu.dispatchEvent(new Event('menu-no-sticky'));
    }
  }, {
    key: 'addDown',
    value: function addDown(e) {
      this.$menu.classList.add('ds-menu--down');
      //this.$menu.dispatchEvent(new Event('menu-down'));
    }
  }, {
    key: 'removeDown',
    value: function removeDown(e) {
      this.$menu.classList.remove('ds-menu--down');
      //this.$menu.dispatchEvent(new Event('menu-no-down'));
    }
  }]);

  return Menu;
}();

exports.default = Menu;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Share = function () {
  function Share(el) {
    var _this = this;

    _classCallCheck(this, Share);

    this.$sharing = typeof el !== 'undefined' ? el : document.querySelector('.ds-sharing');

    this.encodedURL = encodeURIComponent(this.$sharing.getAttribute('data-url'));

    this.$sharing.querySelector('.js-sharing-fb').addEventListener('click', function (e) {
      return _this.popUpFacebook(e);
    });
    this.$sharing.querySelector('.js-sharing-twitter').addEventListener('click', function (e) {
      return _this.popUpTwitter(e);
    });
    this.$sharing.querySelector('.js-sharing-linkedin').addEventListener('click', function (e) {
      return _this.popUpLinkedin(e);
    });
    this.$sharing.querySelector('.js-sharing-mail').addEventListener('click', function (e) {
      return _this.popUpMail(e);
    });

    this.$sharing.addEventListener('click', function (e) {
      return _this.toggleSharing(e);
    });
  }

  _createClass(Share, [{
    key: 'toggleSharing',
    value: function toggleSharing(e) {
      e.currentTarget.classList.toggle('ds-sharing--open');
    }
  }, {
    key: 'findCardAncestor',
    value: function findCardAncestor(el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls)) {}

      return el;
    }
  }, {
    key: 'popUpFacebook',
    value: function popUpFacebook(e) {
      e.stopPropagation();
      var url = 'https://www.facebook.com/sharer/sharer.php?u=' + this.encodedURL;
      window.open(url, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450');
      return false;
    }
  }, {
    key: 'popUpTwitter',
    value: function popUpTwitter(e) {
      e.stopPropagation();
      var url = 'https://twitter.com/home?status=' + this.encodedURL;
      window.open(url, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450');
      return false;
    }
  }, {
    key: 'popUpLinkedin',
    value: function popUpLinkedin(e) {
      e.stopPropagation();
      var url = "https://www.linkedin.com/shareArticle?mini=true&url=" + this.encodedURL;

      window.open(url, 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450');
      return false;
    }
  }, {
    key: 'popUpMail',
    value: function popUpMail(e) {
      e.stopPropagation();
      var subject = this.$sharing.getAttribute('data-mail-subject') ? this.$sharing.getAttribute('data-mail-subject') : 'I wanted you to see this article';
      var body = this.$sharing.getAttribute('data-mail-body') ? this.$sharing.getAttribute('data-mail-body') : 'Check out this article';

      var url = 'mailto:?subject=' + subject + '&body=' + body + ' ' + this.encodedURL + '&amp;';
      window.location.href = url;
      return false;
    }
  }]);

  return Share;
}();

exports.default = Share;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Breadcrumb = function () {
  function Breadcrumb() {
    var _this = this;

    _classCallCheck(this, Breadcrumb);

    (0, _ds.forEach)(document.querySelectorAll('.js-breadcrumb-toggle'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.toggleBreadcrumb(e);
      });
    });
  }

  _createClass(Breadcrumb, [{
    key: 'toggleBreadcrumb',
    value: function toggleBreadcrumb(e) {
      var _this2 = this;

      e.preventDefault();
      e.stopPropagation();

      e.currentTarget.classList.toggle('active');

      var that = this;

      if (e.currentTarget.classList.contains('active')) {
        //this.fadeIn(e.currentTarget.parentNode.parentNode.querySelector('.js-breadcrumb-submenu'), "block");
        e.currentTarget.parentNode.parentNode.querySelector('.js-breadcrumb-submenu').classList.add('active');

        //closing the pop if click anywhere else in the page.
        document.body.addEventListener('click', function (e) {
          return _this2.closeBreadcrumb(e);
        });
        e.currentTarget.parentNode.parentNode.querySelector('.js-breadcrumb-submenu').addEventListener('click', function (e) {
          e.stopPropagation();
        });
      } else {
        //this.fadeOut(e.currentTarget.parentNode.parentNode.querySelector('.js-breadcrumb-submenu'));
        e.currentTarget.parentNode.parentNode.querySelector('.js-breadcrumb-submenu').classList.remove('active');

        document.body.removeEventListener('click', function (e) {
          return _this2.closeBreadcrumb(e);
        });
        e.currentTarget.parentNode.parentNode.querySelector('.js-breadcrumb-submenu').removeEventListener('click', function (e) {
          e.stopPropagation();
        });
      }
    }
  }, {
    key: 'closeBreadcrumb',
    value: function closeBreadcrumb(e) {
      var breadcrumbBtn = document.querySelector('.js-breadcrumb-toggle');
      breadcrumbBtn.classList.remove('active');
      breadcrumbBtn.parentNode.parentNode.querySelector('.js-breadcrumb-submenu').classList.remove('active');
      //this.fadeOut(breadcrumbBtn.parentNode.parentNode.querySelector('.js-breadcrumb-submenu'));
      breadcrumbBtn.parentNode.parentNode.querySelector('.js-breadcrumb-submenu').removeEventListener('click', function (e) {
        e.stopPropagation();
      });
    }
  }]);

  return Breadcrumb;
}();

exports.default = Breadcrumb;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoPlayer = function () {
  // @nodeEl:object:optional Dom element container
  function VideoPlayer(nodeEl) {
    var _this = this;

    _classCallCheck(this, VideoPlayer);

    var container = typeof nodeEl !== 'undefined' ? nodeEl : document;

    (0, _ds.forEach)(container.querySelectorAll('.ds-card--video'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.dsCardVideoModal(e);
      });
    });

    (0, _ds.forEach)(container.querySelectorAll('.js-video-modal'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.dsVideoModal(e);
      });
    });

    // Allow click on the other clickable element of the card
    (0, _ds.forEach)(container.querySelectorAll('.ds-card--video .ds-sharing, .ds-card__links'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.dsPreventClickPropagationOnCard(e);
      });
    });

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  _createClass(VideoPlayer, [{
    key: 'dsPreventClickPropagationOnCard',
    value: function dsPreventClickPropagationOnCard(e) {
      e.stopPropagation();
    }
  }, {
    key: 'dsCardVideoModal',
    value: function dsCardVideoModal(e) {
      var player = e.currentTarget.querySelector('a').getAttribute('data-video-player');
      if (player && player === 'youku') {
        var _id = e.currentTarget.querySelector('a').getAttribute('data-video-id');
        this.dsVideoDOMPreparation(_id, e, 'https://player.youku.com/embed/');
        return false;
      }

      var $a = e.currentTarget.querySelector('a').getAttribute('href');
      var id = this.getVideoId($a);

      this.dsVideoDOMPreparation(id, e);
    }
  }, {
    key: 'dsVideoModal',
    value: function dsVideoModal(e) {
      e.preventDefault();

      var player = e.currentTarget.getAttribute('data-video-player');
      if (player && player === 'youku') {
        var _id2 = e.currentTarget.getAttribute('data-video-id');
        this.dsVideoDOMPreparation(_id2, e, 'https://player.youku.com/embed/');
        return false;
      }

      var href = e.currentTarget.getAttribute('href');
      var id = this.getVideoId(href);

      this.dsVideoDOMPreparation(id, e);
    }
  }, {
    key: 'dsVideoDOMPreparation',
    value: function dsVideoDOMPreparation(id, e) {
      var embedLink = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://www.youtube.com/embed/';

      var iframeContainer = document.createElement('div');
      iframeContainer.classList.add('ds-iframe-container');

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', embedLink + id + '?autoplay=1&rel=0');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '1');

      iframeContainer.appendChild(iframe);

      this.dsOpenVideo(e, iframeContainer);
    }
  }, {
    key: 'dsOpenVideo',
    value: function dsOpenVideo(e, iframe) {
      e.preventDefault();

      var $target = e.currentTarget;

      // (Re)init popin
      (0, _ds.forEach)(document.querySelectorAll('.ds-youtube-overlay'), function (el) {
        el.parentNode.removeChild(el);
      });

      var $overlay = document.createElement('div');
      $overlay.classList.add('ds-youtube-overlay');
      document.querySelector('.ds-ui-kit-scope').appendChild($overlay);

      var duration = parseFloat(window.getComputedStyle($overlay).transitionDuration) * 1000;

      $overlay = document.querySelector('.ds-youtube-overlay');

      function dsCloseVideo() {

        if (document.querySelector('.ds-youtube-hardcore-overlay')) {
          document.querySelector('.ds-youtube-hardcore-overlay').parentNode.removeChild(document.querySelector('.ds-youtube-hardcore-overlay'));
        }
        document.querySelector('html').style.overflow = 'auto'; // enable scroll
        $overlay.querySelector('.ds-iframe-container').parentNode.removeChild($overlay.querySelector('.ds-iframe-container'));

        duration = parseFloat(window.getComputedStyle($overlay).transitionDuration) * 1000;
        $overlay.classList.remove('ds-youtube-overlay--fullscreen');

        setTimeout(function () {
          $overlay.classList.add('ds-youtube-overlay--exit');
          duration = parseFloat(window.getComputedStyle($overlay).transitionDuration) * 1000;

          setTimeout(function () {
            $overlay.parentNode.removeChild($overlay);
          }, duration);
        }, duration);
      }

      var span = document.createElement('span');
      span.classList.add('ds-youtube-overlay__close');
      span.addEventListener('click', dsCloseVideo);
      $overlay.appendChild(span);

      // Position popin
      var $article = $target;
      var top = void 0,
          left = void 0,
          bottom = void 0,
          right = void 0,
          opacity = void 0;
      if ($article.classList.contains('ds-card')) {
        var rect = $article.getBoundingClientRect();
        top = rect.top;
        left = rect.left;
        bottom = window.innerHeight - (top + $article.offsetHeight);
        var scrollWidth = (0, _ds.hasVerticalScroll)() ? (0, _ds.getScrollBarWidth)() : 0;
        right = window.innerWidth - (left + $article.offsetWidth) - scrollWidth;
        //opacity = 1;
      } else {
        top = '25%';
        left = 0;
        bottom = '25%';
        right = 0;
        //opacity = 0;
      }

      $overlay.style.top = top + 'px';
      $overlay.style.bottom = bottom + 'px';
      $overlay.style.left = left + 'px';
      $overlay.style.right = right + 'px';
      //$overlay.style.opacity = opacity;

      //Animate popin + add Youtube embed iframe
      function dsPositionVideo() {

        document.querySelector('html').style.cssText += 'overflow: hidden;'; // enable scroll
        $overlay.classList.add('on');

        if ($overlay.querySelector('iframe') === null) {
          $overlay.appendChild(iframe);
        }

        var iframeContainer = document.querySelector('.ds-iframe-container');

        if (!iframeContainer) {
          return;
        }

        iframeContainer.style.width = 'auto';
        iframeContainer.style.height = 'auto';

        var w = ($overlay.offsetHeight - 2 * parseInt(window.getComputedStyle(iframeContainer).top)) * 16 / 9;

        if (w > $overlay.offsetWidth || window.innerWidth < 760) {
          var h = $overlay.offsetWidth * 9 / 16;
          iframeContainer.style.width = '100%';
          iframeContainer.style.height = h + 'px';
        } else {
          iframeContainer.style.width = w + 'px';
        }
      }

      setTimeout(function () {
        $overlay.classList.add('ds-youtube-overlay--fullscreen');
      }, 2);

      setTimeout(dsPositionVideo, 1000);

      window.addEventListener('resize', dsPositionVideo);
    }
  }, {
    key: 'getVideoId',
    value: function getVideoId(url) {
      if (url.indexOf('?') !== -1) {
        var query = decodeURI(url).split('?')[1];
        var params = query.split('&');
        for (var i = 0, l = params.length; i < l; i++) {
          if (params[i].indexOf('v=') === 0) {
            return params[i].replace('v=', '');
          }
        }
      } else if (url.indexOf('youtu.be') !== -1) {
        return decodeURI(url).split('youtu.be/')[1];
      }
      return null;
    }
  }]);

  return VideoPlayer;
}();

exports.default = VideoPlayer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YoutubeVideo = function () {
  function YoutubeVideo(el) {
    var _this = this;

    _classCallCheck(this, YoutubeVideo);

    this.$video = typeof el !== 'undefined' ? el : document.querySelector('.js-vplayer');
    this.$video.addEventListener('click', function (e) {
      _this.showVideo(e);
      var player = _this.$video.getAttribute('data-video-player');
      if (player && player === 'youku') {
        _this.playVideoYouku(e);
      } else {
        _this.playVideoYoutube(e);
      }
    });
  }

  _createClass(YoutubeVideo, [{
    key: 'showVideo',
    value: function showVideo(e) {
      var $target = e.currentTarget;
      $target.removeEventListener('click', this.playVideoYoutube);
      $target.classList.toggle('active');

      //ie9 fix
      setTimeout(function () {
        $target.removeChild($target.querySelector('.ds-vplayer__cover'));
        $target.removeChild($target.querySelector('.ds-vplayer__play'));
      }, 300);
    }
  }, {
    key: 'playVideoYoutube',
    value: function playVideoYoutube(e) {
      var _this2 = this;

      var $target = e.currentTarget;
      this.player = new YT.Player($target.querySelector('.ds-vplayer__iframe-wrapper').id, {
        videoId: $target.getAttribute('data-video-id')
      });
      this.player.addEventListener('onReady', function (e) {
        return _this2.onPlayerReady(e);
      });
    }
  }, {
    key: 'onPlayerReady',
    value: function onPlayerReady(e) {
      this.player.playVideo();
    }
  }, {
    key: 'playVideoYouku',
    value: function playVideoYouku(e) {
      var $target = e.currentTarget;
      var container = $target.querySelector('.ds-vplayer__iframe-wrapper');
      var embedLink = 'https://player.youku.com/embed/';
      var id = $target.getAttribute('data-video-id');

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', embedLink + id + '?autoplay=1&rel=0');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '1');

      container.appendChild(iframe);
    }
  }]);

  return YoutubeVideo;
}();

exports.default = YoutubeVideo;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Highlight = function () {
  function Highlight(el) {
    var _this = this;

    _classCallCheck(this, Highlight);

    this.$highlight = typeof el !== 'undefined' ? el : document.querySelector('.ds-highglight');

    this.$highlight.querySelector('h1').setAttribute('data-title', this.$highlight.querySelector('h1').innerHTML);

    window.addEventListener('resize', function (e) {
      return _this.onResize(e);
    });

    //init
    this.onResize();
  }

  _createClass(Highlight, [{
    key: 'onResize',
    value: function onResize(e) {
      //todo change 375 and 480 by the grid value coming from the css
      if (window.innerWidth < 375) {
        this.nbChar = 40;
      } else if (window.innerWidth < 480) {
        this.nbChar = 50;
      } else if (window.innerWidth < 841) {
        this.nbChar = 65;
      } else {
        this.nbChar = 75;
      }

      (0, _ds.truncateTextOfElement)(this.$highlight.querySelector('h1'), this.nbChar);
    }
  }]);

  return Highlight;
}();

exports.default = Highlight;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

var _ds2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Banner = function () {
  function Banner() {
    var _this = this;

    _classCallCheck(this, Banner);

    //Differents elements
    this.$discover = null;
    this.$footer = null;
    this.$close = null;
    this.$actionButton = null;
    this.$localMenu = null;
    this.timer = null;

    this.closeStatus = null;
    this.topDelta = 0;

    //going back to the original position when we close the discover
    this.scrollPositionWhenOpen = 0;

    //positionning the closeButton
    this.closeButtonState = 0; // 0 : not sticky | 1 : sticky on top | 2 : sticky on bottom
    this.scrollTopToFixCloseButton = 0;
    this.scrollBottomToFixCloseButton = 0;
    this.spacingCloseButton = 48;

    this.$discover = document.querySelector('section.ds-discover');
    if (!this.$discover) {
      return;
    }

    this.$footer = this.$discover.querySelector('.ds-discover__footer');
    this.$close = document.querySelector('.ds-discover__close');
    this.$actionButton = document.querySelector('.ds-banner__buttons');
    this.$localMenu = document.querySelector('.ds-menu');

    document.querySelector('.js-toggle-discover').addEventListener('click', function (e) {
      return _this.clickDiscover(e);
    });

    this.$close.addEventListener('click', function (e) {
      return _this.close(e);
    }, false);

    window.addEventListener('scroll', function (e) {
      return _this.closeButtonPosition(e);
    });
    window.addEventListener('resize', function (e) {
      return _this.closeButtonPosition(e);
    });
  }

  _createClass(Banner, [{
    key: 'clickDiscover',
    value: function clickDiscover(e) {
      e.preventDefault();

      if (this.$discover.classList.contains('ds-discover--closed')) {
        this.open(1, e);
        this.scrollPositionWhenOpen = window.scrollY;

        //for the button
        this.closeStatus = -1;
        document.querySelector('.ds-discover__wrapper').appendChild(this.$close);
        this.$close.classList.remove('in-local-menu');
        this.$close.classList.remove('to-top');
        this.$close.classList.remove('to-bottom');
      }
    }

    //iOS bugfix

  }, {
    key: 'computeTopDeltaScroll',
    value: function computeTopDeltaScroll() {
      if (this.$localMenu.classList.contains('ds-menu--sticky')) {
        if (this.$localMenu.classList.contains('ds-menu--down')) {
          this.topDelta = this.$localMenu.offsetHeight;
        } else {
          this.topDelta = 0;
        }
      }
    }
  }, {
    key: 'closeButtonPosition',
    value: function closeButtonPosition(e) {

      this.computeTopDeltaScroll();

      var y = this.topDelta;

      var yMin = this.$discover.getBoundingClientRect().top; // + this.spacingCloseButton + this.$close.offsetHeight;
      var yMax = this.$footer.getBoundingClientRect().top - this.$close.offsetHeight - 2 * this.spacingCloseButton; // - this.$close.offsetHeight - this.spacingCloseButton;


      var newStatus = y < yMin ? -1 : y > yMax ? 1 : 0;

      if (newStatus === this.closeStatus) return;

      this.closeStatus = newStatus;

      if (this.closeStatus === -1) {

        // before
        document.querySelector('.ds-discover__wrapper').appendChild(this.$close);
        this.$close.classList.remove('in-local-menu');
      }
      if (this.closeStatus === 1) {

        // after
        document.querySelector('.ds-discover__wrapper').appendChild(this.$close);
        this.$close.classList.remove('in-local-menu');
        this.$close.classList.add('to-bottom');
      }
      if (this.closeStatus === 0) {
        this.$localMenu.appendChild(this.$close);
        this.$close.classList.add('in-local-menu');
        this.$close.classList.remove('to-bottom');
        this.$close.classList.remove('to-top');
      }
    }
  }, {
    key: 'reInitCloseButtonState',
    value: function reInitCloseButtonState() {
      this.$close.style.top = this.spacingCloseButton + 'px';
      this.closeButtonState = 0;
      this.$close.style.bottom = 'initial';
      this.$close.style.position = 'absolute';
      this.scrollTopToFixCloseButton = 0;
      this.scrollBottomToFixCloseButton = 0;
      this.$close.style.opacity = 1;
    }
  }, {
    key: 'open',
    value: function open(duration, e) {
      var _this2 = this;

      document.querySelector('.ds-banner__buttons').classList.add('closed');
      this.$actionButton.style.opacity = 0;

      //make the element display block outside the window to compute its height;
      var height = this.computeTrueHeight();

      this.$discover.style.height = 0;
      this.$discover.style.margin = 0;
      this.$discover.style.padding = 0;
      this.$discover.querySelector('.ds-discover__container').style.top = 0;
      this.$discover.classList.remove('ds-discover--closed');

      setTimeout(function () {
        _this2.$discover.removeAttribute('style');
        _this2.$discover.style.height = height + 'px';
        _this2.$close.style.opacity = 1;
      }, 20);

      setTimeout(function () {
        _this2.$discover.style.height = '';
      }, parseFloat(window.getComputedStyle(this.$discover).transitionDuration) * 1000);
    }
  }, {
    key: 'close',
    value: function close(duration, e) {
      var _this3 = this;

      this.$close.style.opacity = 0;
      this.$discover.style.height = this.computeTrueHeight() + 'px';

      var container = this.$discover.querySelector('.ds-discover__container');

      var deltaScroll = window.scrollY - this.getElDistanceFromTop(this.$discover);

      if (deltaScroll > 0) {
        window.scrollTo(0, this.getElDistanceFromTop(this.$discover));
        //avoiding the menu to go down and get sticky
        var menu = document.querySelector('.ds-menu');
        if (menu) {
          menu.classList.remove('ds-menu--sticky');
          menu.classList.remove('ds-menu--down');
        }

        container.style.top = -deltaScroll + 'px';
        this.$discover.style.height = window.innerHeight + 400 + 'px';
        var transitionDuration = this.$discover.style.transitionDuration;
        this.$discover.style.transitionDuration = '0s';

        this.$discover.style.transitionDuration = transitionDuration;

        setTimeout(function (e) {
          (0, _ds2.scrollTo)(_this3.scrollPositionWhenOpen, function () {}, parseFloat(window.getComputedStyle(_this3.$discover).transitionDuration) * 1000);
        }, parseFloat(transitionDuration));
      }

      setTimeout(function () {
        _this3.$discover.style.height = 0;
        _this3.$discover.style.margin = 0;
        //that.$discover.style.padding = 0;
      }, 1);

      setTimeout(function () {
        _this3.$discover.classList.add('ds-discover--closed');
        _this3.$discover.removeAttribute('style');
        _this3.$close.classList.remove('stick');
        _this3.$close.removeAttribute('style');
        _this3.$actionButton.style.opacity = 1;

        if (!_this3.$localMenu) _this3.reInitCloseButtonState();
      }, parseFloat(window.getComputedStyle(this.$discover).transitionDuration) * 1000);
    }
  }, {
    key: 'computeTrueHeight',
    value: function computeTrueHeight() {
      var clonedElement = this.$discover.cloneNode(true);
      document.body.appendChild(clonedElement);
      clonedElement.style.visibility = 'hidden';
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '-20000px';
      clonedElement.style.left = '-20000px';
      clonedElement.style.width = '100%';
      clonedElement.classList.remove('ds-discover--closed');

      var height = clonedElement.offsetHeight;
      clonedElement.parentNode.removeChild(clonedElement);

      return height;
    }
  }, {
    key: 'getElDistanceFromTop',
    value: function getElDistanceFromTop(e) {
      var bodyRect = document.body.getBoundingClientRect(),
          elemRect = e.getBoundingClientRect();

      return elemRect.top - bodyRect.top;
    }
  }, {
    key: 'isSafariIOS',
    value: function isSafariIOS() {
      return navigator.userAgent.match(/(iPhone)|(iPad)/) ? true : false;
    }
  }]);

  return Banner;
}();

exports.default = Banner;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(1);

var _ds2 = __webpack_require__(0);

var _hoverintent = __webpack_require__(18);

var _hoverintent2 = _interopRequireDefault(_hoverintent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
  function Header() {
    var _this = this;

    _classCallCheck(this, Header);

    if (!document.querySelector('.ds-g-menu')) return;

    this.resizeTimer = null;
    this.$dsLeftBar = document.querySelector('.ds-g-left-bar');
    this.$overlay = document.querySelector('.ds-g-overlay');
    this.$menuWrapper = document.querySelector('.ds-gmenu-wrapper');
    this.$submenu = document.querySelector('.ds-g-submenu');
    this.$searchOverlay = document.querySelector('.ds-gmenu-search');

    this.previousHoverEvent = null;

    this.closeHandler = function (e) {
      this.toggleLoginMenu(e);
    }.bind(this);

    (0, _ds2.forEach)(document.querySelectorAll('.js-toggle-side'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.toggleSideMenu(e);
      });
    });

    (0, _ds2.forEach)(document.querySelectorAll('.js-toggle-lang'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.toggleLangMenu(e);
      });
    });

    (0, _ds2.forEach)(document.querySelectorAll('.js-show-submenu'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.showSubmenuHover(e);
      });
    });

    (0, _ds2.forEach)(document.querySelectorAll('.js-side-back'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.toggleSubmenu(e);
      });
    });

    (0, _ds2.forEach)(document.querySelectorAll('.js-gmenu-overlay'), function (el) {
      el.addEventListener('click', function (e) {
        return _this.toggleSideMenu(e);
      });
    });

    (0, _ds2.forEach)(document.querySelectorAll('.ds-g-left-bar__title'), function (el) {
      el.addEventListener('mouseover', function (e) {
        return _this.reInitListStateOnTitle(e);
      });
    });

    if (this.$searchOverlay) {
      (0, _ds2.forEach)(document.querySelectorAll('.js-icon-search'), function (el) {
        el.addEventListener('click', function () {
          return _this.toggleSearchOverlay();
        });
      });
      this.$searchOverlayAnimation = this.$searchOverlay.querySelector('animate');
      var $closeSearchOverlay = this.$searchOverlay.querySelector('.ds-ico-back-icon');
      $closeSearchOverlay.addEventListener('click', function () {
        return _this.hideSearchOverlay();
      });
      this.initSearchOverlay();
    }

    (0, _ds2.forEach)(document.querySelectorAll('.ds-g-left-list:not(.ds-g-left-list--countries) .ds-g-left-list__item'), function (el) {
      //el.addEventListener('mouseover', (e) => this.showSubmenuHover(e));
      var opts = {
        sensitivity: 20,
        interval: 50
      };
      (0, _hoverintent2.default)(el, function () {
        _this.showSubmenuHover(el);
      }, function () {}).options(opts);

      el.addEventListener('click', function (e) {
        return _this.showSubmenuHoverClick(e);
      });
    });

    (0, _ds2.forEach)(document.querySelectorAll('.ds-gmenu-wrapper, .ds-g-left-bar'), function (el) {
      el.addEventListener('scroll', function (e) {
        return _this.blockScroll(e);
      });
    });

    document.querySelector('.js-icon-notif').addEventListener('click', function (e) {
      return _this.toggleLoginMenu(e);
    });
    document.querySelector('.ds-g-menu-login__expand').addEventListener('click', function (e) {
      return _this.toggleExpandLoginMenu(e);
    });

    document.body.addEventListener('touchmove', function (e) {
      return _this.blockScroll(e);
    });

    //search country input
    if (document.querySelector('.js-search-country-input')) {
      document.querySelector('.js-search-country-input').addEventListener('keyup', function (e) {
        return _this.onSearchField(e);
      });
    }

    //the code below is to fix a graphic bug when you resize and see the submenu crossing the screen.
    window.addEventListener('resize', function (e) {
      return _this.hideMenuWhileResize(e);
    });
    //the code below is only to fix a bug for the nexus 4 on android 4.2 ...
    window.addEventListener('resize', function (e) {
      return _this.fixHeightOfSidebar(e);
    });

    this.fixHeightOfSidebar();
    this.initAuthentication();
  }

  _createClass(Header, [{
    key: 'toggleSideMenu',
    value: function toggleSideMenu(e) {

      if (!this.$dsLeftBar.classList.contains('ds-g-left-bar--open')) {
        this.$dsLeftBar.classList.add('ds-g-left-bar--open');
        this.$overlay.classList.add('visible');
        this.$menuWrapper.classList.add('active');
        document.dispatchEvent(new CustomEvent('gmenuopen'));
        (0, _ds2.blockScroll)();
      } else {
        this.closeMenu(e);
      }

      if (document.querySelector('.js-icon-notif').classList.contains('active')) {
        this.reinitLoginMenu(e);
      }
    }
  }, {
    key: 'closeMenu',
    value: function closeMenu(e) {
      var _this2 = this;

      this.$dsLeftBar.classList.remove('ds-g-left-bar--open');
      this.$overlay.classList.remove('visible');
      this.$menuWrapper.classList.remove('active');
      document.querySelector('.js-left-menu-lang').classList.remove('active');
      (0, _ds2.freeScroll)();

      //that trick is to prevent the menu to split in two when we close the menu on mobile
      if (window.innerWidth < 720 && this.$submenu.classList.contains('active')) {
        var transitionDuration = window.getComputedStyle(this.$submenu).transitionDuration;
        this.$submenu.classList.add('ds-g-submenu--exit-mobile');

        setTimeout(function () {
          _this2.$submenu.style.transitionDuration = "0s";
          _this2.$submenu.style.top = "2000px";
          _this2.$submenu.classList.remove('ds-g-submenu--exit-mobile');
        }, parseFloat(transitionDuration) * 1000);

        setTimeout(function () {
          _this2.$submenu.style.top = "";
          _this2.$submenu.style.transitionDuration = transitionDuration;
        }, parseFloat(transitionDuration) * 3000);
      } else {
        this.$submenu.classList.remove('active');
      }

      this.reinitListState();
    }
  }, {
    key: 'toggleLangMenu',
    value: function toggleLangMenu(e) {
      document.querySelector('.js-left-menu-lang').classList.toggle('active');

      this.reinitListState();

      if (this.$dsLeftBar.classList.contains('ds-g-left-bar--lang-choice')) {
        this.$submenu.classList.remove('active');
      }
    }
  }, {
    key: 'toggleSubmenu',
    value: function toggleSubmenu(e) {
      this.$submenu.classList.toggle('active');
      this.reinitListState();
    }
  }, {
    key: 'showSubmenuHover',
    value: function showSubmenuHover(e) {
      if (window.innerWidth >= 720) {
        this.showSubmenu(e);
      }
    }
  }, {
    key: 'showSubmenuHoverClick',
    value: function showSubmenuHoverClick(e) {
      if (window.innerWidth < 720) {
        this.showSubmenu(e);
      }
    }
  }, {
    key: 'showSubmenu',
    value: function showSubmenu(e) {
      var $target = e.currentTarget || e;

      //that case is only for the touch devices because the showSubmenu function is fired two times, one by the li one by the a...
      if ($target.tagName === "A") {
        return;
      }

      //each time we hover a different list item, we reset all the liststate and we active the good one.
      this.reinitListState();
      $target.classList.add('active');

      //console.log($target, $target.getAttribute('data-menu-cat'));
      //if its an item of the list without subnavigation
      if (!$target.hasAttribute('data-menu-cat')) {
        this.blockChangeState = false;
        this.reinitListState();
        this.previousHoverEvent = e;
        return;
      }

      //we want to show the submenu panel and show the acurate content
      this.$submenu.classList.add('active');

      (0, _ds2.forEach)(document.querySelectorAll('.ds-g-submenu .ds-g-submenu__item'), function (el) {
        el.style.display = "none";
      });

      this.$submenu.querySelector('#' + $target.getAttribute('data-menu-cat')).style.display = "block";

      this.previousHoverEvent = e;
    }

    //that function is a kind of bug fix, to close the menu when we move from the top list element trop the upper part of the menu.

  }, {
    key: 'reInitListStateOnTitle',
    value: function reInitListStateOnTitle(e) {
      this.reinitListState(e);
    }
  }, {
    key: 'reinitListState',
    value: function reinitListState(e) {
      if (!this.blockChangeState || window.innerWidth < (0, _ds2.getBreakPoint)('grid-breakpoints-lg')) {
        (0, _ds2.forEach)(document.querySelectorAll('.ds-g-left-list:not(.ds-g-left-list--countries) .ds-g-left-list__item'), function (el) {
          el.classList.remove('active');
        });

        this.$submenu.classList.remove('active');
      }
    }
  }, {
    key: 'mouseLeaveSubmenu',
    value: function mouseLeaveSubmenu(e) {
      this.blockChangeState = false;
      this.reinitListState();
    }
  }, {
    key: 'onSearchField',
    value: function onSearchField(e) {
      if (e.currentTarget.value.length >= 2) {
        (0, _ds2.forEach)(document.querySelectorAll('.ds-g-left-list--countries .ds-g-left-list__item'), function (el) {
          if (el.innerText.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) !== -1) {
            el.style.display = "block";
          } else {
            el.style.display = "none";
          }
        });
      } else {
        (0, _ds2.forEach)(document.querySelectorAll('.ds-g-left-list--countries .ds-g-left-list__item'), function (el) {
          el.style.display = "block";
        });
      }
    }
  }, {
    key: 'blockScroll',
    value: function blockScroll(e) {
      if (this.$submenu.classList.contains('active')) {
        e.stopPropagation();
      }
    }
  }, {
    key: 'hideMenuWhileResize',
    value: function hideMenuWhileResize(e) {
      var _this3 = this;

      if (!this.$submenu.classList.contains('active')) {
        this.$submenu.style.opacity = '0';
      }

      clearTimeout(this.resizeTimer);

      this.resizeTimer = setTimeout(function () {
        _this3.$submenu.style.opacity = '';
        // Run code here, resizing has "stopped"
      }, 250);
    }
  }, {
    key: 'fixHeightOfSidebar',
    value: function fixHeightOfSidebar(e) {
      var toggleLangButton = document.querySelector('.js-toggle-lang');
      document.querySelector('.ds-g-left-bar__wrapper').style.height = window.innerHeight - toggleLangButton.offsetHeight * 2 + 'px';
    }
  }, {
    key: 'toggleLoginMenu',
    value: function toggleLoginMenu(e) {
      e.stopPropagation();

      var target = document.querySelector('.js-icon-notif');

      target.classList.toggle('active');

      if (target.classList.contains('active')) {
        document.querySelector('.ds-g-menu-login').classList.add('active');
        document.body.addEventListener('click', this.closeHandler);
        document.querySelector('.ds-g-menu-login').addEventListener('click', function (e) {
          e.stopPropagation();
        });
      } else {
        this.reinitLoginMenu(e);
      }
    }
  }, {
    key: 'reinitLoginMenu',
    value: function reinitLoginMenu(e) {
      var loginMenu = document.querySelector('.ds-g-menu-login');
      var icon = document.querySelector('.js-icon-notif');

      loginMenu.classList.remove('active');
      icon.classList.remove('active');
      document.body.removeEventListener('click', this.closeHandler);

      setTimeout(function (e) {
        loginMenu.classList.remove('expanded');
      }, 200);
    }
  }, {
    key: 'toggleExpandLoginMenu',
    value: function toggleExpandLoginMenu(e) {
      e.stopPropagation();
      e.preventDefault();
      document.querySelector('.ds-g-menu-login').classList.toggle('expanded');
    }
  }, {
    key: 'initSearchOverlay',
    value: function initSearchOverlay() {
      var jsonld = document.querySelector('script[type="application/ld+json"]');
      if (!jsonld) {
        return false;
      }

      jsonld = JSON.parse(jsonld.innerText);

      if (jsonld['@type'] === 'WebSite' && jsonld.potentialAction && jsonld.potentialAction['@type'] === 'SearchAction') {
        this.setSearchOverlay(jsonld.potentialAction);
      }
    }
  }, {
    key: 'setSearchOverlay',
    value: function setSearchOverlay(data) {
      var label = this.$searchOverlay.querySelector('label');
      var form = this.$searchOverlay.querySelector('form');
      label.innerText = data.description;
      form.action = data.target;
    }
  }, {
    key: 'toggleSearchOverlay',
    value: function toggleSearchOverlay() {
      if (this.$searchOverlay.classList.contains('is-visible')) {
        this.hideSearchOverlay();
      } else {
        this.showSearchOverlay();
      }
    }
  }, {
    key: 'showSearchOverlay',
    value: function showSearchOverlay() {
      this.$searchOverlay.classList.add('is-visible');
      this.$searchOverlay.querySelector('input').focus();
      (0, _ds2.blockScroll)();
      this.startSearchAnimation(0, 150, null);
    }
  }, {
    key: 'hideSearchOverlay',
    value: function hideSearchOverlay() {
      var _this4 = this;

      (0, _ds2.freeScroll)();
      this.startSearchAnimation(150, 0, function () {
        _this4.$searchOverlay.classList.remove('is-visible');
      });
    }
  }, {
    key: 'startSearchAnimation',
    value: function startSearchAnimation(from, to, callback) {
      var _this5 = this;

      if (this.$searchOverlayAnimation && 'beginElement' in this.$searchOverlayAnimation) {
        this.$searchOverlay.classList.add('has-animation');
        this.$searchOverlay.classList.add('no-background');
        this.$searchOverlayAnimation.setAttributeNS(null, 'from', from);
        this.$searchOverlayAnimation.setAttributeNS(null, 'to', to);
        this.$searchOverlayAnimation.beginElement();
        setTimeout(function () {
          _this5.$searchOverlay.classList.remove('has-animation');
        }, 150);
        setTimeout(function () {
          if (callback) {
            callback();
          }
        }, 300);
      } else {
        if (callback) {
          callback();
        }
      }
    }
  }, {
    key: 'initAuthentication',
    value: function initAuthentication() {
      var firstname = (0, _ds2.getCookie)('BS_FNAME');
      var lastname = (0, _ds2.getCookie)('BS_LNAME');

      if (!firstname || !lastname) {
        return false;
      }

      var userEl = document.createElement('span');
      userEl.innerText = lastname + ' ' + firstname;
      userEl.classList.add('ds-g-menu__user');

      var userContainer = document.querySelector('.js-icon-notif');
      userContainer.appendChild(userEl);
      userContainer.classList.add('is-logged');
    }
  }]);

  return Header;
}();

exports.default = Header;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(19);

module.exports = function(el, onOver, onOut) {
  var x, y, pX, pY;
  var h = {},
    state = 0,
    timer = 0;

  var options = {
    sensitivity: 7,
    interval: 100,
    timeout: 0
  };

  function delay(el, e) {
    if (timer) timer = clearTimeout(timer);
    state = 0;
    return onOut.call(el, e);
  }

  function tracker(e) {
    x = e.clientX;
    y = e.clientY;
  }

  function compare(el, e) {
    if (timer) timer = clearTimeout(timer);
    if ((Math.abs(pX - x) + Math.abs(pY - y)) < options.sensitivity) {
      state = 1;
      return onOver.call(el, e);
    } else {
      pX = x;
      pY = y;
      timer = setTimeout(function() {
        compare(el, e);
      }, options.interval);
    }
  }

  // Public methods
  h.options = function(opt) {
    options = extend({}, options, opt);
    return h;
  };

  function dispatchOver(e) {
    if (timer) timer = clearTimeout(timer);
    el.removeEventListener('mousemove', tracker, false);

    if (state !== 1) {
      pX = e.clientX;
      pY = e.clientY;

      el.addEventListener('mousemove', tracker, false);

      timer = setTimeout(function() {
        compare(el, e);
      }, options.interval);
    }

    return this;
  }

  function dispatchOut(e) {
    if (timer) timer = clearTimeout(timer);
    el.removeEventListener('mousemove', tracker, false);

    if (state === 1) {
      timer = setTimeout(function() {
        delay(el, e);
      }, options.timeout);
    }

    return this;
  }

  h.remove = function() {
    if (!el) return;
    el.removeEventListener('mouseover', dispatchOver, false);
    el.removeEventListener('mouseout', dispatchOut, false);
  };

  if (el) {
    el.addEventListener('mouseover', dispatchOver, false);
    el.addEventListener('mouseout', dispatchOut, false);
  }

  return h;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
  // @query:string:optional Tooltip css selector
  function Tooltip(query) {
    var _this = this;

    _classCallCheck(this, Tooltip);

    var selector = typeof query !== 'undefined' ? query : '.ds-tooltip';

    (0, _ds.forEach)(document.querySelectorAll(selector), function (el) {
      el.addEventListener('click', function () {
        return _this.onClick(el);
      });
    });
  }

  _createClass(Tooltip, [{
    key: 'onClick',
    value: function onClick(el) {
      if (el.classList.contains('is-open')) {
        this.hide(el);
      } else {
        var visibleTooltip = document.querySelectorAll('.ds-tooltip.is-open');
        (0, _ds.forEach)(visibleTooltip, function (el) {
          el.classList.remove('is-open');
        });
        this.show(el);
      }
    }
  }, {
    key: 'show',
    value: function show(el) {
      var _this2 = this;

      el.classList.add('is-open');
      (0, _ds.onClickOut)(el, null, function () {
        _this2.hide(el);
      });
    }
  }, {
    key: 'hide',
    value: function hide(el) {
      el.classList.remove('is-open');
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Language = function () {
  function Language() {
    _classCallCheck(this, Language);

    this.l10nLinks = document.querySelectorAll('head link[rel="alternate"][hreflang]');
    this.htmlLang = document.getElementsByTagName('html')[0].getAttribute("lang");

    this.footerLang = document.querySelector(".ds-footer__lang");
    this.headerLang = document.querySelector(".ds-g-left-bar__location");

    this.setFooterEvent();
    this.setHeaderEvent();
  }

  _createClass(Language, [{
    key: 'changeLang',
    value: function changeLang(langcode) {
      if (this.l10nLinks && langcode) {
        (0, _ds.forEach)(this.l10nLinks, function (el) {
          if (langcode === el.attributes.hreflang.textContent) {
            if (el.attributes.href) {
              window.location = el.attributes.href.textContent;
            }
          }
        });
      }
    }
  }, {
    key: 'setFooterEvent',
    value: function setFooterEvent() {
      var _this = this;

      var countriesItemsFooterEl = document.querySelectorAll(".ds-footer__lang select option");
      if (countriesItemsFooterEl && 1 < countriesItemsFooterEl.length) {

        var select = countriesItemsFooterEl[0].parentElement;
        select.selectedIndex = -1;
        select.addEventListener('change', function () {
          if (select.selectedOptions && select.selectedOptions[0]) {
            _this.changeLang(select.selectedOptions[0].value);
          } else if (-1 !== select.selectedIndex) {
            _this.changeLang(select.options[select.selectedIndex].value);
          }
        });

        (0, _ds.forEach)(countriesItemsFooterEl, function (el) {
          if (_this.htmlLang && _this.htmlLang === el.value) {
            _this.footerLang.firstChild.textContent = el.innerHTML;
          }
        });
      }
    }
  }, {
    key: 'setHeaderEvent',
    value: function setHeaderEvent() {
      var _this2 = this;

      var countriesItemsHeaderEl = document.querySelectorAll('.ds-g-left-list--countries .ds-g-left-list__item > span');
      if (countriesItemsHeaderEl) {
        (0, _ds.forEach)(countriesItemsHeaderEl, function (el) {
          if (_this2.htmlLang && _this2.htmlLang === el.getAttribute('data-langcode')) {
            _this2.headerLang.lastChild.textContent = el.innerHTML;
          }

          el.addEventListener('click', function () {
            _this2.changeLang(el.getAttribute('data-langcode'));
          });
        });
      }
    }
  }]);

  return Language;
}();

exports.default = Language;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {
  // @nodeEl:object:optional Dom element container of the inputs
  function Input(nodeEl) {
    var _this = this;

    _classCallCheck(this, Input);

    var container = typeof nodeEl !== 'undefined' ? nodeEl : document;

    (0, _ds.forEach)(container.querySelectorAll('.ds-input:not(.ds-input--search) input, .ds-input textarea'), function (el) {
      el.addEventListener('focus', function () {
        return _this.onFocusIn(el);
      });
      el.addEventListener('blur', function () {
        return _this.onFocusOut(el);
      });
      el.addEventListener('change', function () {
        return _this.onChange(el);
      });
      _this.initInput(el);
    });
    (0, _ds.forEach)(container.querySelectorAll('.ds-input .ds-ico-form-error-mini'), function (el) {
      el.addEventListener('click', function () {
        return _this.startErrorAnimation(el);
      });
    });
    (0, _ds.forEach)(container.querySelectorAll('.ds-input label'), function (el) {
      el.setAttribute("data-label", el.textContent);
    });
  }

  _createClass(Input, [{
    key: 'initInput',
    value: function initInput(el) {
      el.setAttribute("data-placeholder", el.getAttribute("placeholder") || '');
      this.onFocusOut(el);
    }
  }, {
    key: 'onFocusIn',
    value: function onFocusIn(el) {
      el.classList.remove('is-empty');
      el.setAttribute("placeholder", el.getAttribute("data-placeholder"));
    }
  }, {
    key: 'onFocusOut',
    value: function onFocusOut(el) {
      if (el.value === '') {
        el.classList.add('is-empty');
        el.removeAttribute("placeholder");
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(el) {
      if (el.value !== '' && el.classList.contains('is-empty')) {
        this.onFocusIn(el);
      }
    }
  }, {
    key: 'startErrorAnimation',
    value: function startErrorAnimation(el) {
      // Text animation
      var errorMessage = el.parentNode.querySelector('.ds-input__error');
      errorMessage.classList.remove('ds-shake');
      setTimeout(function () {
        return errorMessage.classList.add('ds-shake');
      }, 100);
      // Input focus
      var input = el.parentNode.querySelector('input');
      input.focus();
    }
  }]);

  return Input;
}();

exports.default = Input;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

var _autoComplete = __webpack_require__(24);

var _autoComplete2 = _interopRequireDefault(_autoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function () {
  // @query:string:optional Input css selector
  function Search(query) {
    var _this = this;

    _classCallCheck(this, Search);

    var selector = typeof query !== 'undefined' ? query : '.js-ds-autocomplete input';

    (0, _ds.forEach)(document.querySelectorAll(selector), function (el) {
      _this.initAutoComplete(el);
    });
  }

  _createClass(Search, [{
    key: 'initAutoComplete',
    value: function initAutoComplete(el) {
      var name = el.getAttribute("name");
      var url = el.getAttribute("data-url");

      var my_autoComplete = new _autoComplete2.default({
        selector: el,
        minChars: 2,
        offsetTop: 0,
        menuClass: 'ds-input__autocomplete',
        source: function source(term, response) {
          var oReq = new XMLHttpRequest();
          oReq.onload = function (e) {
            response(['aba', 'baba', 'coco']);
          };
          oReq.open('GET', url + '?' + name + '=' + term, true);
          oReq.responseType = 'json';
          oReq.send();
        }
      });
    }
  }]);

  return Search;
}();

exports.default = Search;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
    JavaScript autoComplete v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/

var autoComplete = function () {
    // "use strict";
    function autoComplete(options) {
        if (!document.querySelector) return;

        // helpers
        function hasClass(el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
        }

        function addEvent(el, type, handler) {
            if (el.attachEvent) el.attachEvent('on' + type, handler);else el.addEventListener(type, handler);
        }
        function removeEvent(el, type, handler) {
            // if (el.removeEventListener) not working in IE11
            if (el.detachEvent) el.detachEvent('on' + type, handler);else el.removeEventListener(type, handler);
        }
        function live(elClass, event, cb, context) {
            addEvent(context || document, event, function (e) {
                var found,
                    el = e.target || e.srcElement;
                while (el && !(found = hasClass(el, elClass))) {
                    el = el.parentElement;
                }if (found) cb.call(el, e);
            });
        }

        var o = {
            selector: 0,
            source: 0,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: '',
            renderItem: function renderItem(item, search) {
                // escape special characters
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
            },
            onSelect: function onSelect(e, term, item) {}
        };
        for (var k in options) {
            if (options.hasOwnProperty(k)) o[k] = options[k];
        }

        // init
        var elems = _typeof(o.selector) == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
        for (var i = 0; i < elems.length; i++) {
            var that = elems[i];

            // create suggestions container "sc"
            that.sc = document.createElement('div');
            that.sc.className = 'autocomplete-suggestions ' + o.menuClass;

            that.autocompleteAttr = that.getAttribute('autocomplete');
            that.setAttribute('autocomplete', 'off');
            that.cache = {};
            that.last_val = '';

            that.updateSC = function (resize, next) {
                var rect = that.getBoundingClientRect();
                that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
                that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
                that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
                if (!resize) {
                    that.sc.style.display = 'block';
                    if (!that.sc.maxHeight) {
                        that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight);
                    }
                    if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
                    if (that.sc.suggestionHeight) if (!next) that.sc.scrollTop = 0;else {
                        var scrTop = that.sc.scrollTop,
                            selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
                        if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0) that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;else if (selTop < 0) that.sc.scrollTop = selTop + scrTop;
                    }
                }
            };
            addEvent(window, 'resize', that.updateSC);
            document.body.appendChild(that.sc);

            live('autocomplete-suggestion', 'mouseleave', function (e) {
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) setTimeout(function () {
                    sel.className = sel.className.replace('selected', '');
                }, 20);
            }, that.sc);

            live('autocomplete-suggestion', 'mouseover', function (e) {
                var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                if (sel) sel.className = sel.className.replace('selected', '');
                this.className += ' selected';
            }, that.sc);

            live('autocomplete-suggestion', 'mousedown', function (e) {
                if (hasClass(this, 'autocomplete-suggestion')) {
                    // else outside click
                    var v = this.getAttribute('data-val');
                    that.value = v;
                    o.onSelect(e, v, this);
                    that.sc.style.display = 'none';
                }
            }, that.sc);

            that.blurHandler = function () {
                try {
                    var over_sb = document.querySelector('.autocomplete-suggestions:hover');
                } catch (e) {
                    var over_sb = 0;
                }
                if (!over_sb) {
                    that.last_val = that.value;
                    that.sc.style.display = 'none';
                    setTimeout(function () {
                        that.sc.style.display = 'none';
                    }, 350); // hide suggestions on fast input
                } else if (that !== document.activeElement) setTimeout(function () {
                    that.focus();
                }, 20);
            };
            addEvent(that, 'blur', that.blurHandler);

            var suggest = function suggest(data) {
                var val = that.value;
                that.cache[val] = data;
                if (data.length && val.length >= o.minChars) {
                    var s = '';
                    for (var i = 0; i < data.length; i++) {
                        s += o.renderItem(data[i], val);
                    }that.sc.innerHTML = s;
                    that.updateSC(0);
                } else that.sc.style.display = 'none';
            };

            that.keydownHandler = function (e) {
                var key = window.event ? e.keyCode : e.which;
                // down (40), up (38)
                if ((key == 40 || key == 38) && that.sc.innerHTML) {
                    var next,
                        sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                    if (!sel) {
                        next = key == 40 ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last
                        next.className += ' selected';
                        that.value = next.getAttribute('data-val');
                    } else {
                        next = key == 40 ? sel.nextSibling : sel.previousSibling;
                        if (next) {
                            sel.className = sel.className.replace('selected', '');
                            next.className += ' selected';
                            that.value = next.getAttribute('data-val');
                        } else {
                            sel.className = sel.className.replace('selected', '');that.value = that.last_val;next = 0;
                        }
                    }
                    that.updateSC(0, next);
                    return false;
                }
                // esc
                else if (key == 27) {
                        that.value = that.last_val;that.sc.style.display = 'none';
                    }
                    // enter
                    else if (key == 13 || key == 9) {
                            var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
                            if (sel && that.sc.style.display != 'none') {
                                o.onSelect(e, sel.getAttribute('data-val'), sel);setTimeout(function () {
                                    that.sc.style.display = 'none';
                                }, 20);
                            }
                        }
            };
            addEvent(that, 'keydown', that.keydownHandler);

            that.keyupHandler = function (e) {
                var key = window.event ? e.keyCode : e.which;
                if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
                    var val = that.value;
                    if (val.length >= o.minChars) {
                        if (val != that.last_val) {
                            that.last_val = val;
                            clearTimeout(that.timer);
                            if (o.cache) {
                                if (val in that.cache) {
                                    suggest(that.cache[val]);return;
                                }
                                // no requests if previous suggestions were empty
                                for (var i = 1; i < val.length - o.minChars; i++) {
                                    var part = val.slice(0, val.length - i);
                                    if (part in that.cache && !that.cache[part].length) {
                                        suggest([]);return;
                                    }
                                }
                            }
                            that.timer = setTimeout(function () {
                                o.source(val, suggest);
                            }, o.delay);
                        }
                    } else {
                        that.last_val = val;
                        that.sc.style.display = 'none';
                    }
                }
            };
            addEvent(that, 'keyup', that.keyupHandler);

            that.focusHandler = function (e) {
                that.last_val = '\n';
                that.keyupHandler(e);
            };
            if (!o.minChars) addEvent(that, 'focus', that.focusHandler);
        }

        // public destroy method
        this.destroy = function () {
            for (var i = 0; i < elems.length; i++) {
                var that = elems[i];
                removeEvent(window, 'resize', that.updateSC);
                removeEvent(that, 'blur', that.blurHandler);
                removeEvent(that, 'focus', that.focusHandler);
                removeEvent(that, 'keydown', that.keydownHandler);
                removeEvent(that, 'keyup', that.keyupHandler);
                if (that.autocompleteAttr) that.setAttribute('autocomplete', that.autocompleteAttr);else that.removeAttribute('autocomplete');
                document.body.removeChild(that.sc);
                that = null;
            }
        };
    }
    return autoComplete;
}();

(function () {
    if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
        return autoComplete;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if (typeof module !== 'undefined' && module.exports) module.exports = autoComplete;else window.autoComplete = autoComplete;
})();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Counter = function () {
  // @nodeEl:object:optional Dom element container
  function Counter(nodeEl) {
    var _this = this;

    _classCallCheck(this, Counter);

    var container = typeof nodeEl !== 'undefined' ? nodeEl : document;

    var inputCounter = container.querySelectorAll('.ds-input textarea[data-limit], .ds-input input[data-limit]');
    (0, _ds.forEach)(inputCounter, function (el) {
      var limit = el.getAttribute("data-limit");
      el.addEventListener('keyup', function () {
        return _this.onKeyPress(el, limit);
      });
      _this.onKeyPress(el, limit);
    });
  }

  _createClass(Counter, [{
    key: 'onKeyPress',
    value: function onKeyPress(el, limit) {
      var count = limit - el.value.length;
      var $counter = el.parentNode.querySelector('.ds-input__info--counter');
      $counter.innerText = count;

      if (count < 0) {
        el.classList.add('has-error');
      } else {
        el.classList.remove('has-error');
      }
    }
  }]);

  return Counter;
}();

exports.default = Counter;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Select = function () {
  // @query:string:optional Select css selector
  function Select(query) {
    var _this = this;

    _classCallCheck(this, Select);

    var selector = typeof query !== 'undefined' ? query : '.ds-select select';

    (0, _ds.forEach)(document.querySelectorAll(selector), function (el) {
      el.addEventListener('focus', function () {
        return _this.onFocusIn(el);
      });
      el.addEventListener('blur', function () {
        return _this.onFocusOut(el);
      });
      el.addEventListener('change', function () {
        return _this.onChange(el);
      });
      _this.onChange(el);
    });
  }

  _createClass(Select, [{
    key: 'onFocusIn',
    value: function onFocusIn(el) {
      el.parentNode.classList.add('has-focus');
    }
  }, {
    key: 'onFocusOut',
    value: function onFocusOut(el) {
      el.parentNode.classList.remove('has-focus');
    }
  }, {
    key: 'onChange',
    value: function onChange(el) {
      if (el.value === '') {
        el.classList.add('has-placeholder');
      } else {
        el.classList.remove('has-placeholder');
      }
    }
  }]);

  return Select;
}();

exports.default = Select;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiSelect = function () {
  function MultiSelect(el) {
    _classCallCheck(this, MultiSelect);

    this.el = el;
    this.onKeyOption = '';
    this.onKeyIndex = 0;
    this.search = '';
    this.initCustomMultiple();
  }

  _createClass(MultiSelect, [{
    key: 'initCustomMultiple',
    value: function initCustomMultiple() {
      var _this = this;

      if ((0, _ds.isMobile)()) {
        this.el.classList.add('is-mobile');
        return false;
      }

      this.options = this.el.querySelectorAll('select option');
      this.select = this.el.querySelector('select');

      // Add templating for custom select
      var tplPlaceholder = this.getTemplatePlaceholder();
      this.tplOptions = this.getTemplateOptions();
      this.el.appendChild(tplPlaceholder);
      this.el.appendChild(this.tplOptions);
      this.el.classList.add('is-enabled');

      // Set default value and listen for changes
      this.inputs = this.el.querySelectorAll('input');
      this.selectOnChange();
      this.select.addEventListener('change', function () {
        return _this.selectOnChange();
      });

      tplPlaceholder.addEventListener('click', function () {
        return _this.toggle();
      });

      this.el.addEventListener('keydown', function (e) {
        return _this.onkeydown(e);
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.el.classList.remove('is-open');
      this.removeOptionKeyboard();
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      this.el.classList.add('is-open');
      this.onKeyIndex = 0;
      this.onKeyOption = this.inputs[0];
      this.search = '';
      (0, _ds.onClickOut)(this.el, null, function () {
        _this2.hide();
      });
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.el.classList.contains('is-open')) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: 'removeOptionKeyboard',
    value: function removeOptionKeyboard() {
      var currentOption = this.el.querySelector('.has-keyboard');
      if (currentOption) {
        currentOption.classList.remove('has-keyboard');
      }
    }
  }, {
    key: 'getTemplateOptions',
    value: function getTemplateOptions() {
      var _this3 = this;

      var container = document.createElement("div");
      container.className = 'ds-select__list';

      (0, _ds.forEach)(this.options, function (el) {
        if (el.value === "") {
          return;
        }
        var wrapper = document.createElement("div");
        wrapper.className = 'ds-checkbox';
        wrapper.addEventListener('mouseover', function () {
          return _this3.optionOnHover(wrapper);
        });

        var input = document.createElement("input");
        input.type = "checkbox";
        input.name = el.value;
        input.value = el.value;
        input.id = _this3.select.name + '_' + el.value;
        input.addEventListener('change', function () {
          return _this3.inputOnChange(input);
        });

        var label = document.createElement("label");
        label.textContent = el.textContent;
        label.htmlFor = _this3.select.name + '_' + el.value;
        label.setAttribute('role', 'option');

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
      });

      return container;
    }
  }, {
    key: 'getTemplatePlaceholder',
    value: function getTemplatePlaceholder() {
      var placeholder = document.createElement("div");
      placeholder.className = 'ds-select__placeholder';
      placeholder.textContent = this.getPlaceholderValue(this.select);
      return placeholder;
    }
  }, {
    key: 'getPlaceholderValue',
    value: function getPlaceholderValue() {
      var _this4 = this;

      var placeholderValue = '';
      (0, _ds.forEach)(this.select.options, function (el) {
        if (_this4.select.value === '') {
          return placeholderValue = _this4.select.getAttribute('data-placeholder');
        } else if (el.selected) {
          if (placeholderValue === '') {
            return placeholderValue = el.textContent;
          }
          placeholderValue = placeholderValue + ", " + el.textContent;
        }
      });
      return placeholderValue;
    }
  }, {
    key: 'updatePlaceholder',
    value: function updatePlaceholder() {
      var placeholder = this.select.parentNode.querySelector('.ds-select__placeholder');
      placeholder.textContent = this.getPlaceholderValue(this.select);
      if (this.select.value === '') {
        placeholder.classList.remove('has-changed');
      } else {
        placeholder.classList.add('has-changed');
      }
    }
  }, {
    key: 'selectOnChange',
    value: function selectOnChange() {
      var _this5 = this;

      (0, _ds.forEach)(this.select.options, function (o) {
        (0, _ds.forEach)(_this5.inputs, function (i) {
          if (o.value === i.value) {
            i.checked = o.selected;
            return false;
          }
        });
      });
      this.updatePlaceholder();
    }
  }, {
    key: 'inputOnChange',
    value: function inputOnChange(input) {
      (0, _ds.forEach)(this.select.options, function (o) {
        if (o.value === input.value) {
          o.selected = input.checked;
        }
      });
      this.updatePlaceholder();
    }
  }, {
    key: 'optionOnHover',
    value: function optionOnHover(wrapper) {
      var _this6 = this;

      this.removeOptionKeyboard();
      wrapper.classList.add('has-keyboard');
      (0, _ds.forEach)(this.inputs, function (el, i) {
        if (el.parentNode === wrapper) {
          _this6.onKeyIndex = i;
          _this6.onKeyOption = _this6.inputs[_this6.onKeyIndex];
          return false;
        }
      });
    }
  }, {
    key: 'onkeydown',
    value: function onkeydown(e) {
      switch (e.which) {
        case 32:
          //space
          e.preventDefault();
          this.onSpace();
          break;
        case 13:
          //enter
          e.preventDefault();
          this.onEnter();
          break;
        case 9:
          //tab
          if (this.el.classList.contains('is-open')) {
            e.preventDefault();
          }
          break;
        case 27:
          //esc
          this.hide();
          this.onKeyOption = '';
          break;
        case 38: //up
        case 40:
          //down
          e.preventDefault();
          this.onArrow(e.which);
          break;
        default:
          this.onKey(e.which, e.key);
          break;
      }
    }
  }, {
    key: 'onSpace',
    value: function onSpace() {
      if (this.el.classList.contains('is-open')) {
        this.onKeyOption.checked = !this.onKeyOption.checked;
        this.inputOnChange(this.onKeyOption);
      } else {
        this.show();
        this.onKeyOption.parentNode.classList.add('has-keyboard');
      }
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      if (this.el.classList.contains('is-open')) {
        this.onKeyOption.checked = !this.onKeyOption.checked;
        this.inputOnChange(this.onKeyOption);
      }
    }
  }, {
    key: 'onArrow',
    value: function onArrow(direction) {
      if (!this.el.classList.contains('is-open')) {
        if (direction === 40) {
          this.show();
          this.onKeyOption.parentNode.classList.add('has-keyboard');
        }
        return false;
      }
      if (direction === 38) {
        this.onKeyIndex > 0 ? this.onKeyIndex-- : 0;
      } else {
        this.onKeyIndex < this.inputs.length - 1 ? this.onKeyIndex++ : this.inputs.length - 1;
        if (!this.onKeyOption.parentNode.classList.contains('has-keyboard')) {
          this.onKeyIndex = 0;
        }
      }
      this.onKeyOption.parentNode.classList.remove('has-keyboard');
      this.onKeyOption = this.inputs[this.onKeyIndex];
      this.onKeyOption.parentNode.classList.add('has-keyboard');

      this.scrollTo();
    }
  }, {
    key: 'onKey',
    value: function onKey(code, key) {
      var _this7 = this;

      if (code >= 65 && code <= 90) {
        if (this.timeoutResetSearch) {
          clearTimeout(this.timeoutResetSearch);
        }
        this.search += key.toLowerCase();
        var match = false;
        (0, _ds.forEach)(this.inputs, function (el, i) {
          var inputLabel = el.nextSibling.textContent.toLowerCase();
          inputLabel = inputLabel.replace(" ", "");
          if (inputLabel.indexOf(_this7.search) === 0 && match === false) {
            match = true;
            _this7.removeOptionKeyboard();
            _this7.onKeyIndex = i;
            _this7.onKeyOption = _this7.inputs[_this7.onKeyIndex];
            _this7.onKeyOption.parentNode.classList.add('has-keyboard');
            _this7.scrollTo();
          }
        });
        this.timeoutResetSearch = setTimeout(function () {
          _this7.search = '';
        }, 1000);
      }
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo() {
      var currentScroll = this.tplOptions.scrollTop;
      var listHeight = this.tplOptions.offsetHeight;
      var optionTop = this.onKeyOption.parentNode.offsetTop;
      var optionBottom = this.onKeyOption.parentNode.offsetHeight + this.onKeyOption.parentNode.offsetTop;

      if (optionBottom > listHeight + currentScroll) {
        this.tplOptions.scrollTop = optionBottom - listHeight;
      } else if (optionTop < currentScroll) {
        this.tplOptions.scrollTop = optionTop;
      }
    }
  }]);

  return MultiSelect;
}();

exports.default = MultiSelect;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

var _ds2 = __webpack_require__(29);

var _ds3 = _interopRequireDefault(_ds2);

var _flatpickr = __webpack_require__(2);

var _flatpickr2 = _interopRequireDefault(_flatpickr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Picker = function () {
  // @nodeEl:object:optional Dom element container of the pickers
  function Picker(nodeEl) {
    var _this = this;

    _classCallCheck(this, Picker);

    var container = typeof nodeEl !== 'undefined' ? nodeEl : document;
    var inputs = container.querySelectorAll('.ds-input input[data-picker]');
    var inputsRange = container.querySelectorAll('.ds-picker-range');

    (0, _ds.forEach)(inputs, function (el) {
      var picker = (0, _flatpickr2.default)(el, {
        minDate: 'today',
        allowInput: true,
        dateFormat: 'd/m/Y',
        position: 'below',
        nextArrow: '<i class="ds-ico ds-ico-right-chevron-mini"></i>',
        prevArrow: '<i class="ds-ico ds-ico-left-chevron-mini"></i>',
        onOpen: function onOpen(a, b, c) {
          return _this.onOpen(a, b, c);
        },
        onClose: function onClose(a, b, c) {
          return _this.onClose(a, b, c);
        },
        onMonthChange: function onMonthChange(a, b, c) {
          return _this.keepFocus(a, b, c);
        },
        onYearChange: function onYearChange(a, b, c) {
          return _this.keepFocus(a, b, c);
        }
      });

      el.addEventListener('keydown', function (e) {
        if (e.which === 27) {
          picker.close();
        }
      });
    });

    (0, _ds.forEach)(inputsRange, function (el) {
      var pickerRange = new _ds3.default(el);
    });

    (0, _ds.forEach)(container.querySelectorAll('.flatpickr-month'), function (el) {
      el.addEventListener('wheel', function (e) {
        e.stopPropagation();
      }, true);
    });

    // TODO: Must be refactored
    (0, _ds.forEach)(container.querySelectorAll('.flatpickr-mobile'), function (el) {
      el.addEventListener('focus', function () {
        el.previousElementSibling.classList.remove('is-empty');
      });
      el.addEventListener('blur', function () {
        if (el.value === '') {
          el.previousElementSibling.classList.add('is-empty');
        }
      });
    });
  }

  _createClass(Picker, [{
    key: 'onOpen',
    value: function onOpen(dObj, dateStr, picker) {
      if (dateStr === '') {
        picker.setDate('today', false);
      }
    }
  }, {
    key: 'onClose',
    value: function onClose(dObj, dateStr, picker) {
      if (picker.element.value !== '') {
        var inputDate = picker.parseDate(picker.element.value, "d/m/Y");
        if (dObj.length === 0 || inputDate.getTime() !== dObj[0].getTime()) {
          picker.setDate(inputDate, true);
        }
      }
    }
  }, {
    key: 'keepFocus',
    value: function keepFocus(dObj, dateStr, picker) {
      setTimeout(function () {
        return picker.element.focus();
      }, 10);
    }
  }]);

  return Picker;
}();

exports.default = Picker;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

var _flatpickr = __webpack_require__(2);

var _flatpickr2 = _interopRequireDefault(_flatpickr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PickerRange = function () {
  function PickerRange(container) {
    var _this = this;

    _classCallCheck(this, PickerRange);

    this.pickerStart = container.querySelector('input[data-picker-start]');
    this.pickerEnd = container.querySelector('input[data-picker-end]');

    (0, _ds.forEach)([this.pickerStart, this.pickerEnd], function (el) {
      var picker = (0, _flatpickr2.default)(el, {
        minDate: 'today',
        allowInput: true,
        dateFormat: 'd/m/Y',
        position: 'below',
        nextArrow: '<i class="ds-ico ds-ico-right-chevron-mini"></i>',
        prevArrow: '<i class="ds-ico ds-ico-left-chevron-mini"></i>',
        onOpen: function onOpen(a, b, c) {
          return _this.onOpen(a, b, c);
        },
        onClose: function onClose(a, b, c) {
          return _this.onClose(a, b, c);
        },
        onMonthChange: function onMonthChange(a, b, c) {
          return _this.keepFocus(a, b, c);
        },
        onYearChange: function onYearChange(a, b, c) {
          return _this.keepFocus(a, b, c);
        },
        onChange: function onChange(a, b, c) {
          return _this.onChange(a, b, c);
        },
        onDayCreate: function onDayCreate(a, b, c, d) {
          return _this.onDayCreate(a, b, c, d);
        }
      });
      el.addEventListener('keydown', function (e) {
        if (e.which === 27) {
          picker.close();
        }
      });
    });
  }

  _createClass(PickerRange, [{
    key: 'onOpen',
    value: function onOpen(dObj, dateStr, picker) {
      var _this2 = this;

      picker.redraw();
      if (this.pickerEnd.value === '' && this.pickerStart.value === '') {
        picker.setDate('today', false);
      }

      if (picker.element === this.pickerEnd) {
        var days = picker.days.querySelectorAll('.flatpickr-day');
        (0, _ds.forEach)(days, function (el) {
          el.addEventListener('mouseover', function () {
            return _this2.onDayHover(picker.days, el, picker);
          });
        });
      }
    }
  }, {
    key: 'onClose',
    value: function onClose(dObj, dateStr, picker) {
      if (picker.element.value !== '') {
        var inputDate = picker.parseDate(picker.element.value, "d/m/Y");
        if (dObj.length === 0 || inputDate.getTime() !== dObj[0].getTime()) {
          picker.setDate(inputDate, true);
          this.pickerEnd._flatpickr.redraw();
          this.pickerStart._flatpickr.redraw();
        }
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(dObj, dateStr, picker) {
      var _this3 = this;

      // Start date picker change
      if (picker.element === this.pickerStart) {
        var endDate = this._getTime(this.pickerEnd);
        if (endDate !== '' && dObj[0].getTime() > endDate) {
          this.pickerEnd._flatpickr.setDate('', false);
        }
        if (this.pickerEnd.value === '') {
          picker.close();
          setTimeout(function () {
            return _this3.pickerEnd.focus();
          }, 100); // Used setTimeout to fix IE bug on focus.
        }
      } else {
        // End date picker change
        var startDate = this._getTime(this.pickerStart);
        if (startDate !== '' && dObj[0].getTime() < startDate) {
          this.pickerStart._flatpickr.setDate(dObj[0].getTime(), false);
        } else if (this.pickerStart.value === '') {
          picker.close();
          setTimeout(function () {
            return _this3.pickerStart.focus();
          }, 10);
        }
      }
    }
  }, {
    key: 'onDayCreate',
    value: function onDayCreate(dObj, dateStr, picker, dayElem) {
      var dayElemTime = dayElem.dateObj.getTime();
      var startDate = this._getTime(this.pickerStart);
      var endDate = this._getTime(this.pickerEnd);

      if (startDate === dayElemTime || endDate === dayElemTime) {
        dayElem.classList.add('selected');
      }
      if (startDate === dayElemTime) {
        dayElem.classList.add('start');
      }
      if (endDate === dayElemTime) {
        dayElem.classList.add('end');
      }
      if (startDate !== '' && endDate !== '') {
        if (dayElemTime > startDate && dayElemTime < endDate) {
          dayElem.classList.add('inRange');
        }
      }
    }
  }, {
    key: 'onDayHover',
    value: function onDayHover(container, day, picker) {
      var startDay = container.querySelector('.flatpickr-day.start');
      var endDay = container.querySelector('.flatpickr-day.end');

      var inRangeDay = container.querySelectorAll('.flatpickr-day.inRangeHover');
      (0, _ds.forEach)(inRangeDay, function (el) {
        el.classList.remove('inRangeHover');
        el.classList.remove('last');
      });

      var hoverDate = picker.parseDate(day.getAttribute('aria-label'), "F d,Y");
      var startDate = this._getTime(this.pickerStart);
      var endDate = this._getTime(this.pickerEnd);
      if (hoverDate <= startDate || hoverDate <= endDate) {
        return false;
      }

      var next = [];
      while (startDay.nextElementSibling && !(startDay.nextElementSibling === day)) {
        next.push(startDay = startDay.nextElementSibling);
        startDay.classList.add('inRangeHover');
      }
      day.classList.add('last');
      day.classList.add('inRangeHover');
    }
  }, {
    key: 'keepFocus',
    value: function keepFocus(dObj, dateStr, picker) {
      setTimeout(function () {
        return picker.element.focus();
      }, 10);
    }
  }, {
    key: '_getTime',
    value: function _getTime(input) {
      if (input._flatpickr && input._flatpickr.selectedDates.length > 0) {
        return input._flatpickr.selectedDates[0].getTime();
      }
      return '';
    }
  }]);

  return PickerRange;
}();

exports.default = PickerRange;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ds = __webpack_require__(0);

var _ds2 = __webpack_require__(31);

var _ds3 = _interopRequireDefault(_ds2);

var _ds4 = __webpack_require__(32);

var _ds5 = _interopRequireDefault(_ds4);

var _ds6 = __webpack_require__(33);

var _ds7 = _interopRequireDefault(_ds6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function Filter() {
  _classCallCheck(this, Filter);

  (0, _ds.forEach)(document.querySelectorAll('.ds-filter'), function (el) {
    var filterAdvanced = new _ds3.default(el);
  });

  (0, _ds.forEach)(document.querySelectorAll('.ds-filter-conversation .ds-filter-dropdown'), function (el) {
    var filterConversational = new _ds5.default(el);
  });

  (0, _ds.forEach)(document.querySelectorAll('.ds-filter-search'), function (el) {
    var search = new _ds7.default(el);
  });
};

exports.default = Filter;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

var _ds2 = __webpack_require__(3);

var _ds3 = _interopRequireDefault(_ds2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterAdvanced = function () {
  function FilterAdvanced(el) {
    var _this = this;

    _classCallCheck(this, FilterAdvanced);

    this.el = el;
    this.breakpointMobile = (0, _ds.getBreakPoint)('grid-breakpoints-md');
    this.isMobile = window.innerWidth >= this.breakpointMobile ? false : true;
    this.dropdowns = [];
    this.inputCheckbox = this.el.querySelectorAll('input[type="checkbox"]');
    this.btnTrigger = this.el.querySelector('.ds-filter__trigger');
    this.btnCounter = this.btnTrigger.querySelector('.ds-filter-dropdown__counter');

    (0, _ds.forEach)(this.el.querySelectorAll('.ds-filter-dropdown'), function (elDropdown, i) {
      _this.dropdowns[i] = new _ds3.default(elDropdown, false);
    });
    this.el.querySelector('.ds-filter__clear').addEventListener('click', function () {
      return _this.clear(_this.el);
    });
    this.el.querySelector('.ds-ico-close-icon').addEventListener('click', function () {
      return _this.hide(_this.el);
    });
    this.btnTrigger.addEventListener('click', function () {
      return _this.show(_this.el);
    });

    window.addEventListener('resize', function () {
      return _this.onResize();
    });

    this.updateCounter();
  }

  _createClass(FilterAdvanced, [{
    key: 'clear',
    value: function clear() {
      var event = document.createEvent('Event');
      event.initEvent('change', true, true);

      (0, _ds.forEach)(this.inputCheckbox, function (input) {
        input.checked = false;
        input.dispatchEvent(event);
      });
      (0, _ds.forEach)(this.el.querySelectorAll('.ds-radio:first-child input'), function (input) {
        input.checked = true;
        input.dispatchEvent(event);
      });
    }
  }, {
    key: 'show',
    value: function show() {
      this.el.classList.add('is-visible');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.el.classList.remove('is-visible');
      this.updateCounter();
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var counterInputsChecked = [];
      (0, _ds.forEach)(this.inputCheckbox, function (input) {
        if (input.checked) {
          counterInputsChecked.push(input);
        }
      });

      return counterInputsChecked.length;
    }
  }, {
    key: 'updateCounter',
    value: function updateCounter() {
      var counter = this.getCounter();
      var hasCounter = this.btnTrigger.classList.contains('has-counter');
      this.btnCounter.textContent = counter;

      if (counter < 1 && hasCounter) {
        return this.btnTrigger.classList.remove('has-counter');
      }
      if (counter > 0 && !hasCounter) {
        return this.btnTrigger.classList.add('has-counter');
      }
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      if (window.innerWidth >= this.breakpointMobile && this.isMobile) {
        this.isMobile = false;
        (0, _ds.forEach)(this.dropdowns, function (dropdown) {
          dropdown.updateLabel();
        });
      }
      if (window.innerWidth < this.breakpointMobile && !this.isMobile) {
        this.isMobile = true;
        (0, _ds.forEach)(this.dropdowns, function (dropdown) {
          dropdown.resetLabel();
        });
      }
    }
  }]);

  return FilterAdvanced;
}();

exports.default = FilterAdvanced;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ds = __webpack_require__(0);

var _ds2 = __webpack_require__(3);

var _ds3 = _interopRequireDefault(_ds2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterConversational = function (_Dropdown) {
  _inherits(FilterConversational, _Dropdown);

  function FilterConversational(el) {
    _classCallCheck(this, FilterConversational);

    var _this = _possibleConstructorReturn(this, (FilterConversational.__proto__ || Object.getPrototypeOf(FilterConversational)).call(this, el, true));

    _this.breakpointMobileSmall = (0, _ds.getBreakPoint)('grid-breakpoints-sm');

    // Init default position for list
    document.body.appendChild(_this.listContainer);
    _this.showDropdown();
    _this.hideDropdown();

    window.addEventListener('resize', function () {
      return _this.calcListPosition();
    });
    return _this;
  }

  _createClass(FilterConversational, [{
    key: 'hideDropdown',
    value: function hideDropdown() {
      _get(FilterConversational.prototype.__proto__ || Object.getPrototypeOf(FilterConversational.prototype), 'hideDropdown', this).call(this);
      this.el.style.marginBottom = '';
      this.listContainer.classList.remove('is-open');
    }
  }, {
    key: 'showDropdown',
    value: function showDropdown() {
      _get(FilterConversational.prototype.__proto__ || Object.getPrototypeOf(FilterConversational.prototype), 'showDropdown', this).call(this);
      this.listContainer.classList.add('is-open');
      this.el.style.marginBottom = '';
      this.calcListPosition();
      if (window.innerWidth < this.breakpointMobileSmall) {
        var listRect = this.listContainer.getBoundingClientRect();
        this.el.style.marginBottom = listRect.height + 20 + 'px';
      }
    }
  }, {
    key: 'calcListPosition',
    value: function calcListPosition() {
      var elRect = this.el.getBoundingClientRect();
      var listRect = this.listContainer.getBoundingClientRect();
      var offsetLeft = (listRect.width - elRect.width) / 2;

      this.listContainer.style.left = Math.round(elRect.left + (window.pageXOffset || document.documentElement.scrollLeft) - offsetLeft) + 'px';
      this.listContainer.style.top = Math.round(elRect.bottom + (window.pageYOffset || document.documentElement.scrollTop)) + 'px';
      this.listContainer.style.width = '';

      if (window.innerWidth < this.breakpointMobileSmall) {
        this.listContainer.style.left = 0;
        this.listContainer.style.width = '100%';
      }
    }
  }]);

  return FilterConversational;
}(_ds3.default);

exports.default = FilterConversational;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ds = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterSearch = function () {
  function FilterSearch(el) {
    var _this = this;

    _classCallCheck(this, FilterSearch);

    this.container = el;
    this.input = this.container.querySelector('.ds-input--search input');
    this.closeBtn = this.container.querySelector('.ds-filter-search__close');
    this.actionBtn = this.container.querySelector('.ds-filter-search__action');
    this.input.addEventListener('focus', function () {
      return _this.show();
    });
    this.closeBtn.addEventListener('click', function () {
      return _this.hide();
    });
  }

  _createClass(FilterSearch, [{
    key: 'show',
    value: function show() {
      var _this2 = this;

      this.container.classList.add('is-open');
      setTimeout(function () {
        _this2.actionBtn.classList.add('is-visible');
      }, 100);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.container.classList.remove('is-open');
      this.actionBtn.classList.remove('is-visible');
    }
  }]);

  return FilterSearch;
}();

exports.default = FilterSearch;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"object"===( false?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e.LazyLoad=t()}(this,function(){"use strict";var e={elements_selector:"img",container:document,threshold:300,data_src:"src",data_srcset:"srcset",class_loading:"loading",class_loaded:"loaded",class_error:"error",callback_load:null,callback_error:null,callback_set:null},t=function(e,t){return e.getAttribute("data-"+t)},n=function(e,t,n){return e.setAttribute("data-"+t,n)},r=function(e){return e.filter(function(e){return!t(e,"was-processed")})},s=function(e,t){var n=new e(t),r=new CustomEvent("LazyLoad::Initialized",{detail:{instance:n}});window.dispatchEvent(r)},o=function(e,n){var r=n.data_srcset,s=e.parentElement;if("PICTURE"===s.tagName)for(var o,a=0;o=s.children[a];a+=1)if("SOURCE"===o.tagName){var i=t(o,r);i&&o.setAttribute("srcset",i)}},a=function(e,n){var r=n.data_src,s=n.data_srcset,a=e.tagName,i=t(e,r);if("IMG"===a){o(e,n);var c=t(e,s);return c&&e.setAttribute("srcset",c),void(i&&e.setAttribute("src",i))}"IFRAME"!==a?i&&(e.style.backgroundImage='url("'+i+'")'):i&&e.setAttribute("src",i)},i=!!document.body.classList,c=function(e,t){i?e.classList.add(t):e.className+=(e.className?" ":"")+t},l=function(e,t){i?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},u=function(e,t){e&&e(t)},f=function(e,t,n){e.removeEventListener("load",t),e.removeEventListener("error",n)},d=function(e,t){var n=function n(s){_(s,!0,t),f(e,n,r)},r=function r(s){_(s,!1,t),f(e,n,r)};e.addEventListener("load",n),e.addEventListener("error",r)},_=function(e,t,n){var r=e.target;l(r,n.class_loading),c(r,t?n.class_loaded:n.class_error),u(t?n.callback_load:n.callback_error,r)},v=function(e,t){["IMG","IFRAME"].indexOf(e.tagName)>-1&&(d(e,t),c(e,t.class_loading)),a(e,t),n(e,"was-processed",!0),u(t.callback_set,e)},m=function(t,n){this._settings=_extends({},e,t),this._setObserver(),this.update(n)};m.prototype={_setObserver:function(){var e=this;if("IntersectionObserver"in window){var t=this._settings;this._observer=new IntersectionObserver(function(n){n.forEach(function(n){if(n.intersectionRatio>0){var r=n.target;v(r,t),e._observer.unobserve(r)}}),e._elements=r(e._elements)},{root:t.container===document?null:t.container,rootMargin:t.threshold+"px"})}},update:function(e){var t=this,n=this._settings,s=e||n.container.querySelectorAll(n.elements_selector);this._elements=r(Array.prototype.slice.call(s)),this._observer?this._elements.forEach(function(e){t._observer.observe(e)}):(this._elements.forEach(function(e){v(e,n)}),this._elements=r(this._elements))},destroy:function(){var e=this;this._observer&&(r(this._elements).forEach(function(t){e._observer.unobserve(t)}),this._observer=null),this._elements=null,this._settings=null}};var b=window.lazyLoadOptions;return b&&function(e,t){if(t.length)for(var n,r=0;n=t[r];r+=1)s(e,n);else s(e,t)}(m,b),m});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.map