import dayjs from "dayjs";


export class HttpClient {
    /** @type {string} */
    #baseUrl;

    /** @type {number} */
    #timeout;

    #abortController = new AbortController();

    static #defaultHeaders = {
        "Content-Type": "application/json"
    };

    constructor(baseUrl, timeout) {
        this.#baseUrl = baseUrl;
        this.#timeout = timeout;
    }

    #getFullPath(path) {
        return `${this.#baseUrl}/${path}`;
    }

    get(url, headers) {
        return this.#request(url, "GET", null, headers);
    }

    post(url, data, headers) {
        return this.#request(url, "POST", data, headers);
    }

    delete(url, headers) {
        return this.#request(url, "DELETE", null, headers);
    }

    put(url, data, headers) {
        return this.#request(url, "PUT", data, headers);
    }

    async #request(url, method = "GET", data, headers) {
        let timeoutCallbackId;

        try {
            const config = {
                method,
                headers: {
                    ...HttpClient.#defaultHeaders,
                    ...headers
                },
                signal: this.#abortController.signal
            };

            if (method === "POST" || method === "PUT" || method === "PATCH")
                config.body = JSON.stringify(data);


            const fullUrl = this.#getFullPath(url);
            const date = dayjs(new Date()).format("DD.MM.YYYY hh:mm:ss"); // TODO: move to middleware
            console.log(`${date}: [${method}]: ${fullUrl}`);

            timeoutCallbackId = setTimeout(() => this.#abortController.abort(), this.#timeout);
            return await fetch(fullUrl, config);

        } catch (err) {
            if (err.name === "AbortError") {
                throw new Error("Request timed out");
            }

            console.error(err);
            throw err;

        } finally {
            clearTimeout(timeoutCallbackId);
        }
    };
}
