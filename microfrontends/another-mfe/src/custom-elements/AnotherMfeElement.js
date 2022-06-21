import React from 'react';
import ReactDOM from 'react-dom';
import AnotherMfe from '../AnotherMfe';


class AnotherMfeElement extends HTMLElement {
  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    setTimeout(() => this.render(), 500);
  }

  render() {
    ReactDOM.render(
      <AnotherMfe />,
      this.mountPoint
    );
  }
}

customElements.define('another-mfe', AnotherMfeElement);
