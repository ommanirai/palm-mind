import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const http = axios.create({
    baseURL: BaseURL
})

const getHeaders = (isSecured) => {
    let options = {
        "Content-Type": "application/json"
    }
    if (isSecured) {
        options['Authorization'] = localStorage.getItem('token');
    }
    return options;
}

const GET = (url, isSecured = false, params = {}) => {
    return http.get(url, {
        headers: getHeaders(isSecured),
        params
    })
}

const POST = (url, data, isSecured = false, params = {}) => {
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params
    })
}

const PUT = (url, data, isSecured = false, params = {}) => {
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params
    })
}

const DELETE = (url, isSecured = false, params = {}) => {
    return http.delete(url, {
        headers: getHeaders(isSecured),
        params
    })
}

export const HttpClient = {
    GET,
    POST,
    PUT,
    DELETE,
}