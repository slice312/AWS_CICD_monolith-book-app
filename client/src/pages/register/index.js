import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Alerts, BlockingLoader} from "/src/shared/ui";


const app = () => {
    baseInit();

    const registerForm = document.getElementById("register-form");
    registerForm.onsubmit = async (e) => {
        try {
            e.preventDefault();
            BlockingLoader.show();

            const formData = new FormData(registerForm);
            const obj = Object.fromEntries(formData);

            clearErrors();
            setTimeout(async () => {
                if (validate(obj)) {
                    await Api.register(Object.fromEntries(formData));
                    Alerts.showSuccessMsg("заебумба", () => {
                        window.location.href = "./";
                    });
                }
            }, 80);
        } catch (err) {
            Alerts.showError(err);
        } finally {
            BlockingLoader.hide();
        }
    };
};


const fieldsElements = {
    username: {
        input: document.getElementById("field-username-input"),
        errLabel: document.getElementById("field-username-err")
    },
    password: {
        input: document.getElementById("field-password-input"),
        errLabel: document.getElementById("field-password-err")
    },
    repeatPassword: {
        input: document.getElementById("field-repeatPassword-input"),
        errLabel: document.getElementById("field-repeatPassword-err")
    }
};

const clearErrors = () => {
    for (const field of Object.values(fieldsElements)) {
        field.input.classList.remove("input_error");
        field.errLabel.textContent = "";
    }
};

const validate = (data) => {
    let result = true;

    if (!data.username) {
        fieldsElements.username.errLabel.textContent = "Field is required";
        fieldsElements.username.input.classList.add("input_error");
        result = false;
    }

    if (!data.password) {
        fieldsElements.password.errLabel.textContent = "Field is required";
        fieldsElements.password.input.classList.add("input_error");
        result = false;
    }

    if (data.repeatPassword !== data.password) {
        fieldsElements.repeatPassword.errLabel.textContent = "Password does not match";
        fieldsElements.repeatPassword.input.classList.add("input_error");
        result = false;
    }

    return result;
};


window.addEventListener("DOMContentLoaded", app);