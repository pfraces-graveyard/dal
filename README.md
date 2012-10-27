# dal

DOM abstraction layer (homemade alternative to jquery)

# Example

html:

    <div id="foo">Bad news ...</div>

js:

    var dal = require('dal');

    dal.el('foo').innerHTML = 'It works!';

# Install

    $ npm install dal

# Status

dal is a work-in-progress and is only intended for my personal use at this
time. 

# Api

## element = el(id)

Returns the element which matches id

`element' is augmented with the following methods:

### element.hide()

Hides the element

### element.show()

Shows the element

### element.addClass(className)

Adds `className` to the element

# Contribute

Get the sources at github: http://github.com/pfraces/dal

# License

(The MIT License)

Copyright (c) 2012 [pfraces](http://github.com/pfraces)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
