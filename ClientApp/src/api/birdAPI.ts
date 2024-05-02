import axios from 'axios';
import { Bird, BirdParams } from '../types';

const baseURL = 'http://127.0.0.1:5000/api'

function birdApi() {
    return {
        // Bird Endpoints
        getBirds: async (userId: number): Promise<Bird[]> => {
            const loadBirds = await axios.get(`${baseURL}/Birds/${userId}`)

            if (loadBirds.status === 200) {
                return loadBirds.data;
            }

            throw new Error('Failed to load users');
        },
        // This grabs a single bird, UNFININSHED ENDPOINT FOR NOW
        // getBird: (birdId: number) => {
        //     return HttpClient.get(`${baseURL}/Birds/${birdId}`);
        // },
        createNewBird: async (userId: number | undefined, newBirdData: BirdParams): Promise<Bird> => {
            if (!userId) {
                throw new Error('Company ID is required');
            }
            
            const createBird = await axios.post(`${baseURL}/Birds/${userId}`, newBirdData);

            if (createBird.status === 200) {
                return createBird.data;
            }

            throw new Error('Failed to create bird');
        },
        // This updates a single user
        updateBird: async (birdId: number | undefined, birdData: BirdParams): Promise<Bird> => {
            if (!birdId) {
                throw new Error('Bird ID is required');
            }

            const updateBird = await axios.put(`${baseURL}/Birds/${birdId}`, birdData);

            if (updateBird.status === 200) {
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

            const deleteBird = await axios.delete(`${baseURL}/Birds/${birdId}`);

            if (deleteBird.status === 204) {
                return 
            }

            throw new Error('Failed to delete bird');
        },
    }
}

export default birdApi()