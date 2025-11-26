const ITSON_ID = "252973"; 
const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1/publicProjects";

const container = document.getElementById("projectsContainer");

async function loadProjects() {
    try {
        const res = await fetch(`${API_BASE}/${ITSON_ID}`);
        if (!res.ok) throw new Error("No se pudieron cargar los proyectos");
        const projects = await res.json();
        renderProjects(projects);
    } catch (err) {
        container.innerHTML = "<p>Error al cargar proyectos.</p>";
        console.error(err);
    }
}

function renderProjects(projects) {
    container.innerHTML = "";
    projects.forEach(p => {
        const techList = Array.isArray(p.technologies) ? p.technologies.join(", ") : "";
        const img = Array.isArray(p.images) && p.images.length ? p.images[0] : "";
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
            ${img ? `<img src="${img}" alt="${p.title}">` : ""}
            <div class="card-content">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <p><strong>Tecnologías:</strong> ${techList}</p>
                ${p.repository ? `<a href="${p.repository}" target="_blank" class="btn-repo">Repositorio</a>` : ""}
            </div>
        `;
        container.appendChild(card);
    });
}

loadProjects();
