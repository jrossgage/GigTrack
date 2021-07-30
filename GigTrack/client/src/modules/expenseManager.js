import { getToken } from "./authManager";

const baseUrl = '/api/expense';

export const getAllExpense = () => {

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
                throw new Error("An unknown error occurred while trying to get expenses.");
            }
        });
    });
};

export const getExpenseById = (id) => {
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
                throw new Error("An unknown error occurred while trying to get the expense details.");
            }
        });
    });
};

export const addExpense = (expense) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new expense.");
            }
        });
    });
};

export const deleteExpense = (id) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    })
};

export const updateExpense = (editedExpense) => {
    return getToken().then((token) => {

        return fetch(`${baseUrl}/${editedExpense.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedExpense)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this expense.');
            }
        })

    });
};

export const searchExpenses = (string) => {
    return getToken().then((token) => {
        return fetch(baseUrl + '/search?q=' + string, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to search expenses.");
            }
        });
    });
}

