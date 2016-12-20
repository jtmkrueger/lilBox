# lilBox
a simple barebones javascript lightbox/alert/confirm/proceed

## Why another lightbox?
I've seen em all out there. They do everything, they come all styled, they have a bunch of prebuilt functionality.
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
}
```

These options will need to be passed in with each lightbox call if you want to make changes to the defaults. If the defaults are fine, then feel free
to omit them from your function calls.

`html` - can be a string or any kind of compiled template like handlebars or underscore (which will technically be a string after compilation, but you know what I mean).

---

`lilBox.basic(html, userOptions)` - This is a very basic lightbox that has an `X` in the corner that will close the box. Here's a simple example:
```
lilBox.basic('hello world!', {maxWidth: '40%'});
```
---

`lilBox.confirm(html, confirmed, userOptions) - `confirmed` will need to be a function. Selecting no will clear the lightbox. Here's a simple example:
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

`lilBox.ok(html, okayed, userOptions)` - This is essential a "proceed" box with out the choice to close the box or cancel.
Feel free to just pass in an empty function if you don't want `okayed` to do anything but clear the lilBox. Here's an example:
```
lilBox.ok('Great Job.', function () {
  console.log('you did it');
}, {
  okText: 'Victory!',
});
```

 *TODO* - create a way to globally pass in options.
