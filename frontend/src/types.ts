export interface Project {
    id: number;
    name: string;
    description: string | null;
    tasks: Task[];
}

export interface ProjectCreate {
    name: string;
    description?: string;
}

export interface Task {
    id: number;
    name: string;
    description: string | null;
    estimate: number | null;
    priority: number | null;
    is_completed: boolean;
    project_id: number;
} 