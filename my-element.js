/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';

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
      showCustomer: { type: Boolean },
      createCustomer: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.idInformacion = "";
    this.turnTypeId= "";
    this.tcustomer;
    this.filterClient = '';
    this.tcustomers=[];
    this.showCustomer = true;
    this.createCustomer= true;
    this.getTypesCustomer();

  }
  getTypesCustomer() {
    fetch("http://localhost:8080/customers/types/all").then(res => res.json()).then(t =>
      this.tcustomers = t);
  }

  render() {
    return html`
    ${this.showCustomer ? html`
      <div>   
      <input placeholder='Digite numero de identificacion' name='filtler_client' .value='${this.filterClient}'  @input="${(e) => this.filterClient = e.target.value}" >
       <button @click='${this.filterClients}'>filtrar cliente</button>
       </div>
    `: html`
    <h2>Bienvenido ${this.client} ${this.clientLastname}</h2>
    <button @click=${this.newTurn}>Agregar un nuevo turno</button> 
    `}

    ${this.createCustomer ? html`
    <div>   
    <button @click=${this.newCustomer}>Agregar un nuevo usuario</button> 
     </div>
  `: html`
  <div>
  <label>Nombre del usuario</label>
        <input placeholder='nombre' name='name_customer' .value='${this.nameCustomer}'  @input="${(e) => this.nameCustomer = e.target.value}" >
          <label>Apellidosdel usuario</label>
          <input placeholder='apellido' name='lastname_customer' .value='${this.lastnameCustomer}'  @input="${(e) => this.lastnameCustomer = e.target.value}" >
          <label>Email del usuario</label>
          <input placeholder='email' name='email_customer' .value='${this.emailCustomer}'  @input="${(p) => this.emailCustomer = p.target.value}" >
          <label>Seleccione el tipo de prioridad </label>
      <select name='list_delivery' @change='${(r) => this.tcustomer = r.target.value}' .value='${this.tcustomer}'>
      <option selected>Seleccione</option> ${this.tcustomers.map(item => html`<option value='${item.id}'>${item.description}</option>`)}
      </select>
      <label>Documento del usuario</label>
          <input placeholder='documento' name='document_customer' .value='${this.documentCustomer}'  @input="${(p) => this.documentCustomer = p.target.value}" >
        <button @click='${this.createCustomers}'>Agregar</button>
        </form>
        </div>
  `}
  `;
  }

  filterClients() {
    console.log(this.filterClient)
    fetch("http://localhost:8080/customers/search/" + this.filterClient)
      .then(res => res.json()).then(filter => {
        this.client = filter.name;
        this.clientLastname = filter.lastName;
        this.showCustomer = false;
        console.log(this.client)
      }).catch(e => {
        console.error(e);
        this.showCustomer = true;
      });
  }
  newCustomer(){
    this.createCustomer = false
  }
  createCustomers(){
    console.log(this.tcustomer)
    this.search = this.tcustomers.map(i => i.turnTypeId)
    this.tycd=this.search[this.tcustomer-1].desc
    this.tycid=this.search[this.tcustomer-1].id
    console.log(this.tycid)
    console.log(this.nameCustomer)
    console.log(this.lastnameCustomer)
    console.log(this.emailCustomer)
    console.log(this.documentCustomer)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:8080/customer/create/"+this.tycid, {
      method: 'POST',mode: 'cors', credentials: 'same-origin', body:
        JSON.stringify({
          "name": this.nameCustomer,
          "lastName": this.lastnameCustomer,
          "email": this.emailCustomer,
          "documentNumber":this.documentCustomer,
        }), headers: myHeaders,
    }).then(() => alert("Se agrego correctamente el usuario")).then(this.createCustomer = true)
  }
  newTurn(){
    fetch("http://localhost:8080/turns/create/" + this.filterClient, {
      method: 'POST'}).then(() => alert("Creacion de turno exitosa"));
  }
}

window.customElements.define('my-element', MyElement);
