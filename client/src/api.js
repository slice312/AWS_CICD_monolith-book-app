// TODO: dotenv
const WEB_API_URL = "http://localhost:1717";


const getHttpInstance = (baseUrl) => {
    const defaultHeaders = {
        "Content-Type": "application/json"
    };


    const getFullPath = (path) => `${baseUrl}/${path}`;

    return {
        get: (url) => {
            debugger
            return fetch(getFullPath(url), {
                method: "GET",
                headers: defaultHeaders
            });
        },
        post: (url, data) => {
            return fetch(getFullPath(url), {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(data)
            });
        }
    };
};


const httpInstance = getHttpInstance(WEB_API_URL);


const login = async (username, password) => {
    try {
        const response = await httpInstance.post("login", {
            username,
            password
        });
        if (response.status === 200)
            return await response.json();
        else {
            const text = await response.text();
            const err = new Error(text)
            err.status = response.status;
            throw err;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};


export const Api = {
    login
};