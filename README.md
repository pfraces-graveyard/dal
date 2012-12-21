# DAL

DOM abstraction layer _(homemade alternative to jquery)_

# Example

html:

    <div id="content">Bad news...</div>
    <script src="dal.js"></script>

js:

    var content = dal('content');

    content
      .empty()
      .add('h1', 'It works!')
      .color('#F99', 'red')
      .size('300px', '300px');

    while (!content.overflow()) content.add('h1', 'foo');
    content.add('h1', 'bar');

If you get
![bad news](https://github.com/pfraces/dal/raw/master/badnews.png)
please, [create an issue](https://github.com/pfraces/dal/issues)

Better if you get something like this
![bad news](https://github.com/pfraces/dal/raw/master/badnews.png)

# Install

    $ npm install dal

# Status

DAL is a work-in-progress and is only intended for my personal use at this
time. 

# API

Now the API is chainable!

## el = dal(selector)

Returns the element `el` which id is _selector_

If no _selector_ is especified, a `div` element is created under
`document.body` (so is visible) and its returned instead

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

### el.color(bgcolor, fgcolor)

Changes the background and text color of the element

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
