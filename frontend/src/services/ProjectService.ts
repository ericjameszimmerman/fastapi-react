import api from './api';
import { Project, ProjectCreate } from '../types';

export class ProjectService {
    static async getProjects(): Promise<Project[]> {
        const response = await api.get('/projects/');
        return response.data;
    }

    static async getProject(id: number): Promise<Project> {
        const response = await api.get(`/projects/${id}/`);
        return response.data;
    }

    static async createProject(project: ProjectCreate): Promise<Project> {
        const response = await api.post('/projects/', project);
        return response.data;
    }

    static async updateProject(id: number, project: ProjectCreate): Promise<Project> {
        const response = await api.put(`/projects/${id}/`, project);
        return response.data;
    }

    static async deleteProject(id: number): Promise<void> {
        await api.delete(`/projects/${id}/`);
    }
} 