import axios from 'axios';
import { Project, ProjectCreate } from '../types';

const API_URL = 'http://localhost:8000';

export const ProjectService = {
    getProjects: async (): Promise<Project[]> => {
        const response = await axios.get(`${API_URL}/projects/`);
        return response.data;
    },

    getProject: async (id: number): Promise<Project> => {
        const response = await axios.get(`${API_URL}/projects/${id}`);
        return response.data;
    },

    createProject: async (project: ProjectCreate): Promise<Project> => {
        const response = await axios.post(`${API_URL}/projects/`, project);
        return response.data;
    },

    deleteProject: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/projects/${id}`);
    },

    updateProject: async (id: number, project: ProjectCreate): Promise<Project> => {
        const response = await axios.put(`${API_URL}/projects/${id}`, project);
        return response.data;
    }
}; 