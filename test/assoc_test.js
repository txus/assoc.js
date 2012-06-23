var testosterone = require('testosterone')({post: 3000, sync: true, title: 'assoc.js'}),
    assert = testosterone.assert,
    AssociativeArray = require('./../lib/assoc');

testosterone

  .add('#assoc retrieves a value', function () {
    var array = new AssociativeArray({
      a: 'b',
      c: 'd'
    });

    assert.equal(array.assoc('a'), 'b');
    assert.equal(array.assoc('c'), 'd');
  })

  .add('#assoc retrieves a shadowed value', function () {
    var array = new AssociativeArray({
      a: 'b',
      c: 'd',
    });

    array.unshift({a:'f'});
    assert.equal(array.assoc('a'), 'f');

    array.shift();
    assert.equal(array.assoc('a'), 'b');
  })

  .add('#rassoc retrieves the key from a value', function () {
    var array = new AssociativeArray({
      a: 'b',
      c: 'd'
    });

    assert.equal(array.rassoc('b'), 'a');
    assert.equal(array.rassoc('d'), 'c');
  })

  .add('#rassoc retrieves the key from a shadowed value', function () {
    var array = new AssociativeArray({
      a: 'b',
      c: 'd'
    });

    array.unshift({f:'b'});
    assert.equal(array.rassoc('b'), 'f');

    array.shift();
    assert.equal(array.rassoc('b'), 'a');
  })

  .add('#assoc retrieves a value when initialized with an array', function () {
    var array = new AssociativeArray([['a', 'b'], ['c', 'd']]);

    assert.equal(array.assoc('a'), 'b');
    assert.equal(array.assoc('c'), 'd');
  })

  .add('#assoc retrieves a shadowed value when initialized with an array', function () {
    var array = new AssociativeArray([['a', 'b'], ['c', 'd']]);

    array.unshift(['a', 'f']);
    assert.equal(array.assoc('a'), 'f');

    array.shift();
    assert.equal(array.assoc('a'), 'b');
  })

  .add('#rassoc retrieves a key from a value when initialized with an array', function () {
    var array = new AssociativeArray([['a', 'b'], ['c', 'd']]);

    assert.equal(array.rassoc('b'), 'a');
    assert.equal(array.rassoc('d'), 'c');
  })

  .add('#rassoc retrieves a shadowed key from a value when initialized with an array', function () {
    var array = new AssociativeArray([['a', 'b'], ['c', 'd']]);

    array.unshift(['f', 'b']);
    assert.equal(array.rassoc('b'), 'f');

    array.shift();
    assert.equal(array.rassoc('b'), 'a');
  })

  .run(function () {
    require('util').print('done!');
  });
