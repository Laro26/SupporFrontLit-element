/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      showCustomer: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.filterClient = '';
    this.showCustomer = true;
  }

  render() {
    return html`
    ${this.showCustomer ? html `
      <div>   
      <input placeholder='Digite numero de identificacion' name='filtler_client' .value='${this.filterClient}'  @input="${(e) => this.filterClient = e.target.value}" >
       <button @click='${this.filterClients}'>filtrar cliente</button>
       </div>
    `: html `
    <h2>Bienvenido ${this.client} ${this.clientLastname}</h2>
    `}
    `;}

  filterClients() {
    console.log(this.filterClient)
    fetch("http://localhost:8080/customers/search/" + this.filterClient)
    .then(res => res.json()).then(filter => {
      this.client=filter.name;
      this.clientLastname=filter.lastName;
      this.showCustomer= false;
      console.log(this.client)
    }).catch(e => {
      console.error(e);
      this.showCustomer = true;
    });
  }
}

window.customElements.define('my-element', MyElement);
