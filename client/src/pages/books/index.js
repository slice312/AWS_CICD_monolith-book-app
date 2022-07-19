import {baseInit} from "/src/index";
import {Api} from "/src/shared/api";
import {Constants} from "/src/shared/constants";
import {BlockingLoader} from "/src/shared/ui";


const redirectIfNotAuthenticated = async () => {
    try {
        BlockingLoader.show();

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
        BlockingLoader.hide();
    }

};

// redirectIfNotAuthenticated();

const app = async () => {
    await redirectIfNotAuthenticated();
    baseInit();

};




window.addEventListener("DOMContentLoaded", app);