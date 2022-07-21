import {Api} from "/src/shared/api";
import {Alerts} from "/src/shared/ui";
import {layout} from "./ui";


const open = async (bookId, onClosing) => {
    try {
        // const bookInfo = await Api.getBook(bookId);
        const domParser = new DOMParser();
        const htmlTemplate =  domParser.parseFromString(layout({}), "text/html");
        const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);
        // const btnAboutModalClose = document.getElementById("modal-order-close-btn");
        // btnAboutModalClose.onclick = () => {
        //     modalAbout.remove();
        // };

        const btnClose = document.getElementById("modal-edit-btn-close");
        btnClose.onclick = () => {
            modalWindow.remove();
            onClosing?.();
        };

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                btnClose.click();
                window.removeEventListener("keydown", onKeyDown);
            }
        };

        window.addEventListener("keydown", onKeyDown);

    } catch (err) {
        Alerts.showError(err);
    }
};


export const ModalEdit = {
    open
};