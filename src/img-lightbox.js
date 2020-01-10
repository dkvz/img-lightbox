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
      link.addEventListener('click', this.showLightbox.bind(this));
    } else if (img) {
      this.fullImage = img.getAttribute('src');
      img.addEventListener('click', this.showLightbox.bind(this));
    }
    // Add the loading overlay:
    this._addLoadingOverlay();
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
    this.loadingOverlay.innerHTML = this.loaderSvg;
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
        this.img = new Image();
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

      // Prepare the events to close the overlay:
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
ImgLightbox.prototype.loaderSvg = `
<svg enable-background="new 0 0 64 64" version="1.1" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata>
<g>
		<circle class="st0" cx="32" cy="32" r="32"/>
	</g><g class="st1" opacity=".2">
		<path class="st2" d="m46 50h-2v-4c0-4.5-3-7.4-3-7.4s-3-2.8-3.9-3.7 0-1.8 0-1.8 1.3-1.3 4.2-4c2.8-2.7 2.7-6.7 2.7-6.7v-5.1l-12-1-12 1v5.1s-0.1 3.9 2.7 6.7c2.8 2.7 4.2 4 4.2 4s0.9 0.9 0 1.8-3.9 3.7-3.9 3.7-3 2.8-3 7.4v4h-2c-1.1 0-2 0.9-2 2s0.9 2 2 2h28c1.1 0 2-0.9 2-2s-0.9-2-2-2z" fill="#231f20"/>
	</g>
		<path class="st3" d="m41 36.6s-3-2.8-3.9-3.7 0-1.8 0-1.8 1.3-1.3 4.2-4c2.8-2.7 2.7-6.7 2.7-6.7v-5.1l-12-1-12 1v5.1s-0.1 3.9 2.7 6.7c2.8 2.7 4.2 4 4.2 4s0.9 0.9 0 1.8-3.9 3.7-3.9 3.7-3 2.8-3 7.4v5.1h24v-5.1c0-4.5-3-7.4-3-7.4z" fill="#fff"/>
	
		<path class="st4" d="m31 43v-11c0-2.1-1-3.4-1.3-3.7l-4.2-4c-1.5-1.4-1.5-3.7-1.5-3.7h16s0 2.3-1.5 3.7l-4.2 4c-0.4 0.3-1.3 1.6-1.3 3.7v11z"/>
	<g class="st5" opacity=".3">
		<path class="st2" d="m48 16c0 1.1-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2z" fill="#231f20"/>
	</g><g fill="#fff">
		<path class="st6" d="m48 14c0 1.1-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2z" fill="#fff"/>
	</g><g fill="#fff">
		<path class="st6" d="m48 50c0 1.1-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2z" fill="#fff"/>
	</g><g>
		<polygon class="st4" points="23 48 23 48 32 40 41 48"/>
	</g>

</svg>
`;

export default ImgLightbox;