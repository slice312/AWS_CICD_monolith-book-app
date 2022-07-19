import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Constants} from "/src/shared/constants";


const redirectIfNotAuthenticated = async () => {
    try {
        showLoader();

        const userToken = window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY);
        if (!userToken) {
            window.location.href = "./login.html";
        }

        const userData = await Api.me(userToken);
        console.log("check Auth", userData);

    } catch (err) {
        console.error(err);
        // Alerts.showError(err);
    } finally {
        hideLoader();
    }

};

// redirectIfNotAuthenticated();

const app = async () => {
    await redirectIfNotAuthenticated();
    baseInit();

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