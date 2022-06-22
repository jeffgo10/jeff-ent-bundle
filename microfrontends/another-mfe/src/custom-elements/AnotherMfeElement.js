import React from 'react';
import { createRoot } from 'react-dom/client';
import AnotherMfe from '../AnotherMfe';

const ATTRIBUTES = {
  config: 'config'
}

class AnotherMfeElement extends HTMLElement {
  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    setTimeout(() => this.render(), 500);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.mountPoint && newValue !== oldValue) {
      this.render();
    }
  }

  render() {
    const config = this.getAttribute(ATTRIBUTES.config) && JSON.parse(this.getAttribute(ATTRIBUTES.config));
    const root = createRoot(this.mountPoint);
    root.render(<AnotherMfe config={config} />);
  }
}

customElements.define('another-mfe', AnotherMfeElement);
