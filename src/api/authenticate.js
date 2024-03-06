import axios from 'axios';

export const authenticate = async (token) => {
    try {
        // const response = await axios.get('http://localhost:3000/authenticate', {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // });
        // return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            location.href = new URL('login-error/?message=backend not responded', window.origin).href;
            console.log('failed to contact with server');
        }
    }
    return null;
}