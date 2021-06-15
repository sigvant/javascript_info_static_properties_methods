Class extends Object?
importance: 3
As we know, all objects normally inherit from Object.prototype and 
get access to “generic” object methods like hasOwnProperty etc.

For instance:

class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

// hasOwnProperty method is from Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true

But if we spell it out explicitly like "class Rabbit extends Object", 
then the result would be different from a simple "class Rabbit"?

What’s the difference?

Here’s an example of such code (it doesn’t work – why? fix it?):

class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error

## attempt at solution

// First let's see why the latter code doesn't work. The reason becomes
// obvious if we try to run it. An inheriting class constructor must call
// super(). Otherwise 'this' won't be 'defined


// SO here's the fix:


class Rabbit extends Object {
	constructor(name) {
		super(); // need to call the parent constructor when inheriting
		this.name = name;
	}
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name')); //true

// but that's not all yet

// even after the fix, there's still important difference in 
// 'class Rabbit extends Object' versus 'class Rabbit'

// as we know, the 'extends' syntax sets up two prototypes:

// 1. Between 'prototype' of the constructor functions (for methods)
// 2. Between the constructor functions themselves (for static methods)

// in our case, for class rabbit extends Object it means:

class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true

// SO 'Rabbit' now provides access to static methods of Object via
// Rabbit, like this:

class Rabbit extends Object {}

// normally we call Object.getOwnPropertyNames
alert (Rabbit.getOwnPropertyNames({a:1, b:2})); //a,b

// but if we don't have extends Object, then Rabbit.__proto__ is
// not set to Object.

// Here's the demo

class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // as any function by default

// error, no such function in Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error

// so Rabbit doesn't provide access to static methods of Object in that case.

// by the way, Function.prototype has 'generic' function methods, like 'call',
// 'bind', etc. They are ultimately available in both cases, because for the
// built-in  Object constructor, Object.__proto__ === Fuction.prototype.

// in short, there are two differences:

// class Rabbit => Rabbit.__proto__ === Function.prototype
// class Rabbit extends Object => needs to call super() in constructor Rabbit.__proto__ === Object



