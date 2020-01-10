class ImgLightbox extends HTMLElement {

  constructor() {
    super();
    this.loading = false;
  }

  connectedCallback() {
    const link = this.querySelector('a');
    const img = this.querySelector('img');
    if (link) {
      // Store the URL as the full image URL:
      this.fullImage = link.getAttribute('href');
      // Register a click event that has to 
      // prevent default:
      this._addListeners(link);
    } else if (img) {
      this.fullImage = img.getAttribute('src');
      // Nothing wrong with giving the same tabIndex
      // to things, they're ordered by position.
      // I think.
      img.tabIndex = 0;
      this._addListeners(img);
    }
    // Add the loading overlay:
    this._addLoadingOverlay();
  }

  _addListeners(el) {
    el.addEventListener('click', this.showLightbox.bind(this));
    el.addEventListener('keydown', (e) => {
      // It's common to ignore anything with alt
      // modifiers. I've copied this from Google
      // people.
      if (e.altKey) return;
      // Catch enter and space:
      switch (e.keyCode) {
        case 13:
        case 32:
          this.showLightbox();
        default:
          return;
      }
    });
  }

  _addLoadingOverlay() {
    // This could be rewritten in a way more clever manner.
    this.style.position = 'relative';
    this.loadingOverlay = document.createElement('div');
    this.loadingOverlay.style.position = 'absolute';
    this.loadingOverlay.style.zIndex = 1;
    this.loadingOverlay.style.top = '0';
    this.loadingOverlay.style.left = '0';
    this.loadingOverlay.style.width = '100%';
    this.loadingOverlay.style.height = '100%';
    this.loadingOverlay.style.backgroundColor = 'rgba(0,0,0,.2)';
    this.loadingOverlay.style.alignItems = 'center';
    this.loadingOverlay.style.justifyContent = 'center';
    const loaderImage = document.createElement('img');
    loaderImage.src = this.loaderSvgUrl;
    loaderImage.style.width = '50%';
    loaderImage.style.opacity = '0.6';
    loaderImage.style.animation = 'lightbox-loader 2s infinite';
    this.loadingOverlay.appendChild(loaderImage);
    //this.loadingOverlay.innerHTML = this.loaderSvg;
    this.hideLoaderOverlay();
    this.appendChild(this.loadingOverlay);
  }

  showLightbox(e) {
    e.preventDefault();
    // Implement some kind of lock:
    if (!this.loading) {
      this.loading = true;
      // Preload the full image.
      // Show the spinner overlay:
      this.showLoaderOverlay();
      if (!this.img) {
        this.img = document.createElement('img');
        this.img.src = this.fullImage;
        this.img.addEventListener('load', () => this.showImage(this.img));
      } else {
        this.showImage(this.img);
      }
    }
  }

  showImage(img) {

    // Add the overlay if it doesn't exist:
    if (!this.overlay) {
      // Create the overlay with a whole bunch
      // of inline styles.
      // I'm so sorry.
      this.overlay = document.createElement('div');
      this.overlay.style.position = 'fixed';
      this.overlay.style.top = '0';
      this.overlay.style.left = '0';
      this.overlay.style.bottom = '0';
      this.overlay.style.right = '0';
      this.overlay.style.overflow = 'hidden';
      this.overlay.style.zIndex = 999;
      this.overlay.style.backgroundColor = 'rgba(0,0,0,.5)';
      this.overlay.style.display = 'none';
      this.overlay.style.alignItems = 'center';
      this.overlay.style.justifyContent = 'center';
      this.overlay.tabIndex = 0;

      // Add the image + transition
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.transition = 'transform 0.8s';
      img.tabIndex = 1;
      this.overlay.appendChild(img);

      // Prepare the events to close the overlay.
      // I'm not doing a check for which key was
      // called on purpose, but maybe I should do
      // that alt key check?
      const closeOverlay = (e) =>         
        e.currentTarget.style.display = 'none';
      ['click', 'keydown'].forEach(
        (type) => this.overlay.addEventListener(type, closeOverlay)
      );

      this.appendChild(this.overlay);
    }
    img.style.transform = 'scale(0.1)';
    // Hide the loading overlay:
    this.hideLoaderOverlay();
    this.overlay.style.display = 'flex';
    // Focus the overlay (requires it to have a tabIndex):
    this.overlay.focus();
    // Start the CSS transition:
    img.style.transform = 'scale(1)';

    // Don't forget to unlock the click event:
    this.loading = false;
  }

  showLoaderOverlay() {
    this.loadingOverlay.style.display = 'flex';
  }

  hideLoaderOverlay() {
    this.loadingOverlay.style.display = 'none';
  }

}

// I could not inline the SVG with Parcel, so I copied it here.
// That should be optimized at a later date as I'm also copying it to 
// the shadow DOM version.
// Eagerly creating all these elements on page with lots of img-lightbox elements
// would be a really bad idea.
ImgLightbox.prototype.loaderSvgUrl = require('../../assets/hourglass.svg');

export default ImgLightbox;