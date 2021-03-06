/*!
 * Factory test suite.
 */

( function ( oo ) {

QUnit.module( 'OO.Factory' );

/* Stubs */

oo.FactoryObjectStub = function OoFactoryObjectStub( a, b, c, d ) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
};

oo.FactoryObjectStub.static = {};

oo.FactoryObjectStub.static.name = 'factory-object-stub';

/* Tests */

QUnit.test( 'register', 2, function ( assert ) {
	var factory = new oo.Factory();
	assert.throws(
		function () {
			factory.register( 'not-a-function' );
		},
		Error,
		'Throws an exception when trying to register a non-function value as a constructor'
	);

	factory.register( oo.FactoryObjectStub );
	assert.strictEqual( factory.lookup( 'factory-object-stub' ), oo.FactoryObjectStub );
} );

QUnit.test( 'create', 3, function ( assert ) {
	var obj,
		factory = new oo.Factory();

	assert.throws(
		function () {
			factory.create( 'factory-object-stub', 23, 'foo', { 'bar': 'baz' } );
		},
		Error,
		'Throws an exception when trying to create a object of an unregistered type'
	);

	factory.register( oo.FactoryObjectStub );

	obj = factory.create( 'factory-object-stub', 16, 'foo', { 'baz': 'quux' }, 5 );

	assert.deepEqual(
		obj,
		new oo.FactoryObjectStub( 16, 'foo', { 'baz': 'quux' }, 5 ),
		'Creates an object of the registered type and passes through arguments'
	);

	assert.strictEqual(
		obj instanceof oo.FactoryObjectStub,
		true,
		'Creates an object that is an instanceof the registered constructor'
	);
} );

QUnit.test( 'lookup', 1, function ( assert ) {
	var factory = new oo.Factory();
	factory.register( oo.FactoryObjectStub );
	assert.strictEqual( factory.lookup( 'factory-object-stub' ), oo.FactoryObjectStub );
} );

}( OO ) );
