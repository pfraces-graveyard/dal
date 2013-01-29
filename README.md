# DAL

DOM Astraction Layer. A DOM manipulator micro-library

## Featuring

*   Less than 200 lines of annotated source
*   Chainable API

# Example

```html
<div id="content">Bad news...</div>
<script src="dal.js"></script>
```

```javascript
var content = dal('content');

content
  .clear()
  .add('h1', 'It works!')
  .color({ bg: '#F99', fg: 'red' })
  .size({ width: '300px', height: '300px' });

while (!content.full()) content.add('h1', 'foo');
content.add('h1', 'bar');
```

If it works you'll end with something like this

![it works!](https://github.com/pfraces/dal/raw/master/itworks.png)

# Install

    $ component install dal

# Status

DAL is a work-in-progress and is only intended for my personal use at this
time. 

# Documentation

## dal(el)

Gets a DOM element and returns an object with methods for dealing with that
element

`el` _(Optional)_: If no element is passed, a `div` element will be created
and used, but also detached from the `document.body` (so is invisible) by
default

*   _[String]_ id of the DOM element.
      If it does not exist, returns an attached div element, using the
      argument received as id of that div.
*   _[Object: DOM Element]_ 

## dal.getHtml()

Returns the innerHTML value from `el`

## dal.toHtml()

Returns the HTML representation of `el`

## dal.getChildren()

Returns an array of the childNodes of `el` as `dal` elements

## dal.getColor()

Returns an object

    {
      bg: `el` background color,
      fg: `el` foreground color
    }

## dal.isSame(target)

Determines if `target` and `el` are the same DOM element

`target`

*   _[Object: DOM Element]_
*   _[Object: DAL instance]_

## dal.isUnder(target)

Determines whether `el` is descendant of `target`

`target`

*   _[Object: DOM Element]_
*   _[Object: DAL instance]_

## dal.isFull()

Determines whether `el` is overflowing its bounds

## dal.isEmpty()

Determines whether `el` has any child

## dal.isTag(tagName)

Determines whether `el` is a tag and (if passed) its a `tagName` tag

`tagName` _(Optional)_: _[String]_

## dal.hasClass(className)

Determines whether `className` is a class of `el`

`className`: _[String]_

# Chainable API

The rest is a collection of methods for managing the DOM element `el`
received with the constructor

Every one of them is chainable

# Element management methods

## dal.attach()

Attaches `el` to the `document.body` if it was not attached yet

## dal.detach()

Detaches `el` from his parent if it has one

## dal.add(newEl, content)

Attaches a new element to `el`

`newEl`:

*   _[Object: DAL instance]_ 
*   _[Object: DOM Element]_

*   _[String]_ An element is created and attached

        self().add('h1', 'Hello world!')

`content` _(Optional)_: _[String]_ Default content for the new element

## dal.clear()

Removes all the children of `el`

## dal.copy()

Returns a copy of itself excluding its children nodes

## dal.clone()

Returns a clone of itself including its children nodes

## dal.parent()

Returns the parent of `el`

## dal.first()

Returns the first child of `el`

## dal.last()

Returns the last child of `el`

## dal.lastLeaf()

Returns the last leaf element `el` traversing through its `lastChild`s

## dal.traverse(opts)
 
Traverses recursively through the elements in `el`

`opts`: _[Object]_

*   `before (el)` **_(Optional)_ [Function]**
        Called before any of the children are traversed

*   `each (el)` **_(Optional)_ [Function]**
        Called on each child

*   `after (el)` **_(Optional)_ [Function]**
        Called after any of the children are traversed

The node received by `before`, `each` and `after` is a dal object pointing
to the current DOM element in the recursion

## dal.path(target)

Returns a new `dal` object containing a tree composed with shallow copies
from `target` to `el` 

If `el` is not under `target`, returns `undefined`
If `el` and `target` are the same returns a shallow copy of `el`

## dal.show()

Makes `el` visible (is if is attached to the `document.body`)

## dal.hide()

Makes `el` invisible and ignored by the layout, but behaving as when
visible

## dal.clean()

Makes `el` invisible but respected by the layout

## dal.move(opts)

Makes the element absolute positioned at `(opts.x, opts.y)`

Setting the optional `opts.relative` to `true` causes the movement to be
relative to its parent. Its required to alter the parent `position` to
`relative` for this to work, so this setting may cause unexpected
behaviour.

# CSS style methods

## dal.color(opts)

Changes the background and text color of `el`

`opts`: _[Object]_

*   `opts.bg`: Determines the backgroud color
*   `opts.fg`: Determines the text color
*   `opts.opacity`: Determines the opacity

## dal.size(opts)

Changes the size of `el`

`opts`: _[Object]_

*   `opts.width`: Determines the width of the element
*   `opts.height`: Determines the height of the element

## dal.collapse()

Collapses `el` data

## dal.uncollapse()

Uncollapses `el` data

## dal.class.add(className)

Adds `class` as a CSS class of `el`

`className`: _[String]_ A CSS class to be added

## dal.class.del(className)

Deletes `class` from the CSS classes of `el`

`className`: _[String]_ The CSS class to be deleted

## self.html(html)

Sets the `innerHTML` value of the element

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
