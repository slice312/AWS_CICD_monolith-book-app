import {Api} from "/src/shared/api";
import {Alerts} from "/src/shared/ui";
import {layout} from "./ui";



const open = async (bookId) => {
    try {
        const bookInfo = await Api.getBook(bookId);
        const domParser = new DOMParser();
        const htmlTemplate =  domParser.parseFromString(layout(bookInfo), "text/html");
        const modalAbout = document.body.appendChild(htmlTemplate.body.firstChild);
        const btnAboutModalClose = document.getElementById("modal-order-close-btn");
        btnAboutModalClose.onclick = () => {
            modalAbout.remove();
        };


    } catch (err) {
        Alerts.showError(err);
    }



};


export const ModalAbout = {
    open
};