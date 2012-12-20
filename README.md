# dal

DOM abstraction layer _(homemade alternative to jquery)_

# Example

html:

    <div id="foo">Bad news ...</div>
    <script src="dal.js"></script>

js:

    dal('foo').innerHTML = 'It works!';

# Install

    $ npm install dal

# Status

dal is a work-in-progress and is only intended for my personal use at this
time. 

# Api

## el = dal(selector)

Returns the element `el` which id is _selector_

If no _selector_ is especified, a `div` element is created under `document`
and returned

`el` is augmented with the following methods

## Element management

### el.add(tagName, content)

Appends a new element to the element

### el.del()

Removes the element itself

### el.empty()

Removes all the element children

## CSS alteration

### el.addClass(className)

Adds `className` to the element

### el.hide()

Hides the element

### el.show()

Shows the element

### el.overflow()

Determines if the element is overflowing its bounds

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
