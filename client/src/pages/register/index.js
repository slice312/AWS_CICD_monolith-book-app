import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Alerts} from "/src/shared/ui";


const app = () => {
    baseInit();

    const registerForm = document.getElementById("register-form");

    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        showLoader();

        const formData = new FormData(registerForm);

        try {
            const resp = await Api.register(Object.fromEntries(formData));
            Alerts.showSuccessMsg("заебумба", () => {
                window.location.href = "./";
            });

        } catch (err) {
            Alerts.showError(err);
        } finally {
            hideLoader();
        }
    };
};



const showLoader = () => {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
};


const hideLoader = () => {
    const loader = document.getElementById("loader");
    loader.style.display = "none";
};


window.addEventListener("DOMContentLoaded", app);