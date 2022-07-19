import {Api} from "/src/shared/api";
import {baseInit} from "/src/index";
import {Alerts, BlockingLoader} from "/src/shared/ui";
import {Constants} from "/src/shared/constants";



const app = () => {
    baseInit();

    const loginForm = document.getElementById("login-form");

    loginForm.onsubmit = async (e) => {
        e.preventDefault();

        BlockingLoader.show();


        try {
            const username = loginForm.elements.username.value;
            const password = loginForm.elements.password.value;

            const userData = await Api.login(username, password);
            window.localStorage.setItem(Constants.USER_TOKEN_LS_KEY, userData.token);
            console.log("login", userData);
            window.location.href = "./books.html";
        } catch (err) {
            Alerts.showError(err);
        } finally {
            BlockingLoader.hide();
        }
    };
};



window.addEventListener("DOMContentLoaded", app);