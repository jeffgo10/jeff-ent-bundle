import './public-path';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AnotherMfeConfig from '../AnotherMfeConfig';
class AnotherMfeConfigElement extends HTMLElement {
  constructor() {
    super();
    this.reactRootRef = React.createRef();
    this.mountPoint = null;
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.render();
  }

  get config() {
    return this.reactRootRef.current ? this.reactRootRef.current.state : {};
  }

  set config(value) {
    return this.reactRootRef.current.setState(value);
  }

  render() {
    const root = createRoot(this.mountPoint);
    root.render(<AnotherMfeConfig ref={this.reactRootRef} />);
  }
}

customElements.define('another-mfe-config', AnotherMfeConfigElement);
