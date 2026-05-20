export const Authenticate = () => {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false
}