import './public-path';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnotherMfe from '../AnotherMfe';

const ATTRIBUTES = {
  config: 'config'
}

class AnotherMfeElement extends HTMLElement {
  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    setTimeout(() => this.render(), 500);
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (!AnotherMfeElement.observedAttributes.includes(attribute)) {
      throw new Error(`Untracked changed attributes: ${attribute}`)
    }
    if (this.mountPoint && newValue !== oldValue) {
      this.render();
    }
  }

  render() {
    const attributeConfig = this.getAttribute(ATTRIBUTES.config);
    const config = attributeConfig && JSON.parse(attributeConfig);
    const root = createRoot(this.mountPoint);
    root.render(<AnotherMfe config={config} />);
  }
}

customElements.define('another-mfe', AnotherMfeElement);
