/**
 * Data registry.
 *
 * @class OO.Registry
 * @mixins OO.EventEmitter
 *
 * @constructor
 */
oo.Registry = function OoRegistry() {
	// Mixin constructors
	oo.EventEmitter.call( this );

	// Properties
	this.registry = {};
};

/* Inheritance */

oo.mixinClass( oo.Registry, oo.EventEmitter );

/* Events */

/**
 * @event register
 * @param {string} name
 * @param {Mixed} data
 */

/* Methods */

/**
 * Associate one or more symbolic names with some data.
 *
 * Only the base name will be registered, overriding any existing entry with the same base name.
 *
 * @method
 * @param {string|string[]} name Symbolic name or list of symbolic names
 * @param {Mixed} data Data to associate with symbolic name
 * @fires register
 * @throws {Error} Name argument must be a string or array
 */
oo.Registry.prototype.register = function ( name, data ) {
	if ( typeof name !== 'string' && !Array.isArray( name ) ) {
		throw new Error( 'Name argument must be a string or array, cannot be a ' + typeof name );
	}
	var i, len;
	if ( Array.isArray( name ) ) {
		for ( i = 0, len = name.length; i < len; i++ ) {
			this.register( name[i], data );
		}
	} else if ( typeof name === 'string' ) {
		this.registry[name] = data;
		this.emit( 'register', name, data );
	} else {
		throw new Error( 'Name must be a string or array of strings, cannot be a ' + typeof name );
	}
};

/**
 * Gets data for a given symbolic name.
 *
 * Lookups are done using the base name.
 *
 * @method
 * @param {string} name Symbolic name
 * @returns {Mixed|undefined} Data associated with symbolic name
 */
oo.Registry.prototype.lookup = function ( name ) {
	return this.registry[name];
};
