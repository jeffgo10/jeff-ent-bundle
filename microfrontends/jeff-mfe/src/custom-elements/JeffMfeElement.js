import React from 'react';
import ReactDOM from 'react-dom';
import JeffMfe from '../JeffMfe';


class JeffMfeElement extends HTMLElement {
  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    setTimeout(() => this.render(), 500);
  }

  render() {
    ReactDOM.render(
      <JeffMfe />,
      this.mountPoint
    );
  }
}

customElements.define('jeff-mfe', JeffMfeElement);
