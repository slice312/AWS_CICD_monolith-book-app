import {Api} from "/src/shared/api";
import {Alerts} from "/src/shared/ui";
import {layout} from "./ui";


const open = async (bookId, onDelete, onFavoriteToggle) => {
    try {
        const bookInfo = await Api.getBook(bookId);
        const domParser = new DOMParser();
        const htmlTemplate =  domParser.parseFromString(layout(bookInfo), "text/html");
        const modalAbout = document.body.appendChild(htmlTemplate.body.firstChild);
        const btnAboutModalClose = document.getElementById("modal-order-close-btn");
        btnAboutModalClose.onclick = () => {
            modalAbout.remove();
        };

        const btnTrash = document.getElementById("btn-trash");
        btnTrash.onclick = () => {
            btnAboutModalClose.click();
            onDelete(bookInfo);
        };

        const btnFavorite = document.getElementById("btn-favorite");
        btnFavorite.onclick = () => {
            onFavoriteToggle(bookInfo);
            bookInfo.isFavorite = !bookInfo.isFavorite;
            const btnFavorite = document.getElementById("modal-about-btn-favorite-icon");
            btnFavorite?.setAttribute("fill", bookInfo.isFavorite ? "red" : "gray");
        };
    } catch (err) {
        Alerts.showError(err);
    }
};


export const ModalAbout = {
    open
};