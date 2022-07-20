import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Constants} from "/src/shared/constants";
import {Alerts, BlockingLoader} from "/src/shared/ui";
import dedent from "dedent-js";


const redirectIfNotAuthenticated = async () => {
    try {
        BlockingLoader.show();

        const userToken = window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY);
        if (!userToken)
            window.location.href = "./login.html";

        const userData = await Api.me(userToken);
        console.log("check Auth", userData);

    } catch (err) {
        console.error(err);
        // Alerts.showError(err);
    } finally {
        BlockingLoader.hide();
    }

};

// redirectIfNotAuthenticated();

const app = async () => {
    baseInit();
    await redirectIfNotAuthenticated();
    await loadBooks();
};


const loadBooks = async () => {
    try {
        const userToken = window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY);

        const books = await Api.getBooks(userToken);

        const booksContainer = document.getElementById("book-list");
        for (const book of books) {
            const elem = document.createElement("book-card");
            elem.setAttribute("id", book.id);
            elem.setAttribute("title", book.name);
            elem.setAttribute("author", book.author);
            elem.setAttribute("isFavorite", book.isFavorite);
            booksContainer.appendChild(elem);
        }

    } catch (err) {
        Alerts.showError(err);
    }
};


window.addEventListener("DOMContentLoaded", app);


class BookCard extends HTMLElement {
    #shadowRoot;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.#shadowRoot.innerHTML = `${this.#getStyles()} ${this.#getLayout()}`;

        const btnTrash = this.#shadowRoot.getElementById("btn-trash");
        btnTrash.onclick = () => {
            console.log("btnTrash", this.props.id);
        };

        const btnFavorite = this.#shadowRoot.getElementById("btn-favorite");
        btnFavorite.onclick = () => {
            console.log("btnFavorite", this.props.id);
        };
    }

    disconnectedCallback() {
        const btnTrash = this.#shadowRoot.getElementById("btn-trash");
        const btnFavorite = this.#shadowRoot.getElementById("btn-favorite");
        btnTrash.onclick = btnFavorite.onclick = null;
    }


    get props() {
        return {
            id: this.getAttribute("id"),
            title:  this.getAttribute("title"),
            author: this.getAttribute("author"),
            isFavorite: this.getAttribute("isFavorite") === "true"
        };
    }


    #getStyles() {
        return dedent`
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    border: 0;
                }
                
                *,*:before,*:after{-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}
             

                .book-card {
                    width: 440px;
                    height: 180px;
                    padding: 28px 32px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    gap: 5px;
                    background-color: white;
                    border-radius: 10px;
                    font-family: "Poppins";
                    font-size: 15px;
                }
                
                .book-card__title {
                     font-weight: 700;
                     font-size: 20px;
                     line-height: 30px;
                }
                
                .book-card__author {
                     margin-top: 10px;
                     font-size: 17px;
                     line-height: 24px;
                     font-weight: 400;
                }
                
                .book-card__buttons {
                     display: flex;
                     flex-direction: column;
                     justify-content: space-between;
                }
                
                .book-card__btn {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #EDEDED;
                    border-radius: 12px;
                }
                
                .book-card__btn:active {
                    transform: scale(0.98);
                }
                
                .book-card__btn:hover {
                    transition: 0.12s;
                    background-color: #bbc5c7;
                }
                
                .book-card__btn svg {
                    width: 20px;
                    height: 20px;
                }
                
                .book-card__btn svg:hover * {
                    fill: #6DA7B6;
                }
            </style>
        `;
    }

    #getLayout() {
        const favBtnColor = this.props.isFavorite ? "red" : "gray";

        return dedent`
            <div class="book-card">
                <div>
                    <h3 class="book-card__title">
                        ${this.props.title}
                    </h3>
                    <h4 class="book-card__author">
                        ${this.props.author}
                    </h4>
                </div>
                <div class="book-card__buttons">
                    <button class="book-card__btn" id="btn-favorite" type="button">
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.3762 2.5401C18.5386 0.825205 16.1258 -0.577889 13.3191 0.239024C11.9779 0.625491 10.8078 1.45428 9.99986 2.58999C9.19192 1.45428 8.02178 0.625491 6.68062 0.239024C3.86771 -0.565417 1.46111 0.825205 0.623483 2.5401C-0.55169 4.94095 -0.0641182 7.64113 2.0737 10.5658C3.74894 12.8544 6.14304 15.1742 9.61856 17.8681C9.72839 17.9536 9.86369 18 10.003 18C10.1423 18 10.2776 17.9536 10.3874 17.8681C13.8567 15.1804 16.257 12.8793 17.9323 10.5658C20.0638 7.64113 20.5514 4.94095 19.3762 2.5401Z" 
                                fill=${favBtnColor}
                            />
                        </svg>

                    </button>
                    <button class="book-card__btn" id="btn-trash" type="button">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.1667 3.6H15.8333V1.6C15.8333 0.7175 15.0859 0 14.1667 0H5.83333C4.91406 0 4.16667 0.7175 4.16667 1.6V3.6H0.833333C0.372396 3.6 0 3.9575 0 4.4V5.2C0 5.31 0.09375 5.4 0.208333 5.4H1.78125L2.42448 18.475C2.46615 19.3275 3.20052 20 4.08854 20H15.9115C16.8021 20 17.5339 19.33 17.5755 18.475L18.2187 5.4H19.7917C19.9062 5.4 20 5.31 20 5.2V4.4C20 3.9575 19.6276 3.6 19.1667 3.6ZM13.9583 3.6H6.04167V1.8H13.9583V3.6Z"
                                fill="#B1B1B1"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }
}

window.customElements.define("book-card", BookCard);