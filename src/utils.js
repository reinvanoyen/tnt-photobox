"use strict";

var utils = {};

utils.loadImage = function( src, cb ) {

	var img = new Image();

	img.onload = function() {

		cb( img );
	}

	img.src = src;
};

utils.proxy = function( c, f ) {

	return function() {

		return f.apply( c, arguments );
	};
};

module.exports = utils;