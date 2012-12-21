# DAL

DOM Astraction Layer. A DOM manipulator micro library

# Example

```html
<div id="content">Bad news...</div>
<script src="dal.js"></script>
```

```javascript
var content = dal('content');

content
  .empty()
  .add('h1', 'It works!')
  .color('#F99', 'red')
  .size({ width: '300px', height: '300px' });

while (!content.overflow()) content.add('h1', 'foo');
content.add('h1', 'bar');
```

If you get

    Bad news...

please, [create an issue](https://github.com/pfraces/dal/issues) ;)

But if it works you'll get something like this

![it works!](https://github.com/pfraces/dal/raw/master/itworks.png)

# Install

    $ npm install dal

# Status

DAL is a work-in-progress and is only intended for my personal use at this
time. 

# API

Now the API is chainable!

## el = dal(selector)

Returns the element `el` selected by `selector` augmented with useful methods

If no `selector` is especified, a `div` element is created and is returned
being untied to the `document.body` (so is invisible)

You can create an empty element and tie it to the `document.body` with `draw`

    dal().draw();

The `selector` can be

*   `string`: this returns the element with id = `selector`
*   `object`: if an DOM element is received, it will be augmented as well

`el` is augmented with the following methods

## Element management

### el.add(elm, content)

Appends a new element to the element

`elm` can be a string (for example `'p'` or `'div'`) or an existing DOM element

### el.copy()

Returns a copy of itself excluding children

### el.clone()

Returns a clone of itself including its children nodes

### el.del()

Removes the element itself

### el.empty()

Removes all the element children

## Style

### el.addClass(className)

Adds `className` to the element

### el.hide()

Hides the element. The layout ignores it

### el.clear()

Makes the element invisible, but affecting the layout

### el.show()

Shows the element

### el.color(bgcolor, fgcolor)

Changes the background and text color of the element

### el.size(opts)

Changes the size of the element

`opts` is an object with the following properties:

*   **width:** Determines the width of the element
*   **height:** Determines the height of the element

## Misc methods

### el.draw()

Adds the element as a child node of the `document.body` so it is visible unless
it becomes hidden with `display:none` or `visibility:hidden`

### el.html(html)

Sets the `innerHTML` value of the element

### el.move(x, y)

Makes the element absotule positioned at `(x, y)`

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
