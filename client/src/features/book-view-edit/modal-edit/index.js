import {Alerts} from "/src/shared/ui";
import {layout} from "./ui";


const open = (bookInfo, onClosing, onDelete) => {
    try {
        const domParser = new DOMParser();
        const htmlTemplate =  domParser.parseFromString(layout(bookInfo), "text/html");
        const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);

        const bookForm = document.getElementById("modal-edit-form");
        bookForm.onsubmit = (e) => {
            e.preventDefault();
        };

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

        const btnDelete = document.getElementById("modal-edit-btn-remove");
        btnDelete.onclick = async () => {
            if (await onDelete())
                btnClose.click();
        };

    } catch (err) {
        Alerts.showError(err);
    }
};


export const ModalEdit = {
    open
};