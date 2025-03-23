import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useProjects } from '@/context/ProjectContext';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import ProjectForm from '@/components/ProjectForm';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import AnimatedContainer from '@/components/AnimatedContainer';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ProjectList = () => {
  const { state, addProject, updateProject, deleteProject } = useProjects();
  
  // Form open states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Search and sort
  const [searchTerm, setSearchTerm] = useState('');
  
  // Currently selected project for edit/delete
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Handle edit project
  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsEditOpen(true);
  };
  
  // Handle delete project
  const handleDeleteProject = (projectId) => {
    const project = state.projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsDeleteOpen(true);
    }
  };
  
  // Handle form submissions
  const handleCreateProject = (formData) => {
    addProject({
      name: formData.name,
      description: formData.description,
      deadline: formData.deadline.toISOString(),
    });
  };
  
  const handleUpdateProject = (formData) => {
    if (selectedProject) {
      updateProject({
        ...selectedProject,
        name: formData.name,
        description: formData.description,
        deadline: formData.deadline.toISOString(),
      });
    }
  };
  
  const handleConfirmDelete = () => {
    if (selectedProject) {
      deleteProject(selectedProject.id);
    }
  };
  
  // Filter projects based on search
  const filteredProjects = state.projects
    .filter((project) => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => 
      // Sort by creation date (newest first)
      parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
    );
  
  return (
    <div className="container max-w-screen-xl mx-auto py-8 px-4 md:px-6">
      <Header 
        title="Projects" 
        subtitle="Manage your projects" 
        onAddNew={() => setIsCreateOpen(true)} 
      />
      
      <AnimatedContainer 
        className="relative mb-8"
        animation="slide-up"
        delay={100}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all duration-200"
          />
        </div>
      </AnimatedContainer>
      
      {filteredProjects.length === 0 ? (
        <AnimatedContainer 
          className="text-center py-20"
          animation="fade-in"
          delay={200}
        >
          <h3 className="text-xl font-medium text-muted-foreground">No projects found</h3>
          <p className="mt-2 text-muted-foreground">
            {searchTerm ? 'Try adjusting your search' : 'Create your first project to get started'}
          </p>
        </AnimatedContainer>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              index={index}
            />
          ))}
        </div>
      )}
      
      {/* Create Project Form */}
      <ProjectForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreateProject}
        type="create"
      />
      
      {/* Edit Project Form */}
      {selectedProject && (
        <ProjectForm
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSubmit={handleUpdateProject}
          defaultValues={selectedProject}
          type="edit"
        />
      )}
      
      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        title={`Delete "${selectedProject?.name}"`}
      />
    </div>
  );
};

export default ProjectList;
