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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Application bundle file
var $ = Clappr.$;
var BUNNY = 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8';
var SINTEL = 'https://static.playmedia-cdn.net/resources/sample/h264_sintel_trailer-1080p.mp4';
var config = {
  parent: '.player',
  autoPlay: !Clappr.Browser.isMobile,
  disableKeyboardShortcuts: true,
  disableVideoTagContextMenu: true,
  autoSeekFromUrl: false,
  width: '100%',
  height: '100%'
}; // Configure playback

config.playback = {
  playInline: true,
  recycleVideo: true
}; // Add Chromecast support

config.plugins = [ChromecastPlugin];
config.chromecast = {
  appId: '9DFB77C0',
  // Clappr default app.
  media: {
    type: ChromecastPlugin.None,
    title: 'Live'
  }
};
config.source = BUNNY;
var player = new Clappr.Player(config);

function requestSource(cb) {
  $.ajax({
    type: 'GET',
    url: '/source.json',
    dataType: 'json',
    success: function (data) {
      console.log('data', data);
      cb(data.source);
    }.bind(this),
    error: function error(xhr, type) {
      console.log('Request failed!', xhr, type);
      cb('request.failed');
    }
  });
}

var ajaxButton = $('<button>').addClass('button').text('zap!').on('click', function () {
  player.consent();
  requestSource(function (src) {
    player.stop(); // Will load media in Chromecast (if session initialized)

    player.load(src, null, true);
  });
});
var timerButton = $('<button>').addClass('button').text('zap in 3 seconds!').on('click', function () {
  player.consent();
  setTimeout(function () {
    player.stop();
    player.load(SINTEL, null, true);
  }, 3000);
});
$('.buttons').append(ajaxButton).append(timerButton);

/***/ })
/******/ ]);