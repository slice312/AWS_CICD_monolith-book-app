import {httpInstance} from "./httpInstance";


const login = async (username, password) => {
    try {
        const response = await httpInstance.post("login", {
            username,
            password
        });

        if (response.status === 200)
            return await response.json();
        await handleErrorStatuses(response);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const handleErrorStatuses = async (response) => {
    switch (response.status) {
        case 403:
            throw new Error("Incorrect login or password");
        default:
            const text = await response.text();
            const err = new Error(text);
            err.status = response.status;
            throw err;
    }
};


export const Api = {
    login
};