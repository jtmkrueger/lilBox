# lilBox
a simple barebones javascript lightbox/alert/confirm/proceed

## Why another lightbox?
I just want something super barebones that I can customize on my own without having to do a bunch of style overrides.
So lilBox was created, and it fits the bill.


## API
`userOptions` - it's a simple object with the following presets:
```
{
  shadow: 'rgba(0,0,0,0.7)', // the background behind the lightbox
  boxBackgroundColor: 'white', // background of the lightbox
  maxWidth: '100%', // max width the lightbox will be
  color: 'black', // text color in the lightbox
  okText: 'Ok', //  text for ok button in the ok box
  yesText: 'Yes', // confirm box yes text
  noText: 'No', // confirm box no text
  opacity: 1.0, // opacity of the lightbox
  transitionSpeed: '500ms', // speed of opening/closing boxes
  attachTo: 'body', // what element lilBox attaches to when instantiated. This can be a selector and/or an id or class
}
```

These options will need to be passed in with each lightbox call if you want to make changes to the defaults. If the defaults are fine, then feel free
to omit them from your function calls.

`html` - can be a string or any kind of compiled template like handlebars or underscore (which will technically be a string after compilation, but you know what I mean).

---

`lilBox.setDefaults(userOptions)` - If you don't want to pass in options every time you set up a new lilBox, this is the way to do it. These options will survive in your instance unless you overwrite them in a lilBox call. Here's an example that just uses the defaults:

```
var options = {
  shadow: 'rgba(0,0,0,0.7)',
  boxBackgroundColor: 'white',
  maxWidth: '100%',
  color: 'black',
  okText: 'Ok',
  yesText: 'Yes',
  noText: 'No',
  opacity: 1.0,
  transitionSpeed: '500ms',
  attachTo: 'body',
};

lilBox.setDefaults(options);
```

`lilBox.basic(html, userOptions)` - This is a very basic lightbox that has an `X` in the corner that will close the box. Here's a simple example:
```
lilBox.basic('hello world!', {maxWidth: '40%'});
```
---

`lilBox.confirm(html, confirmed, userOptions)` - `confirmed` will need to be a function, unless you don't want it to do anything in which case it should be `null` or can be ommited if you're not passing in `userOptions`. Clicking the no button will clear the lightbox. Here's a simple example:
```
lilBox.confirm('ready to go to the next slide?', function () {
  console.log('code that advances the slide!');
}, {
  backgroundColor: 'rgba(17, 141, 215, 0.9)',
  yesText: 'ready!',
  noText: 'wait, I'm not done!',
  shadow: 'rgba(0,0,0,0.0)',
  maxWidth: '40%',
});
```

---

`lilBox.ok(html, okayed, userOptions)` - This is essentially a "proceed" box with out the choice to close the box or cancel.
Feel free to just pass in `null` (or omit it if you're not changing `userOptions`) for `okayed` if you don't to do anything but clear the lilBox. Here's an example:
```
lilBox.ok('Great Job.', function () {
  console.log('you did it');
}, {
  okText: 'Victory!',
});
```

## Styles

Here's the styles that come with the lilBox. They're *very* barebones, which gives you the flexibility to do whatever you want to make it fit your page.
Each time a lilBox is added to the page, these styles are applied, so there's no need to add a new stylesheet to your code. Note: because the styles are
dynamically added, if you want to override any of these base styles, you'll need to use `!important` rules in your own css.

```
#lilBox-background {
  z-index: 998;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: options.shadow;
  transition: opacity options.transitionSpeed;
}
#lilBox {
  z-index: 999;
  padding: 20px;
  position: fixed;
  max-width: options.maxWidth;
  opacity: options.opacity
}
#lilBox-content {
  clear: both;
}
#lilBox-close {
  float: right;
  cursor: pointer;
}
#lilBox-yes-button {
  float: left;
  cursor: pointer;
}
#lilBox-no-button {
  float: right;
  cursor: pointer;
}
#lilBox-ok-button {
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
```
