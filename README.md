# img-lightbox
Web Component / Custom Element with no dependencies to make a lightbox effect around images.

Check out the [demo](https://dkvz.eu/stuff/img-lightbox-demo/)

The idea is that it should still display the image and link to the full sized one if JS is disabled, hasn't loaded for some reason, or if web components are not supported.

I quickly made this in regard to a blog article I was writing, it could be improved **a lot**.

Uncompressed minified size: 8.5Kb including the loading spinner image.

**Note**: we no longer minify the build - It seems to be standard practice for libraries nowadays.

## Using the component from npm
To use it in a project with a module bundler, install the dependency first:
```
npm install -D @dkvz/img-lightbox
```

Import it in the relevant entrypoint and register it into the browser window object:
```js
import ImgLightbox from '@dkvz/img-lightbox';

customElements.define('img-lightbox', ImgLightbox);
```

To use the component in a web page, you're expected to put at least an img tag inside of it.

It's however best to enclose the img in a link, like so:

```html
<img-lightbox>
  <a href="../../assets/example.png" target="_blank" rel="noopener noreferrer">
    <img src="../../assets/example_preview.png" 
      alt="Rabbit with a trumpet mute on its head">
  </a>
</img-lightbox>
```

You'll probably want to add some styling to the element in your global styles as it doesn't have any by default.

The component sets up a default outline on focus, but you might want to add your own globally (which will trump the default one) like so:
```css
img-lightbox:active, img-lightbox:focus {
  outline: 2px solid rgba(20, 20, 200, 0.65);
}
```

You also may have strange spacing issues if the a and img elements have their default "inline" display mode. Which could be changed like so:
```css
img-lightbox a, img-lightbox img {
  display: block;
}
```

This is also where you should set any max-width or max-height. Or you could set it on img-lightbox itself but then you need to set width and height to 100% as in:
```css
img-lightbox a, img-lightbox img {
  display: block;
  width: 100%;
  height: 100%;
}
```

## Building the component

### Build requirements
* Node.js

### Installing dependencies
Run:
```
npm install
```

### Build process
The build scripts will create browser ready bundles, except that **the component prototype will be available through ImgLightbox.default**, which is expected by module bundler but requires using ImgLightbox.default when using it directly in a web page with no module bundler.

Build using either:
```
npm run build
```

You'll find the build script in the `dist` folder.

To manually use it in some page, you could do something like this:
```html
<script src="PATH_TO_SCRIPT/img-lightbox.js"></script>
<script>
  customElements.define('img-lightbox', ImgLightbox.default);
</script>
```
**Update 2025**: There is a .mjs file built as well and it might be a good idea to use that one (with `type="module" in the script tag`).

The loading icon SVG file is normally not necessary but since I change my mind all the time about it you might want to copy it along anyway.

## Build without shadow DOM
In the past I had a way to build the component without using the shadow DOM at all, which has a few consequences but I think the main idea was to support some old browsers.

Anyway, after upgrading Parcel to v2 I didn't take time to fix the build command for the no-shadow DOM version.

It used to be:
```
npm run build-no-shadow
```

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
- [ ] Write tests - Probably going to need jsdom
- [x] Don't forget to register the keyboard events
- [x] Use template tags, they say it's better (here)[https://github.com/GoogleChromeLabs/howto-components/blob/master/elements/howto-checkbox/howto-checkbox.js]
- [x] Disable overflow on the fullscreen overlay
- [x] Make a shadow DOM version
- [x] To maximize accessibility we need some kind of focus outline
- [ ] Add support for lightbox over an svg tag instead of img
- [ ] Support for iframes would be really cool
- [x] Link the repo in package.json
- [ ] Add a gif to show what this does - A codepen link would also work
- [x] Add the minified uncompressed bundle size to the README introduction

