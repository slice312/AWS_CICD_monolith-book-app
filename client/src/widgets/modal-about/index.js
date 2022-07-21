import {Api} from "/src/shared/api";
import {Alerts} from "/src/shared/ui";
import {ModalEdit} from "/src/widgets/modal-edit";
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
        btnFavorite.onclick = async () => {
            if (await onFavoriteToggle(bookInfo)) {
                bookInfo.isFavorite = !bookInfo.isFavorite;
                const btnFavoriteIcon = document.getElementById("modal-about-btn-favorite-icon");
                btnFavoriteIcon.setAttribute("fill", bookInfo.isFavorite ? "red" : "gray");
            }
        };


        const btnEdit = document.getElementById("modal-about-btn-edit");
        btnEdit.onclick = () => {
            ModalEdit.open();// TODO: нужно перенести, https://feature-sliced.design/docs/concepts/cross-communication
            console.log("edit click");
        };


        const onKeyDown = (e) => {
            console.log("ALO");
            if (e.key === "Escape") {
                btnAboutModalClose.click();
                window.removeEventListener("keydown", onKeyDown);
            }
        };

        window.addEventListener("keydown", onKeyDown);

    } catch (err) {
        Alerts.showError(err);
    }
};


export const ModalAbout = {
    open
};