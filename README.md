# lilBox
a simple barebones javascript lightbox/alert/confirm/proceed

## Why another lightbox?
I've seen em all out there. They do everything, they come all styled, they have a bunch of prebuilt functionality.
I just want something super barebones that I can customize on my own without having to do a bunch of style overrides.
So lilBox was created, and it fits the bill.


## API
`userOptions` - it's a simple object with the following options:
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
These options will need to be passed in with each lightbox call *TODO* - create a way to globally pass in options.


`lilBox.basic(html, userOptions)` - This is a very basic lightbox that has an `X` in the corner that will close the box.


`lilBox.confirm(html, confirmed, userOptions) - `confirmed` will need to be a function. Selecting no will clear the lightbox. Here's a simple example:
```
lilBox.confirm('ready to go to the next slide?', function () {
  Reveal.next();
}, {
  backgroundColor: 'rgba(17, 141, 215, 0.9)',
  okText: 'Get My Results',
  shadow: 'rgba(0,0,0,0.0)',
  maxWidth: '40%',
});
```

