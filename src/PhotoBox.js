"use strict";

const $ = require( 'jquery' ),
	util = require( './utils' )
;

class Photobox {

	constructor( $element ) {

		this.$element = $element;
		this.index = null;

		this.build();
	}

	build() {

		this.$overlay = $( '<div>' )
			.addClass( 'tnt-photobox-overlay' )
			.addClass( 'hidden' )
			.appendTo( 'body' )
		;

		this.$close = $( '<button>' )
			.addClass( 'tnt-photobox-close' )
			.appendTo( this.$overlay )
		;

		this.$next = $( '<button>' )
			.addClass( 'tnt-photobox-next' )
			.appendTo( this.$overlay )
			.click( util.proxy( this, this.openNext ) )
		;

		this.$prev = $( '<button>' )
			.addClass( 'tnt-photobox-prev' )
			.appendTo( this.$overlay )
			.click( util.proxy( this, this.openPrev ) )
		;

		this.$box = $( '<div>' )
			.appendTo( this.$overlay )
		;

		this.$element.click( util.proxy( this, this.click ) );
		this.$close.click( util.proxy( this, this.close ) );
	}

	click( e ) {

		this.open( $( e.currentTarget ) );

		e.preventDefault();
	}

	close() {

		this.$overlay
			.addClass( 'hidden' )
		;
	}

	openNext() {

		this.openByIndex( this.index + 1 );
	}

	openPrev() {

		this.openByIndex( this.index - 1 );
	}

	openByIndex( i ) {

		let $element = this.$element.eq( i );
		this.open( $element );
	}

	open( $element ) {

		this.$overlay
			.removeClass( 'hidden' )
			.addClass( 'loading' )
		;

		let i = this.$element.index( $element ),
			src = $element.attr( 'href' )
		;

		$element.trigger( 'photobox:open', [ this, i, src ] );

		this.index = i;

		this.$box.empty();

		util.loadImage( src, util.proxy( this, this.installImage ) );
	}

	installImage( img ) {

		$( img )
			.appendTo( this.$box )
		;

		this.$overlay
			.removeClass( 'loading' )
		;
	}
}

module.exports = Photobox;