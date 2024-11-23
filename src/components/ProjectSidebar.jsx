import Button from "./UI/Button.jsx";

export default function ProjectSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside
      className="w-1/3 md:w-72 bg-stone-900 text-stone-50 py-16 px-8"
      style={{ borderTopRightRadius: "1.5rem" }}
    >
      <h2 className="md:text-xl uppercase font-bold	mb-8">Your projects</h2>
      <div>
        <Button onClick={onStartAddProject} label="+ Add project" />
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-100 hover:bg-stone-700";

          if (project.id === selectedProjectId) {
            cssClasses += " text-stone-100 bg-stone-700";
          } else {
            cssClasses += " text-stone-400 ";
          }

          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
