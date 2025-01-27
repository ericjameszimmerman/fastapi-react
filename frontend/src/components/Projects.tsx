import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { ProjectService } from '../services/ProjectService';
import { Project, ProjectCreate } from '../types';

export const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState<ProjectCreate>({ name: '', description: '' });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await ProjectService.getProjects();
            setProjects(data);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    const handleCreateProject = async () => {
        try {
            await ProjectService.createProject(formData);
            setShowCreateModal(false);
            setFormData({ name: '', description: '' });
            loadProjects();
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await ProjectService.deleteProject(id);
                if (selectedProject?.id === id) {
                    setSelectedProject(null);
                }
                loadProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const handleUpdateProject = async () => {
        if (!selectedProject) return;
        try {
            await ProjectService.updateProject(selectedProject.id, formData);
            setShowEditModal(false);
            loadProjects();
            const updatedProject = await ProjectService.getProject(selectedProject.id);
            setSelectedProject(updatedProject);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Projects</h2>
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                    New Project
                </Button>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {projects.map((project) => (
                    <Col key={project.id}>
                        <Card 
                            className={`h-100 ${selectedProject?.id === project.id ? 'border-primary' : ''}`}
                            onClick={() => setSelectedProject(project)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-start">
                                    {project.name}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteProject(project.id);
                                        }}
                                    >
                                        ×
                                    </Button>
                                </Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">{project.tasks.length} tasks</small>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFormData({
                                                name: project.name,
                                                description: project.description || ''
                                            });
                                            setShowEditModal(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Create Project Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateProject}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Project Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProject}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}; 