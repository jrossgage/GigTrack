import { getToken } from "./authManager";

const baseUrl = '/api/client';

export const getAllClients = () => {

    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get clients.");
            }
        });
    });
};