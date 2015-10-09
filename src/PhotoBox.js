/*

TNT PHOTOBOX
------------

Author: Rein Van Oyen <rein@tnt.be>
Website: http://www.tnt.be
Repo: http://github.com/reinvanoyen/tnt-photobox
Issues: http://github.com/reinvanoyen/tnt-photobox/issues

*/

"use strict";

var $ = require( 'jquery' );
var utils = require( './utils.js' );

var defaultOptions = {
};

var PhotoBox = function( $trigger, options ) {

	this.$trigger = $trigger;
	this.options = $.extend( defaultOptions, options );

	this.build();
};

PhotoBox.prototype.build = function() {
	// Do something
};

module.exports = PhotoBox;