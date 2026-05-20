import { io } from "socket.io-client"
const BaseURL = import.meta.env.VITE_API_URL;

export const socket = io(BaseURL);
