import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from "sonner";

// Create initial state
const initialState = {
  projects: [],
  loading: false,
  error: null,
};

// Create context
const ProjectContext = createContext({
  state: initialState,
  dispatch: () => null,
  addProject: () => null,
  updateProject: () => null,
  deleteProject: () => null,
});

// Create reducer
const projectReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCESS':
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Generate a random ID (UUID-like)
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, 
          v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Create provider
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        dispatch({ 
          type: 'FETCH_PROJECTS_SUCCESS', 
          payload: JSON.parse(savedProjects) 
        });
      } catch (error) {
        console.error('Failed to parse projects from localStorage', error);
      }
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(state.projects));
  }, [state.projects]);

  // Helper functions
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
    toast.success("Project created successfully");
  };

  const updateProject = (project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project });
    toast.success("Project updated successfully");
  };

  const deleteProject = (id) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
    toast.success("Project deleted successfully");
  };

  return (
    <ProjectContext.Provider
      value={{
        state,
        dispatch,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// Create a custom hook to use the context
export const useProjects = () => useContext(ProjectContext);