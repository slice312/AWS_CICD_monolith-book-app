import {Alerts, BlockingLoader} from "/src/shared/ui";
import {layout} from "./ui";
import {Api} from "/src/shared/api";


const open = (bookInfo, onClosing) => {
    try {
        const domParser = new DOMParser();
        const htmlTemplate = domParser.parseFromString(layout({}), "text/html");
        const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);

        const bookForm = document.getElementById("modal-edit-form");
        bookForm.onsubmit = (e) => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));

            clearErrors();
            setTimeout(async () => {
                try {
                    if (validate(formData)) {
                        BlockingLoader.show();
                        await Api.addBook(formData);
                        Alerts.showSuccessMsg("заебумба", () => {
                            window.location.href = "./";
                        });
                    }
                } catch (err) {
                    Alerts.showError(err);

                } finally {
                    BlockingLoader.hide();
                }
            }, 80);
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

    } catch (err) {
        Alerts.showError(err);
    }
};


const fieldsElements = () => ({
    name: {
        input: document.getElementById("modal-create-field-name-input"),
        errLabel: document.getElementById("modal-create-field-name-err")
    },
    author: {
        input: document.getElementById("modal-create-field-author-input"),
        errLabel: document.getElementById("modal-create-field-author-err")
    }
});

const clearErrors = () => {
    for (const field of Object.values(fieldsElements())) {
        field.input.classList.remove("input_error");
        field.errLabel.textContent = "";
    }
};

const validate = (data) => {
    let result = true;

    const elements = fieldsElements();

    if (!data.name) {
        elements.name.errLabel.textContent = "Field is required";
        elements.name.input.classList.add("input_error");
        result = false;
    }

    if (!data.author) {
        elements.author.errLabel.textContent = "Field is required";
        elements.author.input.classList.add("input_error");
        result = false;
    }

    return result;
};


export const ModalBookCreate = {
    open
};