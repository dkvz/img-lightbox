# img-lightbox
Web Component / Custom Element with no dependencies to make a lightbox effect around images.

The idea is that it should still display the image and link to the full sized one if JS is disabled, hasn't loaded for some reason, or if web components are not supported.

I quickly made this in regard to a blog article I was writing, it could be improved **a lot**.

## Build requirements
* Node.js

## Installing dependencies
Run:
```
npm install
```

## Using the component
To use it in a project with a module bundler, just copy this repo or clone it as a submodule and require/import the 'img-lightbox.js' that suits you in your project.

You then have to register the web component at some point.

The code could look like this:
```js
import ImgLightbox from './img-lightbox';

customElements.define('img-lightbox', ImgLightbox);
```

For any other uses you have to build the "library" first. I started this whole thing with Parcel because that was easy to get going but it's probably not the best at building "libraries".

The build scripts will create browser ready bundles, except that **the component prototype will be available through ImgLightbox.default**.

Build using either:
```
npm run build
```
For the shadow DOM version and :
```
npm run build-no-shadow
```
For the version that does not use the shadow DOM API at all.

To manually use it in some page, you could do something like this:
```html
<script src="PATH_TO_SCRIPT/img-lightbox.js"></script>
<script>
  customElements.define('img-lightbox', ImgLightbox.default);
</script>
```
The loading icon SVG file is normally not necessary but since I change my mind all the time about it you might want to copy it along anyway.

To use the component in a web page, you're expected to put at least an img tag inside of it.

It's however best to enclose the img in a link as in the example you'll find in `src/shared/testpage.html`:

```html
<img-lightbox>
  <a href="../../assets/example.png" target="_blank" rel="noopener noreferrer">
    <img src="../../assets/example_preview.png" 
      alt="Rabbit with a trumpet mute on its head">
  </a>
</img-lightbox>
```

For both the shadow DOM and no-shadow DOM versions you'll probably want to add some styling to the element as shown in the respective example index.pug files.

The no-shadow DOM version also requires extra styles to work. See `src/no-shadow/index.pug`.

## Remarks
I started the project with the intention to not use the shadow DOM but the styles are a little bit too crazy so I made another version with shadow DOM.

I'm using the (es6-string-html)[https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html] VS Code extension to syntax highlight my templates, which is why there's somethings a `/*template*/` comment before string literals in the code.

### Static assets
The loading icon is currently inlined as a base64 data URL through using the `parcel-plugin-url-loader` Parcel plugin with default options.

I used to keep it as a separate file but then I needed some kind of option to tell the class where the assets root is.

My concern was that if you have many of these components, the data URL string gets copied a lot of times in memory. And I think that's kind of happening since it's cloned in many shadow DOM instances.

Will be something to possibly optimize later.

### Using something else than parcel to build
I'm not married to Parcel but I don't have time to fight bundlers right now.

I hear this is a good one for libs: https://github.com/developit/microbundle - Might integrate in the future.

### Accessibility
Links seem to respond to both enter and space (differently? But whatever).

Key codes (found in `event.keyCode`) are as follows:
```js
const KEYCODE = {
  SPACE: 32,
  ENTER: 13,
};
```

In their examples the Chrome team seem to ignore any input that has the Alt key pressed as in:
```js
if (event.altKey)
  return;
```

**Note**: When using any key press to escape the lightbox modal situation, focus is not restored to what had it previously. I personally like it that way but I'm not using a screen reader so I don't know.

## Resources and copyright notices
- The hourglass icon has been modified from the GPL-licensed file here: https://fr.wikipedia.org/wiki/Fichier:Circle-icons-hourglass.svg

## TODO
- [ ] Test on all browsers
- [ ] Write tests - Gotta do research on how to test web components
- [x] Don't forget to register the keyboard events
- [x] Use template tags, they say it's better (here)[https://github.com/GoogleChromeLabs/howto-components/blob/master/elements/howto-checkbox/howto-checkbox.js]
- [ ] Document how to check for web component browser support
- [x] Disable overflow on the fullscreen overlay
- [x] Make a shadow DOM version
- [ ] To maximize accessibility we need some kind of focus outline
- [ ] Add support for lightbox over an svg tag instead of img
- [ ] Support for iframes would be really cool
- [x] Link the repo in package.json
- [ ] Put on npm when a little more mature, add a gif to show what this does
- [ ] Building as a lib might not be optimal - see README section about using the component

