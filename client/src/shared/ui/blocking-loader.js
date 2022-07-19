class BlockingLoader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});

        shadow.innerHTML = `
            <style>
                /* Absolute Center Spinner */
                .loader {
                    position: fixed;
                    z-index: 999;
                    height: 2em;
                    width: 2em;
                    margin: auto;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    display: block;
                }
                
                /* Transparent Overlay */
                .loader:before {
                    content: "";
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.3);
                }
                
                /* :not(:required) hides these rules from IE9 and below */
                .loader:not(:required) {
                    /* hide "loading..." text */
                    color: transparent;
                    text-shadow: none;
                    background-color: transparent;
                    border: 0;
                }
                
                .loader:not(:required):after {
                    content: "";
                    display: block;
                    font-size: 10px;
                    width: 1em;
                    height: 1em;
                    margin-top: -0.5em;
                    animation: spinner 1500ms infinite linear;
                    border-radius: 0.5em;
                    -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0,
                        rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0,
                        rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0,
                        rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
                    box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, 
                        rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, 
                        rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, 
                        rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
                        rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
                }
                
                
                @keyframes spinner {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            
            </style>
            
            <div id="loader" class="loader">
            </div>
        `;
    }
}

window.customElements.define("blocking-loader", BlockingLoader);



let loaderElement = null;

export const show = () => {
    loaderElement = document.createElement("blocking-loader");
    document.body.appendChild(loaderElement);
};

export const hide = () => {
    if (loaderElement)
        loaderElement.remove();
};