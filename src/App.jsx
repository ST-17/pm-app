import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

const INITIAL_PROJECTS_STATE = {
  selectedProjectId: undefined,
  projects: [
    {
      title: "Learn Angular",
      description:
        '"Learn Angular" is an educational project designed to help developers of all levels master the fundamentals and advanced concepts of Angular, a powerful TypeScript-based framework for building dynamic, scalable web applications. The project offers a structured and interactive learning path that includes tutorials, coding exercises, and real-world projects to provide hands-on experience.',
      dueDate: "2025-02-04",
      id: 0.6997033681148097,
    },
    {
      title: "Learn Vue",
      description:
        '"Learn Vue" is an educational project designed to help developers of all levels master the fundamentals and advanced concepts of Vue.js, a progressive JavaScript framework for building user interfaces. The project offers a structured and interactive learning path that includes tutorials, coding exercises, and real-world projects to provide hands-on experience.',
      dueDate: "2030-02-04",
      id: 0.7107479256131923,
    },
    {
      title: "Learn React",
      description:
        '"Learn React" is an educational project designed to help developers of all levels master the fundamentals and advanced concepts of React, a popular JavaScript library for building user interfaces. The project offers a structured and interactive learning path that includes tutorials, coding exercises, and real-world projects to provide hands-on experience.',
      dueDate: "2027-02-04",
      id: 0.38557624939671364,
    },
  ],
  tasks: [
    {
      text: "Two-Way Data Binding with v-model",
      projectId: 0.7107479256131923,
      id: 0.5771917698081799,
    },
    {
      text: "Learn Vue Syntax and Directives",
      projectId: 0.7107479256131923,
      id: 0.3970841585495779,
    },
    {
      text: "Set Up Vue Development Environment",
      projectId: 0.7107479256131923,
      id: 0.5353045401893866,
    },
    {
      text: "Build a Simple To-Do List",
      projectId: 0.38557624939671364,
      id: 0.8056008408238442,
    },
    {
      text: "React Events",
      projectId: 0.38557624939671364,
      id: 0.7805631675908116,
    },
    {
      text: "Manage State with useState",
      projectId: 0.38557624939671364,
      id: 0.6311481383015438,
    },
    {
      text: "Understand Components and Props",
      projectId: 0.38557624939671364,
      id: 0.03469307036747993,
    },
    {
      text: "Learn JSX Syntax",
      projectId: 0.38557624939671364,
      id: 0.980543854940569,
    },
  ],
};

function App() {
  const [projectsState, setProjectsState] = useState(INITIAL_PROJECTS_STATE);

  const handleAddTask = (text) => {
    setProjectsState((prevProjectsState) => {
      console.log(prevProjectsState);
      const newTask = {
        text,
        projectId: prevProjectsState.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevProjectsState,
        tasks: [newTask, ...prevProjectsState.tasks],
      };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: prevProjectsState.tasks.filter((task) => task.id !== id),
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: prevProjectsState.projects.filter(
          (project) => project.id !== prevProjectsState.selectedProjectId
        ),
      };
    });
  };

  const handleSelectProject = (id) => {
    setProjectsState((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: id };
    });
  };

  const handleStartAddProject = () => {
    setProjectsState((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: null };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: undefined };
    });
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: newProject.id,
        projects: [newProject, ...prevProjectsState.projects],
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content;
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancelAddProject={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    content = (
      <SelectedProject
        project={selectedProject}
        onDeleteProject={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks}
      />
    );
  }

  return (
    <main className="min-h-screen pt-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
