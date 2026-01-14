// const loaderSvgUrl = require('../../assets/hourglass.svg');
import loaderSvg from 'bundle-text:../../assets/hourglass.svg';

class ImgLightbox extends HTMLElement {

  constructor() {
    super();
    this.loading = false;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Template is added to prototype below the 
    // class definition.
    // It's from a template tag because it's 
    // supposed to be faster this way.
    this.shadowRoot.appendChild(
      this.template.content.cloneNode(true)
    );
    // Get some element references from shadow DOM:
    this.overlay = this.shadowRoot.querySelector('#overlay');
    this.loadingOverlay = this.shadowRoot.querySelector('#loader');
    // Add the loading SVG to that element:
    this.loadingOverlay.innerHTML = loaderSvg;
    // Component needs a tabIndex to be focusable.
    this.tabIndex = 0;
    // The slotted elements are actually not in 
    // the shadow DOM so we can get them like so:
    const link = this.querySelector('a');
    const img = this.querySelector('img');
    if (link !== null) {
      // Store the URL as the full image URL:
      this.fullImage = link.getAttribute('href');
      // Register a click event that has to 
      // prevent default:
      //this._addListeners(link);
      // Prevent ability to focus the link:
      link.tabIndex = -1;
    } else if (img !== null) {
      this.fullImage = img.getAttribute('src');
      // Nothing wrong with giving the same tabIndex
      // to things, they're ordered by position.
      // I think.
      //img.tabIndex = 0;
      //this._addListeners(img);
    }
    this.fullImage && this._addListeners();
  }

  _addListeners() {
    this.addEventListener('click', this.showLightbox.bind(this), true);
    this.addEventListener('keydown', (e) => {
      // It's common to ignore anything with alt
      // modifiers. I've copied this from Google
      // people.
      if (e.altKey) return;
      // Catch enter and space:
      switch (e.keyCode) {
        case 13:
        case 32:
          this.showLightbox(e);
        default:
          return;
      }
    }, true);
  }

  showLightbox(e) {
    // This is required so that the link element does not get 
    // followed:
    e.preventDefault();

    // Implement some kind of lock:
    if (!this.loading) {
      this.loading = true;
      // Preload the full image.
      // Show the spinner overlay:
      this._showOverlay(this.loadingOverlay);
      if (!this.img) {
        this.img = document.createElement('img');
        this.img.addEventListener('load', () => this.showImage());
        this.img.src = this.fullImage;
        this.img.tabIndex = 1;
        // Prepare the events to close the overlay.
        // I'm doing this here to light up what's
        // happening in connectedCallback.
        // I'm not doing a check for which key was
        // called on purpose, but maybe I should do
        // that alt key check?
        ['click', 'keydown'].forEach(
          (type) =>
            this.overlay.addEventListener(
              type,
              (e) => this._hideOverlay(e.currentTarget)
            )
        );
        this.overlay.appendChild(this.img);
      } else {
        this.showImage();
      }
    }
  }

  showImage() {
    this.img.style.transform = 'scale(0.1)';
    // Hide the loading overlay:
    this._hideOverlay(this.loadingOverlay);
    this._showOverlay(this.overlay);
    // Focus the overlay (requires it to have a tabIndex):
    this.overlay.focus();
    // Start the CSS transition:
    this.img.style.transform = 'scale(1)';
    // Don't forget to unlock the click event:
    this.loading = false;
  }

  _showOverlay(overlay) {
    overlay.style.display = 'flex';
  }

  _hideOverlay(overlay) {
    overlay.style.display = '';
  }

}

// I'm using a true template tag because the Chrome
// team says it's faster. The template tag has 
// better browser support than web components anyway.
// The strange comment here is needed for syntax
// highlighting with a VS Code extension I'm using.
const tpl = document.createElement('template');
tpl.innerHTML = /*template*/`
<style>
  :host {
    display: inline-block;
    cursor: pointer;
    position: relative;
  }

  :host([hidden]) {
    display: none;
  }

  :host(:focus), :host(:active) {
    outline: 2px solid #77b;
  }

  #loader {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    display: none;
    align-items: center;
    justify-content: center;
  }

  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    z-index: 999;
    background-color: rgba(0,0,0,.5);
    display: none;
    align-items: center;
    justify-content: center;
  }

  #loader svg {
    width: 50%;
    opacity: 0.6;
    animation: lightbox-loader 2s infinite;
  }

  #overlay img {
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.8s;
  }

  @keyframes lightbox-loader {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
</style>
<slot></slot>
<div id="overlay" tabindex="0"></div>
<div id="loader">
</div>
`;
ImgLightbox.prototype.template = tpl;

export default ImgLightbox;
