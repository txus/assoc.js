[![build status](https://secure.travis-ci.org/txus/assoc.js.png)](http://travis-ci.org/txus/assoc.js)
# assoc.js

Simple associative arrays for Javascript!

Inspired by James Edward Gray II's [video](http://www.heartmindcode.com/blog/2011/04/james-edward-gray-associative-arrays-and-ruby-hashes/) an associative arrays in Ruby.

Associative arrays are arrays of arrays, and they work like this:

    [['a', 'b'], ['c', 'd']]

When you look up 'a' you get 'b'; when you look up 'c' you get 'd'.
That's the simplest approach. But their useful feature is **shadowing**.
Let's prepend another element with a 'c' key:

    [['c', 'f'], ['a', 'b'], ['c', 'd']]

Now, if you look up `'c'`, you get `'f'` &mdash; but `['c', 'd']` still
exists. By just removing the first `['c', 'f']`, when you look up `'c'`
again, you get your old 'd' back. So you get... sort of key/value stores
with versioning!

## Install

    $ npm install assoc

# Usage

    AssociativeArray = require('assoc');

You can initialize an Associative Array with either an Object or an array of
arrays.

    var array = new AssociativeArray({ 
      a: 'b',
      c: 'd'
    }),
      another_array = new AssociativeArray([['a', 'b'], ['c', 'd']]);

Using `#assoc` you retrieve a value from a key:

    array.assoc('a');
    // => 'b'

    array.assoc('c');
    // => 'd'

Using `#rassoc` you get the key from a value:

    array.rassoc('b');
    // => 'a'

    array.rassoc('d');
    // => 'c'

And remember the shadowing:

    var array = new AssociativeArray({
      a: 'b',
      c: 'd'
    });

    array.unshift({a: 'f'});
    array.assoc('a');
    // => 'f'

    array.shift();

    array.assoc('a');
    // => 'b'

## Note on Patches/Pull Requests
 
* Fork the project.
* Make your feature addition or bug fix.
* Add specs for it. This is important so I don't break it in a
  future version unintentionally.
* Commit, do not mess with rakefile, version, or history.
  If you want to have your own version, that is fine but bump version
  in a commit by itself I can ignore when I pull.
* Send me a pull request. Bonus points for topic branches.

## Copyright

Released under the MIT License.

Copyright (c) 2011 Josep M. Bach.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
