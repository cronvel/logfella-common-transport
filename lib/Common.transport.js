/*
	Logfella Common Transport

	Copyright (c) 2015 - 2019 Cédric Ronvel

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;



// Empty constructor, it is just there to support instanceof operator
function CommonTransport( logger , config = {} ) {
	this.logger = null ;
	this.monitoring = false ;
	this.minLevel = 0 ;
	this.maxLevel = 7 ;
	this.messageFormatter = logger.messageFormatter.text ;
	this.timeFormatter = logger.timeFormatter.dateTime ;

	Object.defineProperty( this , 'logger' , { value: logger } ) ;

	if ( config.monitoring !== undefined ) { this.monitoring = !! config.monitoring ; }

	if ( config.minLevel !== undefined ) {
		if ( typeof config.minLevel === 'number' ) { this.minLevel = config.minLevel ; }
		else if ( typeof config.minLevel === 'string' ) { this.minLevel = this.logger.levelHash[ config.minLevel ] ; }
	}

	if ( config.maxLevel !== undefined ) {
		if ( typeof config.maxLevel === 'number' ) { this.maxLevel = config.maxLevel ; }
		else if ( typeof config.maxLevel === 'string' ) { this.maxLevel = this.logger.levelHash[ config.maxLevel ] ; }
	}

	if ( config.messageFormatter ) {
		if ( typeof config.messageFormatter === 'function' ) { this.messageFormatter = config.messageFormatter ; }
		else { this.messageFormatter = this.logger.messageFormatter[ config.messageFormatter ] ; }
	}

	if ( config.timeFormatter ) {
		if ( typeof config.timeFormatter === 'function' ) { this.timeFormatter = config.timeFormatter ; }
		else { this.timeFormatter = this.logger.timeFormatter[ config.timeFormatter ] ; }
	}
}

module.exports = CommonTransport ;



CommonTransport.prototype.transport = function transport( data , cache ) {} ;
CommonTransport.prototype.shutdown = function shutdown() {} ;

