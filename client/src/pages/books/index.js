import {doo} from "/src/index";
import Swal from "sweetalert2";
import {Api} from "/src/api";


doo();

const app = () => {
    const loginForm = document.getElementById("login-form");

    loginForm.onsubmit = async (e) => {
        e.preventDefault();

        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;

        try {
            const userData = await Api.login(username, password);
            window.localStorage.setItem("userToken", userData.token);
            console.log("login", userData);
            window.location.href = "./books";
        } catch (err) {
            showError(err);
        }
    };
};

const showError = (err) => {
    Swal.fire({
        title: 'Error!',
        text: err,
        icon: 'error',
        confirmButtonText: 'Cool',
        confirmButtonColor: "#287F9A"
    });

};

window.addEventListener("DOMContentLoaded", app);