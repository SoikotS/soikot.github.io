async function loadJSON(file) {
    const r = await fetch(file);

    if (!r.ok) {
        throw new Error(`Unable to load: ${file}`);
    }

    return r.json();
}


function setText(id, value) {
    const el = document.getElementById(id);

    if (el) {
        el.textContent = value ?? "";
    }
}


function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   Home Page
   ========================================================= */

async function renderHome() {
    try {
        const [p, r, u] = await Promise.all([
            loadJSON("data/profile.json"),
            loadJSON("data/research.json"),
            loadJSON("data/updates.json")
        ]);

        setText("hero-name", p.name);
        setText("hero-title", p.title);
        setText("hero-description", p.short_intro);

        const img = document.getElementById("profile-image");

        if (img) {
            img.loading = "eager";
            img.decoding = "async";

            if (p.photo) {
                img.src = p.photo;
            }
        }

        setText("about-text", p.about);

        if (p.scholar) {
            setText("stat-publications", p.scholar.publications);
            setText("stat-citations", p.scholar.citations);
            setText("stat-hindex", p.scholar.h_index);
        }

        const socials = document.getElementById("social-links");

        if (socials && Array.isArray(p.socials)) {
            socials.innerHTML = p.socials.map(x => `
                <a class="social-btn"
                   href="${escapeHTML(x.url)}"
                   target="_blank"
                   rel="noopener noreferrer">
                    ${escapeHTML(x.name)}
                </a>
            `).join("");
        }

        const interests = document.getElementById("interest-grid");

        if (interests && Array.isArray(r.interests)) {
            interests.innerHTML = r.interests.map((x, i) => `
                <div class="card">
                    <span class="meta">${String(i + 1).padStart(2, "0")}</span>
                    <h3>${escapeHTML(x.title)}</h3>
                    <p>${escapeHTML(x.description)}</p>
                </div>
            `).join("");
        }

        const fp = document.getElementById("featured-publication");

        if (fp && r.featured) {
            fp.innerHTML = `
                <div class="featured-year">
                    ${escapeHTML(r.featured.year)}
                </div>

                <div class="featured-cover-wrap">
                    ${
                        r.featured.image
                            ? `
                                <img class="featured-cover"
                                     src="${escapeHTML(r.featured.image)}"
                                     alt="Front page of ${escapeHTML(r.featured.title)}"
                                     loading="lazy"
                                     onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');">
                              `
                            : ""
                    }
                </div>

                <div class="featured-content">
                    <h3>${escapeHTML(r.featured.title)}</h3>
                    <p class="authors">${escapeHTML(r.featured.authors)}</p>
                    <p class="journal">${escapeHTML(r.featured.journal)}</p>

                    ${
                        r.featured.link
                            ? `
                                <a class="link"
                                   href="${escapeHTML(r.featured.link)}"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    View publication →
                                </a>
                              `
                            : ""
                    }
                </div>
            `;
        }

        const up = document.getElementById("updates");

        if (up && Array.isArray(u)) {
            up.innerHTML = u.map(x => `
                <div class="update">
                    <div class="update-date">${escapeHTML(x.date)}</div>
                    <div>
                        <h3>${escapeHTML(x.title)}</h3>
                        <p>${escapeHTML(x.description)}</p>
                    </div>
                </div>
            `).join("");
        }

    } catch (e) {
        console.error("Home page error:", e);
    }
}


/* =========================================================
   Other Pages
   ========================================================= */

