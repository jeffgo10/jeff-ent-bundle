import React from 'react';
import { createRoot } from 'react-dom/client';
import AnotherMfeConfig from '../AnotherMfeConfig';

const ATTRIBUTES = {
  config: 'config'
}

class AnotherMfeConfigElement extends HTMLElement {
  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    setTimeout(() => this.render(), 500);
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (!AnotherMfeConfigElement.observedAttributes.includes(attribute)) {
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
    root.render(<AnotherMfeConfig config={config} />);
  }
}

customElements.define('another-mfe-config', AnotherMfeConfigElement);
