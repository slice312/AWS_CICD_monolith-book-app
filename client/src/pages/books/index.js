import {baseInit} from "/src/index"; // TODO: init
import {Constants} from "/src/shared/constants";
import {Api} from "/src/shared/api";
import {Alerts, BlockingLoader} from "/src/shared/ui";
import {BookCard} from "/src/entities/book-card";
import {ModalAbout, ModalBookCreate} from "/src/features/book-view-edit";


const app = async () => {
    try {
        baseInit();
        BlockingLoader.show();

        const user = await getCurrentUserOrRedirect();
        renderUser(user);

        const books = await Api.getBooks();
        renderBooks(books);

        setButtonHandlers();
    } catch (err) {
        console.error(err);
        Alerts.showError(err);
    } finally {
        BlockingLoader.hide();
    }
};


const getCurrentUserOrRedirect = async () => {
    try {
        return await Api.authMe();
    } catch {
        window.location.href = "./login.html";
    }
};

const renderUser = (user) => {
    const userLabel = document.getElementById("nav-header-username");
    userLabel.textContent = user.username;
};

/**
 * @param {Array<BookInfo>} books
 */
const renderBooks = (books) => {
    const booksContainer = document.getElementById("book-list");

    for (const book of books) {
        const bookCard = new BookCard(openModalBookInfo, onDeleteBook, onCardFavoriteToggle);
        bookCard.setAttribute("id", book.id);
        bookCard.setAttribute("title", book.name);
        bookCard.setAttribute("author", book.author);
        bookCard.setAttribute("is-favorite", String(book.isFavorite));

        booksContainer.appendChild(bookCard);
    }

    showEmptyMessageIfNoBooks();
};

const showEmptyMessageIfNoBooks = () => {
    const emptyMessage = document.getElementById("book-page-empty-msg");
    emptyMessage.textContent = "";

    const bookCards = document.querySelectorAll("book-card");
    if (!bookCards.length)
        emptyMessage.textContent = "Your book list is empty, please add one more book";
};

const setButtonHandlers = () => {
    const logoutLink = document.getElementById("header-logout-link");
    logoutLink.onclick = () => {
        window.localStorage.removeItem(Constants.USER_TOKEN_LS_KEY);
        window.location.href = "./";
    };

    const btnAddBook = document.getElementById("books-page-btn-add-book");
    btnAddBook.onclick = createBook;
};

/**
 * @param {BookInfo} book
 * @returns {Promise<void>}
 */
const openModalBookInfo = async (book) => {
    await ModalAbout.open(
        book.id,
        onDeleteBook,
        onModalFavoriteToggle
    );
};

/**
 * @param {BookInfo} book
 * @returns {Promise<void>}
 */
const onDeleteBook = async (book) => {
    try {
        await Api.deleteBook(book.id);
        const bookCard = document.getElementById(book.id);
        bookCard.remove();
        showEmptyMessageIfNoBooks();
    } catch (err) {
        Alerts.showError(err);
    }
};

/**
 * @param {BookInfo} bookInfoBeforeCommit
 * @returns {Promise<boolean>}
 */
const onCardFavoriteToggle = async (bookInfoBeforeCommit) => {
    try {
        await Api.updateBook(bookInfoBeforeCommit.id, {isFavorite: !bookInfoBeforeCommit.isFavorite});
        return true;
    } catch (err) {
        Alerts.showError(err);
        return false;
    }
};

/**
 * @param {BookInfo} bookInfoBeforeCommit
 * @returns {Promise<boolean>}
 */
const onModalFavoriteToggle = async (bookInfoBeforeCommit) => {
    if (await onCardFavoriteToggle(bookInfoBeforeCommit)) {
        const bookCard = document.getElementById(bookInfoBeforeCommit.id);
        bookCard.setAttribute("is-favorite", String(!bookInfoBeforeCommit.isFavorite));
        return true;
    }

    return false;
};

const createBook = async () => {
    try {
        ModalBookCreate.open()
        // BlockingLoader.show();
        // const response = await Api.addBook()

    } catch (err) {
        Alerts.showError(err);
    } finally {
        // BlockingLoader.hide();
    }
};

window.addEventListener("DOMContentLoaded", app);
