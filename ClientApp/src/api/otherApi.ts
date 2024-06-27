import axios from 'axios';
import { LoginSuccess, LoginUserType, NewUserType, User } from '../types';

const baseURL = 'http://localhost:5000/api'

function otherApi() {
    return {
        // Turn this into a regular fetch function :/ don't got time to figure this out with axios
        registerUser: async (newUser: NewUserType): Promise<User> => {            
            const registerUser = await axios.post(`${baseURL}/Users`, newUser);

            if (registerUser.status === 201) {
                return registerUser.data
            }

            throw new Error('Failed to create new user');
        },
        loginUser: async (user: LoginUserType): Promise<LoginSuccess> => {
            const loginUser = await axios.post(`${baseURL}/Sessions`, user)

            if (loginUser.status === 200) {
                return loginUser.data
            }

            throw new Error('Failed to login')
        },
    }
}

export default otherApi()