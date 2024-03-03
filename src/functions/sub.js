import axios from "axios";

export const getSub = async (slug) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
    return response.data;
}

export const removeSub = async (slug, authtoken) => {
    const response = await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authtoken,
        },
    });
    return response.data;
}

export const updateSub = async (slug, sub, authtoken) => {
    const response = await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authtoken,
        },
    });
    return response.data;
}

export const createSub = async (sub, authtoken) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authtoken,
        },
    });
    return response.data;
}
