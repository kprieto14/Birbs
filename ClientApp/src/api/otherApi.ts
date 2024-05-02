import axios from 'axios';
import { NewUserType, User } from '../types';

const baseURL = 'http://127.0.0.1:5000/api'

function otherApi() {
    return {
        registerUser: async (newUser: NewUserType): Promise<User> => {            
            const registerUser = await axios.post(`${baseURL}/Users`, newUser);

            if (registerUser.status === 200) {
                return registerUser.data;
            }

            throw new Error('Failed to create new user');
        },
    }
}

export default otherApi()