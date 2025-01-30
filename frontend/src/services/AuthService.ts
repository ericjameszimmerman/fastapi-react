import axios from 'axios';
import api from './api';

const API_URL = 'http://localhost:8000';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
}

class AuthService {
    async login(credentials: LoginCredentials) {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        // Use axios directly for login since we don't have a token yet
        const response = await axios.post(`${API_URL}/auth/token`, formData);
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            // Fetch user details using our api instance (which will include the token)
            const user = await this.getCurrentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        return null;
    }

    async register(username: string, email: string, password: string) {
        const response = await api.post('/auth/register', {
            username,
            email,
            password
        });
        return response.data;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await api.get('/users/me');
            return response.data;
        } catch (error) {
            this.logout();
            return null;
        }
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new AuthService(); 