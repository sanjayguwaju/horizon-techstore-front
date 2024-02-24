import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authtoken: authtoken,
        }
    })
}

export const currentUser = async (authtoken) => {
    return await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_API}/current-user`, {}, {
        headers: {
            authtoken: authtoken,
        }
    });
};

export const currentAdmin = async (authtoken) => {
    return await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_API}/current-admin`, {}, {
        headers: {
            authtoken: authtoken,
        }
    });
};
