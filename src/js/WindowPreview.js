class WindowPreview {
  constructor() {
    this.previewWindow = null;
    this.iframe = null;
    this.previewWindowStyles = {
      background: '#ffffff',
      border: 'none',
      height: '100%',
      width: '100%',
    };
  }

  open() {
    this.previewWindow = window.open();
    this.initIframe();
    this.updateContent();
  }

  initIframe() {
    this.previewWindow.document.title = `${document.title} | Preview`
    this.previewWindow.document.body.style.margin = '0';
    this.iframe = this.previewWindow.document.createElement('iframe');
    Object.entries(this.previewWindowStyles).forEach(([key, value]) => (this.iframe.style[key] = value));

    this.previewWindow.document.body.appendChild(this.iframe);
  }

  updateContent(html) {
    if (!this.previewWindow) return;
    this.iframe.setAttribute('srcDoc', html ?? document.querySelector('iframe.result').getAttribute('srcDoc'));
  }
}

export default new WindowPreview();
