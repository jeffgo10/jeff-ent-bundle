import './public-path';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnotherMfeConfig from '../AnotherMfeConfig';

const ATTRIBUTES = {
  config: 'config'
}

class AnotherMfeConfigElement extends HTMLElement {
  constructor() {
    super();
    this.reactRootRef = React.createRef();
    this.mountPoint = null;
  }

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
      setTimeout(() => {
        this.reactRootRef.current.setState(JSON.parse(newValue));
      }, 500);
    }
  }

  get config() {
    return this.reactRootRef.current ? this.reactRootRef.current.state : {};
  }

  render() {
    const root = createRoot(this.mountPoint);
    root.render(<AnotherMfeConfig ref={this.reactRootRef} />);
  }
}

customElements.define('another-mfe-config', AnotherMfeConfigElement);
