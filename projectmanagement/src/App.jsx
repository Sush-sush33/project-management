import React, { useState } from 'react';
import ProjectList from './contexts/ProjectList.jsx'; // Replace 'ProjectList' with the actual file name
import ProjectCard  from './contexts/CreateProjectModal.jsx'; // Replace 'CreateProjectModal' with the actual file name
import Header from './contexts/Header.jsx';
import ProjectForm from './contexts/ProjectForm.jsx';
import DeleteConfirmation from './contexts/DeleteConfirmation.jsx';
import AnimatedContainer from './contexts/AnimatedContainer.jsx';
const App = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditProject = (project) => {
    // Logic for editing a project
    console.log('Edit project:', project);
  };

  const handleDeleteProject = (projectId) => {
    // Logic for deleting a project
    console.log('Delete project:', projectId);
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Projects"
        subtitle="Manage your projects"
        onAddNew={() => setIsCreateOpen(true)}
      />

      <div className="flex-grow">
        <ProjectList
          projects={filteredProjects}
          searchTerm={searchTerm}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      </div>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};

export default App;