import {Api} from "/src/shared/api";
import {Alerts} from "/src/shared/ui";
import {layout} from "./ui";


const open = async (bookId, onDelete, onFavoriteToggle) => {
    try {
        // const bookInfo = await Api.getBook(bookId);
        const domParser = new DOMParser();
        const htmlTemplate =  domParser.parseFromString(layout({}), "text/html");
        const modalAbout = document.body.appendChild(htmlTemplate.body.firstChild);
        // const btnAboutModalClose = document.getElementById("modal-order-close-btn");
        // btnAboutModalClose.onclick = () => {
        //     modalAbout.remove();
        // };

    } catch (err) {
        Alerts.showError(err);
    }
};


export const ModalEdit = {
    open
};