async function renderPage() {
    const page = document.body.dataset.page;

    try {

        /* =================================================
           Research Experience
           ================================================= */

        if (page === "research") {
            const r = await loadJSON("data/research.json");
            const researchList = document.getElementById("research-list");

            if (researchList && Array.isArray(r.experience)) {
                researchList.innerHTML = r.experience.map(x => `
                    <div class="item">

                        <div class="item-date">
                            ${escapeHTML(x.period)}
                        </div>

                        <div class="research-item-content">

                            ${
                                x.image
                                    ? `
                                        <div class="research-image-wrap">
                                            <img class="research-image"
                                                 src="${escapeHTML(x.image)}"
                                                 alt="${escapeHTML(x.title)}"
                                                 loading="lazy"
                                                 onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');">
                                        </div>
                                      `
                                    : ""
                            }

                            <div class="research-item-text">
                                <h3>${escapeHTML(x.title)}</h3>
                                <h4>${escapeHTML(x.area)}</h4>
                                <p>${escapeHTML(x.description)}</p>
                            </div>

                        </div>

                    </div>
                `).join("");
            }
        }


        /* =================================================
           Publications
           Year → Image → Information
           ================================================= */

        if (page === "publications") {
            const p = await loadJSON("data/publications.json");
            const publicationList = document.getElementById("publication-list");

            if (publicationList && Array.isArray(p)) {
                publicationList.innerHTML = p.map(x => `
                    <div class="publication">

                        <div class="publication-year">
                            ${escapeHTML(x.year)}
                        </div>

                        <div class="publication-cover-wrap">
                            ${
                                x.image
                                    ? `
                                        <img class="publication-cover"
                                             src="${escapeHTML(x.image)}"
                                             alt="Front page of ${escapeHTML(x.title)}"
                                             loading="lazy"
                                             onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');">
                                      `
                                    : `
                                        <div class="publication-cover publication-cover-empty"></div>
                                      `
                            }
                        </div>

                        <div class="publication-content">
                            <h3>${escapeHTML(x.title)}</h3>
                            <p class="authors">${escapeHTML(x.authors)}</p>
                            <p class="journal">${escapeHTML(x.journal)}</p>

                            ${
                                x.link
                                    ? `
                                        <a class="link"
                                           href="${escapeHTML(x.link)}"
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            DOI / Article →
                                        </a>
                                      `
                                    : ""
                            }
                        </div>

                    </div>
                `).join("");
            }
        }


        /* =================================================
           Academic Projects
           ================================================= */

        if (page === "projects") {
            const p = await loadJSON("data/projects.json");
            const projectList = document.getElementById("project-list");

            if (projectList && Array.isArray(p)) {
                projectList.innerHTML = p.map(x => `
                    <div class="project-card">

                        ${
                            x.image
                                ? `
                                    <div class="project-image-wrap">
                                        <img class="project-image"
                                             src="${escapeHTML(x.image)}"
                                             alt="${escapeHTML(x.title)}"
                                             loading="lazy"
                                             onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');">
                                    </div>
                                  `
                                : `
                                    <div class="project-top">
                                        ${escapeHTML(x.short)}
                                    </div>
                                  `
                        }

                        <div class="project-body">
                            <span class="meta">${escapeHTML(x.category)}</span>
                            <h3>${escapeHTML(x.title)}</h3>
                            <p>${escapeHTML(x.description)}</p>

                            ${
                                x.link && x.link !== "#"
                                    ? `
                                        <a class="link"
                                           href="${escapeHTML(x.link)}"
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            Project details →
                                        </a>
                                      `
                                    : ""
                            }
                        </div>

                    </div>
                `).join("");
            }
        }


        /* =================================================
           Profile
           ================================================= */

        if (page === "profile") {
            const p = await loadJSON("data/profile.json");

            setText("profile-name", p.name);
            setText("profile-about", p.about);


            /* Education */

            const educationList = document.getElementById("education-list");

            if (educationList && Array.isArray(p.education)) {
                educationList.innerHTML = p.education.map(x => `
                    <div class="card education-card">

                        <span class="meta education-year">
                            ${escapeHTML(x.period)}
                        </span>

                        <h3>${escapeHTML(x.degree)}</h3>

                        <p class="education-institution">
                            ${escapeHTML(x.institution)}
                        </p>

                        ${
                            x.major
                                ? `
                                    <p class="education-detail">
                                        <strong>Major:</strong>
                                        ${escapeHTML(x.major)}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            x.thesis
                                ? `
                                    <p class="education-detail">
                                        <strong>Thesis Title:</strong>
                                        <u>${escapeHTML(x.thesis)}</u>
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            x.pi
                                ? `
                                    <p class="education-detail">
                                        <strong>PI:</strong>
                                        ${escapeHTML(x.pi)}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            x.result
                                ? `
                                    <p class="education-result">
                                        ${escapeHTML(x.result)}
                                    </p>
                                  `
                                : ""
                        }

                        ${
                            x.courses
                                ? `
                                    <div class="education-detail education-courses">
                                        <strong>Courses:</strong>
                                        ${escapeHTML(x.courses).replace(/\s*\|\s*/g, " · ")}
                                    </div>
                                  `
                                : ""
                        }

                    </div>
                `).join("");
            }


            /* Professional Experience */

            const professionalList =
                document.getElementById("professional-experience-list");

            if (professionalList && Array.isArray(p.professional_experience)) {
                professionalList.innerHTML = p.professional_experience.map(x => `
                    <div class="profile-experience-item">
                        <div class="profile-experience-period">
                            ${escapeHTML(x.period)}
                        </div>
                        <div>
                            <h3>${escapeHTML(x.title)}</h3>
                            <p>${escapeHTML(x.organization)}</p>
                        </div>
                    </div>
                `).join("");
            }


            /* Conferences & Workshops */

            const conferenceList =
                document.getElementById("conference-list");

            if (conferenceList && Array.isArray(p.conferences_workshops)) {
                conferenceList.innerHTML = p.conferences_workshops.map(x => `
                    <div class="activity-item">
                        <span class="activity-dot"></span>
                        <p>${escapeHTML(x)}</p>
                    </div>
                `).join("");
            }


            /* Software Skills */

            const skillsList =
                document.getElementById("skills-list");

            if (skillsList && Array.isArray(p.software_skills)) {
                skillsList.innerHTML = p.software_skills.map(x => `
                    <div class="skill-card">
                        <span class="meta">${escapeHTML(x.category)}</span>
                        <p>${escapeHTML(x.items)}</p>
                    </div>
                `).join("");
            }


            /* Activities */

            const activitiesList =
                document.getElementById("activities-list");

            if (activitiesList && Array.isArray(p.activities)) {
                activitiesList.innerHTML = p.activities.map(x => `
                    <div class="activity-item">
                        <span class="activity-dot"></span>
                        <p>${escapeHTML(x)}</p>
                    </div>
                `).join("");
            }


            /* Achievements */

            const achievementsList =
                document.getElementById("achievements-list");

            if (achievementsList && Array.isArray(p.achievements)) {
                achievementsList.innerHTML = p.achievements.map(x => `
                    <div class="activity-item">
                        <span class="activity-dot"></span>
                        <p>${escapeHTML(x)}</p>
                    </div>
                `).join("");
            }


            /* Contact links */

            const contactLinks =
                document.getElementById("profile-contact-links");

            if (contactLinks && Array.isArray(p.socials)) {
                contactLinks.innerHTML = p.socials.map(x => `
                    <a href="${escapeHTML(x.url)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        ${escapeHTML(x.name)}
                    </a>
                `).join("");
            }
        }

    } catch (e) {
        console.error(`Error rendering ${page} page:`, e);
    }
}


/* =========================================================
   Page Initialization
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setText("year", new Date().getFullYear());

    if (document.body.dataset.page === "home") {
        renderHome();
    } else {
        renderPage();
    }

    const current =
        location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a").forEach(a => {
        if (a.getAttribute("href") === current) {
            a.classList.add("active");
        }
    });
});
