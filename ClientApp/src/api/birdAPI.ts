import axios from 'axios';
import { Bird, BirdParams } from '../types';

const baseURL = 'http://localhost:5000/api/Birds'

function birdApi() {
    return {
        // Bird Endpoints
        getBirds: async (userId: number): Promise<Bird[]> => {
            const loadBirds = await axios.get(`${baseURL}/list/${userId}`)

            if (loadBirds.status === 201) {
                return loadBirds.data;
            }

            throw new Error('Failed to load users');
        },
        // This grabs a single bird, UNFININSHED ENDPOINT FOR NOW
        getBird: async (birdId: number) => {
            const getBird = await axios.get(`${baseURL}/${birdId}`)

            if (getBird.status === 201) {
                return getBird.data
            }

            throw new Error('Failed to load bird')
        },
        createNewBird: async (userId: number | undefined, newBirdData: BirdParams): Promise<Bird> => {
            if (!userId) {
                throw new Error('Company ID is required');
            }
            
            const createBird = await axios.post(`${baseURL}/${userId}`, newBirdData);

            if (createBird.status === 201) {
                return createBird.data;
            }

            throw new Error('Failed to create bird');
        },
        // This updates a single user
        updateBird: async (birdId: number | undefined, birdData: BirdParams): Promise<Bird> => {
            if (!birdId) {
                throw new Error('Bird ID is required');
            }

            const updateBird = await axios.put(`${baseURL}/${birdId}`, birdData);

            if (updateBird.status === 201) {
                return updateBird.data;
            }

            throw new Error('Failed to update bird');
        },
        // This deletes a single user
        // We are not declaring a return type because we are not returning anything
        deleteBird: async (birdId: number | undefined) => {
            if (!birdId) {
                throw new Error('User ID is required');
            }

            const deleteBird = await axios.delete(`${baseURL}/${birdId}`);

            if (deleteBird.status === 204) {
                return 
            }

            throw new Error('Failed to delete bird');
        },
    }
}

export default birdApi()