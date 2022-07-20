import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Constants} from "/src/shared/constants";
import {Alerts, BlockingLoader} from "/src/shared/ui";
import {BookCard} from "/src/entities/book-card";


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
            const bookCard = new BookCard(onDeleteBook, onFavoriteToggle);
            bookCard.setAttribute("id", book.id);
            bookCard.setAttribute("title", book.name);
            bookCard.setAttribute("author", book.author);
            bookCard.setAttribute("is-favorite", book.isFavorite);


            booksContainer.appendChild(bookCard);
        }

    } catch (err) {
        Alerts.showError(err);
    }
};


const onDeleteBook = async (props) => {
    try {
        const response = await Api.deleteBook(props.id);
        const bookCard = document.getElementById(props.id);
        bookCard.remove();
    } catch (err) {
        console.log(err);
        Alerts.showError(err);
    }
};

const onFavoriteToggle = async (props) => {
    try {
        const response = await Api.updateBook(props.id, {isFavorite: !props.isFavorite});
        const bookCard = document.getElementById(props.id);
        bookCard.setAttribute("is-favorite", String(!props.isFavorite));

    } catch (err) {
        console.log(err);
        Alerts.showError(err);
    }
};


window.addEventListener("DOMContentLoaded", app);


;