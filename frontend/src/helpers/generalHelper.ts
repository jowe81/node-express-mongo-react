const apiBaseUrl = `http://localhost:5000/api/`;

async function get(urlPath: string) {
    //
}

async function post(urlPath: string, body: object) {
    const response = await makeApiRequest(getUrl(urlPath), body, "post");
    return await response.json();
}

async function makeApiRequest(url: string, body: object, optionsOrMethod?: any | string) {
    const options = { ...(typeof optionsOrMethod === "string" ? { method: optionsOrMethod } : optionsOrMethod ?? {}) };

    // Ensure we're always sending the cookie.
    options.credentials = options.credentials || "include";
    options.method = typeof optionsOrMethod === "string" ? optionsOrMethod : "post";
    if (Object.keys(body).length) {
        options.body = JSON.stringify(body);
    }

    if (!options.headers) {
        options.headers = {};
    }

    if (!options.headers["content-type"]) {
        options.headers["content-type"] = "application/json";
    }

    return window.fetch(url, options);
}

function getUrl(urlPath: string) {
    return `${apiBaseUrl}${urlPath}`;
}

export default { get, post }