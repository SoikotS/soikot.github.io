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


        /* Profile information */

        setText("hero-name", p.name);
        setText("hero-title", p.title);
        setText("hero-description", p.short_intro);


        /* Profile image */

        const img =
            document.getElementById("profile-image");

        if (img) {
            img.loading = "eager";
            img.decoding = "async";

            if (p.photo) {
                img.src = p.photo;
            }
        }


        /* About */

        setText("about-text", p.about);


        /* Research metrics */

        if (p.scholar) {

            setText(
                "stat-publications",
                p.scholar.publications
            );

            setText(
                "stat-citations",
                p.scholar.citations
            );

            setText(
                "stat-hindex",
                p.scholar.h_index
            );
        }


        /* Social links */

        const socials =
            document.getElementById("social-links");

        if (socials && Array.isArray(p.socials)) {

            socials.innerHTML = p.socials
                .map(x => `
                    <a
                        class="social-btn"
                        href="${x.url}"
                        target="_blank"
                        rel="noopener noreferrer">
                        ${x.name}
                    </a>
                `)
                .join("");
        }


        /* Research interests */

        const interests =
            document.getElementById("interest-grid");

        if (interests && Array.isArray(r.interests)) {

            interests.innerHTML = r.interests
                .map((x, i) => `
                    <div class="card">

                        <span class="meta">
                            ${String(i + 1).padStart(2, "0")}
                        </span>

                        <h3>
                            ${x.title}
                        </h3>

                        <p>
                            ${x.description}
                        </p>

                    </div>
                `)
                .join("");
        }


        /* =================================================
           Featured Publication
           Year → Image → Information
           ================================================= */

        const fp =
            document.getElementById(
                "featured-publication"
            );

        if (fp && r.featured) {

            fp.innerHTML = `

                <div class="featured-year">
                    ${r.featured.year ?? ""}
                </div>

                <div class="featured-cover-wrap">

                    ${
                        r.featured.image
                            ? `
                                <img
                                    class="featured-cover"
                                    src="${r.featured.image}"
                                    alt="Front page of ${r.featured.title ?? "publication"}"
                                    loading="lazy">
                              `
                            : ""
                    }

                </div>

                <div class="featured-content">

                    <h3>
                        ${r.featured.title ?? ""}
                    </h3>

                    <p class="authors">
                        ${r.featured.authors ?? ""}
                    </p>

                    <p class="journal">
                        ${r.featured.journal ?? ""}
                    </p>

                    ${
                        r.featured.link
                            ? `
                                <a
                                    class="link"
                                    href="${r.featured.link}"
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


        /* Recent updates */

        const up =
            document.getElementById("updates");

        if (up && Array.isArray(u)) {

            up.innerHTML = u
                .map(x => `
                    <div class="update">

                        <div class="update-date">
                            ${x.date}
                        </div>

                        <div>

                            <h3>
                                ${x.title}
                            </h3>

                            <p>
                                ${x.description}
                            </p>

                        </div>

                    </div>
                `)
                .join("");
        }


    } catch (e) {

        console.error("Home page error:", e);

    }
}


/* =========================================================
   Other Pages
   ========================================================= */

