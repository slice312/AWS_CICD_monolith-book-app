import Swal from "sweetalert2";
import {Api} from "/src/shared/api";
import {baseInit} from "/src/index";



const app = () => {
    baseInit();

    const loginForm = document.getElementById("login-form");

    loginForm.onsubmit = async (e) => {
        e.preventDefault();

        showLoader();
        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;

        try {
            const userData = await Api.login(username, password);
            window.localStorage.setItem("userToken", userData.token);
            console.log("login", userData);
            window.location.href = "./books.html";
        } catch (err) {
            showError(err);
        } finally {
            hideLoader();
        }
    };
};

const showError = (err) => {
    void Swal.fire({
        html:
            `<p class="login-page__alert-text">${err.message}</p>`,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText:
            `<button class = "btn-default login-page__alert-btn">OK</button>`
    });
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






