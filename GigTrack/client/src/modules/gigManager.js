import { getToken } from "./authManager";

const baseUrl = '/api/gig';

export const getAllGigs = () => {
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
                throw new Error("An unknown error occurred while trying to get gigs.");
            }
        });
    });
};

export const getGigById = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get gig details.");
            }
        });
    });
};

//-----Filter gig fetches-----
export const filterGigsByLocationId = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/filterByLocation/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get gigs by Location.");
            }
        });
    });
};

export const filterGigsByClientId = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/filterByClient/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get gigs by Client.");
            }
        });
    });
};

export const filterGigsByVenueName = (venue) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/filterByVenueName?venue=${venue}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get gigs by Venue.");
            }
        });
    });
};
//----------

export const addGig = (gig) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gig)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new gig.");
            }
        });
    });
};

export const deleteGig = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    })
};

export const updateGig = (editedGig) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${editedGig.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedGig)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this gig.');
            }
        })

    });
};