async function renderPage() {

    const page =
        document.body.dataset.page;


    try {

        /* =================================================
           Research Experience
           ================================================= */

        if (page === "research") {

            const r =
                await loadJSON(
                    "data/research.json"
                );

            const researchList =
                document.getElementById(
                    "research-list"
                );

            if (
                researchList &&
                Array.isArray(r.experience)
            ) {

                researchList.innerHTML =
                    r.experience
                        .map(x => `

                            <div class="item">

                                <div class="item-date">
                                    ${x.period ?? ""}
                                </div>

                                <div>

                                    <h3>
                                        ${x.title ?? ""}
                                    </h3>

                                    <h4>
                                        ${x.area ?? ""}
                                    </h4>

                                    <p>
                                        ${x.description ?? ""}
                                    </p>

                                </div>

                            </div>

                        `)
                        .join("");
            }
        }


        /* =================================================
           Publications
           Year → Image → Information
           ================================================= */

        if (page === "publications") {

            const p = await loadJSON("data/publications.json");
            const publicationList =
                document.getElementById("publication-list");

            if (publicationList && p) {

                const categories = [
                    {
                        key: "journal_articles",
                        title: "Journal Articles",
                        label: "PUBLISHED JOURNAL ARTICLES"
                    },
                    {
                        key: "conference_proceedings",
                        title: "Conference Proceedings",
                        label: "CONFERENCE PROCEEDINGS"
                    },
                    {
                        key: "under_preparation_or_review",
                        title: "Journal Articles Under Preparation / Review",
                        label: "UNDER PREPARATION / UNDER REVIEW"
                    }
                ];

                const renderPublication = x => `
                    <div class="publication">

                        <div class="publication-year">
                            ${escapeHTML(x.year)}
                        </div>

                        <div class="publication-cover-wrap">
                            ${
                                x.image
                                    ? `
                                        <img
                                            class="publication-cover"
                                            src="${escapeHTML(x.image)}"
                                            alt="Front page of ${escapeHTML(x.title)}"
                                            loading="lazy">
                                      `
                                    : `
                                        <div class="publication-cover publication-cover-empty">
                                            <span>NO<br>IMAGE</span>
                                        </div>
                                      `
                            }
                        </div>

                        <div class="publication-content">

                            <h3>${escapeHTML(x.title)}</h3>

                            <p class="authors">
                                ${escapeHTML(x.authors)}
                            </p>

                            <p class="journal">
                                ${escapeHTML(x.journal)}
                            </p>

                            ${
                                x.status
                                    ? `
                                        <span class="publication-status">
                                            ${escapeHTML(x.status)}
                                        </span>
                                      `
                                    : ""
                            }

                            ${
                                x.link && x.link !== "#"
                                    ? `
                                        <a
                                            class="link"
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
                `;

                publicationList.innerHTML = categories.map(category => {

                    const entries =
                        Array.isArray(p[category.key])
                            ? p[category.key]
                            : [];

                    return `
                        <section class="publication-category">

                            <div class="publication-category-heading">
                                <p class="section-label">
                                    ${category.label}
                                </p>
                                <h2>${category.title}</h2>
                            </div>

                            ${
                                entries.length
                                    ? entries.map(renderPublication).join("")
                                    : `
                                        <div class="publication-empty">
                                            No publications listed in this category.
                                        </div>
                                      `
                            }

                        </section>
                    `;

                }).join("");
            }
        }


        /* =================================================
           Academic Projects
           ================================================= */

        if (page === "projects") {

            const p =
                await loadJSON(
                    "data/projects.json"
                );

            const projectList =
                document.getElementById(
                    "project-list"
                );

            if (
                projectList &&
                Array.isArray(p)
            ) {

                projectList.innerHTML =
                    p
                        .map(x => `

                            <div>

                                <div class="project-top">
                                    ${x.short ?? ""}
                                </div>

                                <div class="project-body">

                                    <span class="meta">
                                        ${x.category ?? ""}
                                    </span>

                                    <h3>
                                        ${x.title ?? ""}
                                    </h3>

                                    <p>
                                        ${x.description ?? ""}
                                    </p>

                                    ${
                                        x.link
                                            ? `
                                                <a
                                                    class="link"
                                                    href="${x.link}"
                                                    target="_blank"
                                                    rel="noopener noreferrer">
                                                    Project details →
                                                </a>
                                              `
                                            : ""
                                    }

                                </div>

                            </div>

                        `)
                        .join("");
            }
        }


        /* =================================================
           Profile
           ================================================= */

        if (page === "profile") {

            const p =
                await loadJSON(
                    "data/profile.json"
                );


            /* Profile name */

            setText(
                "profile-name",
                p.name
            );


            /* Profile description */

            setText(
                "profile-about",
                p.about
            );


            /* Education */

            const educationList =
                document.getElementById(
                    "education-list"
                );


            if (
                educationList &&
                Array.isArray(p.education)
            ) {

                educationList.innerHTML =
    p.education
        .map(x => `
            <div class="card education-card">

                <span class="meta">
                    ${x.period ?? ""}
                </span>

                <h3>
                    ${x.degree ?? ""}
                </h3>

                <p class="education-institution">
                    ${x.institution ?? ""}
                </p>

                ${x.major ? `
                    <p class="education-detail">
                        <strong>Major:</strong>
                        ${x.major}
                    </p>
                ` : ""}

                ${x.thesis ? `
                    <p class="education-detail">
                        <strong>Thesis Title:</strong>
                        <u>${x.thesis}</u>
                    </p>
                ` : ""}

                ${x.pi ? `
                    <p class="education-detail">
                        <strong>PI:</strong>
                        <strong>${x.pi}</strong>
                    </p>
                ` : ""}

                ${x.result ? `
                    <p class="education-detail">
                        ${x.result}
                    </p>
                ` : ""}

                ${x.courses ? `
                    <p class="education-detail">
                        <strong>Courses:</strong>
                        ${x.courses}
                    </p>
                ` : ""}

            </div>
        `)
        .join("");

            } else {

                console.error(
                    "Education data not found or is not an array.",
                    p.education
                );

            }

        }

    } catch (e) {

        console.error(
            `Error rendering ${page} page:`,
            e
        );

    }
}


/* =========================================================
   Page Initialization
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Current year */

        setText(
            "year",
            new Date().getFullYear()
        );


        /* Render page */

        if (
            document.body.dataset.page === "home"
        ) {

            renderHome();

        } else {

            renderPage();

        }


        /* Active navigation */

        const current =
            location.pathname.split("/").pop()
            || "index.html";


        document
            .querySelectorAll("nav a")
            .forEach(a => {

                if (
                    a.getAttribute("href")
                    === current
                ) {

                    a.classList.add("active");

                }

            });

    }
);