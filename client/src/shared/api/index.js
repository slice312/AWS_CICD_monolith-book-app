import {httpInstance} from "./httpInstance";


/**
 * @typedef User
 * @property {string} username
 * @property {string} password
 * @property {string} firstName
 * @property {number} age
 */


/**
 * @param {string} authToken
 * @returns {Promise<*>}
 */
const me = async (authToken) => {
    try {
        const response = await httpInstance.get("me", {
            "X-Auth": authToken
        });

        if (response.status === 200)
            return await response.json();
        if (response.status === 403)
            throw new Error("Incorrect login or password");
        await handleErrorStatuses(response);
    } catch (err) {
        console.error(err);
        throw err;
    }
};


/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<*>}
 */
const login = async (username, password) => {
    try {
        const response = await httpInstance.post("login", {
            username,
            password
        });

        if (response.status === 200)
            return await response.json();
        if (response.status === 403)
            throw new Error("Incorrect login or password");

        await handleErrorStatuses(response);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const handleErrorStatuses = async (failedResponse) => {
    const data = await failedResponse.json();
    const err = new Error(data.message);
    err.status = failedResponse.status;
    throw err;
};


/**
 *
 * @param {User} user
 * @returns {Promise<void>}
 */
const register = async (user) => {
    try {
        const response = await httpInstance.post("signin", user);

        if (response.status === 200)
            return await response.json();
        await handleErrorStatuses(response);
    } catch (err) {
        console.error(err);
        throw err;
    }
};





export const Api = {
    me,
    login,
    register
};