// Sample data for projects with task status
const projects = [
    {
        id: 1,
        name: "Project A",
        description: "A web application focused on user authentication and data processing.",
        repoLink: "https://github.com/user/project-a",
        tasks: [
            { name: "Fix bug in user authentication", status: "open" },
            { name: "Improve performance of data processing", status: "reserved" },
            { name: "Update documentation", status: "completed" }
        ]
    },
    {
        id: 2,
        name: "Project B",
        description: "A data analysis tool with extensive reporting features.",
        repoLink: "https://github.com/user/project-b",
        tasks: [
            { name: "Add new feature for reporting", status: "open" },
            { name: "Refactor codebase", status: "open" },
            { name: "Improve test coverage", status: "reserved" }
        ]
    },
    {
        id: 3,
        name: "Project C",
        description: "A modern UI/UX project with advanced API integration.",
        repoLink: "https://github.com/user/project-c",
        tasks: [
            { name: "Redesign the UI", status: "completed" },
            { name: "Enhance API functionality", status: "open" },
            { name: "Write unit tests", status: "reserved" }
        ]
    }
];

// Function to load projects on the main page
function loadProjects() {
    const projectList = document.getElementById("project-list");

    projects.forEach(project => {
        const projectItem = document.createElement("li");
        projectItem.classList.add("project-item");

        // Project title and description
        projectItem.innerHTML = `
            <strong>${project.name}</strong>
            <p class="project-description">${project.description}</p>
        `;

        projectItem.addEventListener("click", () => showProjectDetails(project));
        projectList.appendChild(projectItem);
    });
}

// Function to show project details
function showProjectDetails(project) {
    const container = document.querySelector(".container");
    container.innerHTML = `
        <h1>${project.name}</h1>
        <p><strong>Repository:</strong> <a href="${project.repoLink}" target="_blank">${project.repoLink}</a></p>
        <h2>Tasks to Contribute</h2>
        <ul id="task-list">
            ${project.tasks.map(task => `
                <li class="project-task">
                    <input type="checkbox" ${task.status === "completed" ? "checked" : ""} disabled />
                    <label>${task.name}</label>
                    <button 
                        class="reserve-btn" 
                        onclick="reserveTask(${project.id}, '${task.name}')" 
                        ${task.status !== "open" ? "disabled" : ""}>
                        Reserve
                    </button>
                </li>`).join("")}
        </ul>
        <button onclick="goBack()">Back to Projects</button>
    `;
}

// Function to handle task reservation
function reserveTask(projectId, taskName) {
    const project = projects.find(p => p.id === projectId);
    const task = project.tasks.find(t => t.name === taskName);

    if (task && task.status === "open") {
        task.status = "reserved";
        alert(`You have reserved the task: "${taskName}"`);
        showProjectDetails(project); // Refresh project details to update the task status
    }
}

// Function to go back to the main project list
function goBack() {
    document.querySelector(".container").innerHTML = `
        <h1>Developer Projects</h1>
        <ul id="project-list"></ul>
    `;
    loadProjects();
}

// Initialize the project list on page load
window.onload = loadProjects;

