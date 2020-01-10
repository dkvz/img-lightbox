const loaderSvgUrl = require('../../assets/hourglass.svg');

class ImgLightbox extends HTMLElement {

  constructor() {
    super();
    this.loading = false;
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    // Template is added to prototype below the 
    // class definition.
    this.shadowRoot.innerHTML = this.template;
    // Get some element references from shadow DOM:
    this.overlay = this.shadowRoot.querySelector('#overlay');
    this.loadingOverlay = this.shadowRoot.querySelector('#loader');
    // The slotted elements are actually not in 
    // the shadow DOM so we can get them like so:
    const link = this.querySelector('a');
    const img = this.querySelector('img');
    if (link) {
      // Store the URL as the full image URL:
      this.fullImage = link.getAttribute('href');
      // Register a click event that has to 
      // prevent default:
      link.addEventListener('click', this.showLightbox.bind(this));
    } else if (img) {
      this.fullImage = img.getAttribute('src');
      img.addEventListener('click', this.showLightbox.bind(this));
    }
  }

  showLightbox(e) {
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

// The loader image should be cached, inlining it
// will create tons of copies of SVG nodes.
ImgLightbox.prototype.template = /*template*/`
<style>
  :host {
    display: inline-block;
    cursor: pointer;
    position: relative;
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

  #loader img {
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
  <img src="${loaderSvgUrl}">
</div>
`;

export default ImgLightbox;