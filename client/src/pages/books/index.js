import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Constants} from "/src/shared/constants";
import {Alerts, BlockingLoader} from "/src/shared/ui";


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

    } catch (err) {
        Alerts.showError(err);
    }
};



window.addEventListener("DOMContentLoaded", app);


class BookCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});

    }
}