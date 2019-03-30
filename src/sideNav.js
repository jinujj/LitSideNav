import { LitElement, html, css } from 'lit-element';

export default class SideNav extends LitElement {

    static get styles() {
        return css`
            .sidenav {
                float: right;
                display: flex;
                flex-direction: column;
                text-align: left;
                height: 100%; 
                width: 0; 
                position: fixed; 
                z-index: 1; 
                top: 0; 
                right: 0;
                background-color: #ccc; 
                overflow-x: hidden; 
                padding-top: 60px; 
                transition: 0.5s; 
          }
          a {
            font-size: 20px;
            line-height: 30px;
            border: solid 1px grey;
            transition: 0.3s;
          }`;
    }

    static get properties() {
        return {
            navigation: { type: Array },
        };
    }

    constructor() {
        super();
        this._attachListener();
    }

    _attachListener() {
        // Added the custom Event Listener
        this.addEventListener(`side-nav-toggle`, (data) => {
            const sideNav = this.shadowRoot.querySelector(`.sidenav`);
            if (!sideNav.style.width) {
                sideNav.style.width = `300px`;
            } else {
                sideNav.style.width = ``;
            }
        });
    }

    _handleClose() {
        this.dispatchEvent(new CustomEvent(`side-nav-toggle`, {
            detail: { click: `CLICK` },
            bubbles: true
        })
        );
    }

    render() {
        if (this.navigation && this.navigation.length) {
            return html`
            <div class="sidenav">
                <a href="#" class="close" @click=${this._handleClose}>&times;</a>
                ${this.navigation.map((item) =>
                html`<a href="#">${item}</a>`)}  
            </div>
        `;
        } else {
            return html``;
        }
    }
}

customElements.define("side-nav", SideNav);