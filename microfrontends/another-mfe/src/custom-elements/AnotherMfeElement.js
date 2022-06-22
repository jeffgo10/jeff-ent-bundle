import React from 'react';
import { createRoot } from 'react-dom/client';
import AnotherMfe from '../AnotherMfe';


class AnotherMfeElement extends HTMLElement {
  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    setTimeout(() => this.render(), 500);
  }

  render() {
    const root = createRoot(this.mountPoint);
    root.render(<AnotherMfe />);
  }
}

customElements.define('another-mfe', AnotherMfeElement);
