import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Constants} from "/src/shared/constants";
import {Alerts, BlockingLoader} from "/src/shared/ui";
import {BookCard} from "/src/entities/book-card";
import {ModalAbout} from "/src/widgets/modal-about";


const redirectIfNotAuthenticated = async () => {
    try {
        const userData = await Api.authMe();
        const userLabel = document.getElementById("nav-header-username");
        userLabel.textContent = userData.username;
    } catch {
        window.location.href = "./login.html";
    }
};


const app = async () => {
    try {
        BlockingLoader.show();

        baseInit();
        await redirectIfNotAuthenticated();
        await loadBooks();

        const logoutLink = document.getElementById("header-logout-link");
        logoutLink.onclick = () => {
            window.localStorage.removeItem(Constants.USER_TOKEN_LS_KEY);
            window.location.href = "./";
        };
    } catch (err) {
        console.error(err);
        Alerts.showError(err);
    } finally {
        BlockingLoader.hide();
    }
};


const loadBooks = async () => {
    try {
        const userToken = window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY);

        const books = await Api.getBooks(userToken);

        const booksContainer = document.getElementById("book-list");
        for (const book of books) {
            const bookCard = new BookCard(onBookCardClick, onDeleteBook, onFavoriteToggle);
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

const onBookCardClick = async (props) => {
    await ModalAbout.open(props.id,
        () => onDeleteBook(props),
        () => onFavoriteToggle(props)
    );
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
