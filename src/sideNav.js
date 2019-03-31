import { LitElement, html, css } from 'lit-element';

export default class SideNav extends LitElement {

    static get styles() {
        return css`
            .sidenav {
                float: right;
                display: flex;
                flex-direction: column;
                text-align: left;
                position: fixed; 
                z-index: 1; 
                background-color: #ccc; 
                overflow-x: hidden; 
                padding-top: 60px; 
                transition: 0.5s; 
            }
            .right {
                top: 0; 
                right: 0;
                height: 100%; 
                width: 0; 
            }
            .left {
                top: 0; 
                left: 0;
                height: 100%; 
                width: 0; 
            }
            .top {
                top: 0; 
                left: 0;
                height: 0; 
                padding-top: 0; 
                width: 100%; 
                text-align: center;
            }
            .bottom {
                bottom: 0; 
                left: 0;
                height: 0; 
                padding-top: 0; 
                width: 100%; 
                text-align: center;
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
            direction: {type: String}
        };
    }

    constructor() {
        super();
        this.direction = "right";
        this._attachListener();
    }

    /**
     * Attach the custom event listeners for rendering the side navigation.
     */
    _attachListener() {
        // Added the custom Event Listener
        this.addEventListener(`side-nav-toggle`, (data) => {
            this._renderNavigation();
        });
    }

    /**
     * Render the side naviagtion based on the orientation selection.
     */
    _renderNavigation() {
        const sideNav = this.shadowRoot.querySelector(`.sidenav`);
        switch(this.direction) {
            case "left":
            case "right" :
                sideNav.style.height = `100%`;
                if (!sideNav.style.width) {
                    sideNav.style.width = `300px`;
                } else {
                    sideNav.style.width = ``;
                }
                break;
            case "top": 
            case "bottom": 
                sideNav.style.width = `100%`;
                if (!sideNav.style.height) {
                    sideNav.style.height = `200px`;
                } else {
                    sideNav.style.height = ``;
                }
        }
    }

    /**
     * Handle the close button in the side naviagation.
     */
    _handleClose() {
        this.dispatchEvent(new CustomEvent(`side-nav-toggle`, {
            detail: { click: `CLICK` },
            bubbles: true
        }));
    }

    render() {
        if (this.navigation && this.navigation.length) {
            return html`
                <div class="sidenav ${this.direction}">
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