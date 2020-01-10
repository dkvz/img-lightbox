# img-lightbox
Web Component with no dependencies to make a lightbox effect around images.

The idea is that it should still display the image and link to the full sized one if JS is disabled, hasn't loaded for some reason, or if web components are not supported.

I quickly wrote this in regard to a blog article I was writing, it could be improved **a lot**.

## Build requirements
* NodeJS

## Installing dependencies
Run:
```
npm install
```

## Using the component
For the moment you have to build it first.



## Remarks
I started the project with the intention to not use the shadow DOM but the styles are a little bit too crazy so I made another version with shadow DOM.

I'm using the (es6-string-html)[https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html] VS Code extension to syntax highlight my templates, which is why there's somethings a `/*template*/` comment before string literals in the code.

## Resources
- The hourglass icon has been modified from the GPL-licensed file here: https://fr.wikipedia.org/wiki/Fichier:Circle-icons-hourglass.svg

## TODO
- [ ] Test on all browsers
- [ ] Don't forget to register the keyboard events
- [ ] We should probably check for web component support before trying to register the whole thing when using it in prod
- [x] Disable overflow on the fullscreen overlay
- [ ] Make a shadow DOM version
- [ ] Add support for lightbox over an svg tag instead of img
- [ ] Support for iframes would be really cool
- [ ] Link the repo in package.json

