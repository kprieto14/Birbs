import axios from 'axios';
import { Bird, NewBirdParams } from '../types';

const baseURL = 'http://localhost:5000/api'

function birdApi() {
    return {
        // Bird Endpoints
        getBirds: async (userId: number): Promise<Bird[]> => {
            const loadBirds = await axios.get(`${baseURL}/Birds/list/${userId}`)

            if (loadBirds.status === 200) {
                return loadBirds.data;
            }

            throw new Error('Failed to load bird');
        },
        // This grabs a single bird, UNFININSHED ENDPOINT FOR NOW
        getBird: async (birdId: number) => {
            const getBird = await axios.get(`${baseURL}/Birds/${birdId}`)

            if (getBird.status === 200) {
                return getBird.data
            }

            throw new Error('Failed to load bird')
        },
        // This grabs a single bird
        getBirdOfTheDay: async () => {
            const getBirdOfTheDay = await axios.get(`${baseURL}/BirdsOfTheDay`)

            if (getBirdOfTheDay.status === 200) {
                return getBirdOfTheDay.data
            }

            throw new Error('Failed to load bird')
        },
        createNewBird: async (newBirdData: NewBirdParams): Promise<Bird> => {            
            const createBird = await axios.post(`${baseURL}/Birds`, newBirdData);

            if (createBird.status === 201) {
                return createBird.data;
            }

            throw new Error('Failed to create bird');
        },
        // This updates a single user
        updateBird: async (birdId: number | undefined, birdData: Bird): Promise<Bird> => {
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

            if (deleteBird.status === 200) {
                return 
            }

            throw new Error('Failed to delete bird');
        },
    }
}

export default birdApi()