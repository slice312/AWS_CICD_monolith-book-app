import {Api} from "/src/shared/api";
import {Alerts, BlockingLoader} from "/src/shared/ui";
import {layout} from "./ui";


const open = () => {
    try {
        const domParser = new DOMParser();
        const htmlTemplate = domParser.parseFromString(layout(), "text/html");
        const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);

        const bookForm = document.getElementById("modal-create-form");
        bookForm.onsubmit = onFormSubmit;

        const btnClose = document.getElementById("modal-create-btn-close");
        btnClose.onclick = () => {
            modalWindow.remove();
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


const onFormSubmit = (e) => {
    e.preventDefault();

    const rawFormData = Object.fromEntries(new FormData(e.target));
    const formData = {
        ...rawFormData,
        publishYear: Number(rawFormData.publishYear),
        pagesNumber: Number(rawFormData.pagesNumber),
        genres: rawFormData.genres.split()
            .map(x => x.trim())
    };

    clearErrors();
    setTimeout(async () => {
        try {
            if (validate(formData)) {
                BlockingLoader.show();
                await Api.addBook(formData);
                Alerts.showSuccessMsg("Success", () => {
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