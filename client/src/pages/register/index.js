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


            const resp = await Api.register(Object.fromEntries(formData));
            Alerts.showSuccessMsg("заебумба", () => {
                window.location.href = "./";
            });

        } catch (err) {
            Alerts.showError(err);
        } finally {
            BlockingLoader.hide();
        }
    };
};


window.addEventListener("DOMContentLoaded", app);