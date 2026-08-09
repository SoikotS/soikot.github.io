async function loadJSON(file) {
    const r = await fetch(file);

    if (!r.ok) {
        throw new Error(file);
    }

    return r.json();
}


function setText(id, value) {
    const el = document.getElementById(id);

    if (el) {
        el.textContent = value;
    }
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


        /* Profile */

        setText("hero-name", p.name);
        setText("hero-title", p.title);
        setText("hero-description", p.short_intro);


        const img =
            document.getElementById("profile-image");

        if (img) {
            img.loading = "eager";
            img.decoding = "async";
        }


        /* About */

        setText("about-text", p.about);


        /* Research Metrics */

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


        /* Social Links */

        const socials =
            document.getElementById("social-links");

        if (socials) {

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


        /* Research Interests */

        const interests =
            document.getElementById("interest-grid");

        if (interests) {

            interests.innerHTML = r.interests
                .map((x, i) => `
                    <div class="card">

                        <span class="meta">
                            0${i + 1}
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
                    ${r.featured.year}
                </div>


                <div class="featured-cover-wrap">

                    <img
                        class="featured-cover"
                        src="${r.featured.image}"
                        alt="Front page of ${r.featured.title}"
                        loading="lazy">

                </div>


                <div class="featured-content">

                    <h3>
                        ${r.featured.title}
                    </h3>

                    <p class="authors">
                        ${r.featured.authors}
                    </p>

                    <p class="journal">
                        ${r.featured.journal}
                    </p>

                    <a
                        class="link"
                        href="${r.featured.link}"
                        target="_blank"
                        rel="noopener noreferrer">
                        View publication →
                    </a>

                </div>
            `;
        }


        /* Recent Updates */

        const up =
            document.getElementById("updates");

        if (up) {

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

        console.error(e);

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


            if (researchList) {

                researchList.innerHTML =
                    r.experience
                        .map(x => `

                            <div class="item">

                                <div class="item-date">
                                    ${x.period}
                                </div>

                                <div>

                                    <h3>
                                        ${x.title}
                                    </h3>

                                    <h4>
                                        ${x.area}
                                    </h4>

                                    <p>
                                        ${x.description}
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

            const p =
                await loadJSON(
                    "data/publications.json"
                );


            const publicationList =
                document.getElementById(
                    "publication-list"
                );


            if (publicationList) {

                publicationList.innerHTML =
                    p
                        .map(x => `

                            <div class="publication">

                                <!-- Year -->

                                <div class="publication-year">
                                    ${x.year}
                                </div>


                                <!-- Paper Front Page -->

                                <div class="publication-cover-wrap">

                                    <img
                                        class="publication-cover"
                                        src="${x.image}"
                                        alt="Front page of ${x.title}"
                                        loading="lazy">

                                </div>


                                <!-- Publication Information -->

                                <div class="publication-content">

                                    <h3>
                                        ${x.title}
                                    </h3>

                                    <p class="authors">
                                        ${x.authors}
                                    </p>

                                    <p class="journal">
                                        ${x.journal}
                                    </p>

                                    <a
                                        class="link"
                                        href="${x.link}"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        DOI / Article →
                                    </a>

                                </div>

                            </div>

                        `)
                        .join("");
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


            if (projectList) {

                projectList.innerHTML =
                    p
                        .map(x => `

                            <div>

                                <div class="project-top">
                                    ${x.short}
                                </div>

                                <div class="project-body">

                                    <span class="meta">
                                        ${x.category}
                                    </span>

                                    <h3>
                                        ${x.title}
                                    </h3>

                                    <p>
                                        ${x.description}
                                    </p>

                                    <a
                                        class="link"
                                        href="${x.link}"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Project details →
                                    </a>

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


            setText(
                "profile-name",
                p.name
            );


            setText(
                "profile-about",
                p.about
            );


            const educationList =
                document.getElementById(
                    "education-list"
                );


            if (educationList) {

                educationList.innerHTML =
                    p.education
                        .map(x => `

                            <div class="card">

                                <span class="meta">
                                    ${x.period}
                                </span>

                                <h3>
                                    ${x.degree}
                                </h3>

                                <p>
                                    ${x.institution}
                                </p>

                                <strong>
                                    ${x.result}
                                </strong>

                            </div>

                        `)
                        .join("");
            }
        }


    } catch (e) {

        console.error(e);

    }
}


/* =========================================================
   Page Initialization
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Current Year */

        setText(
            "year",
            new Date().getFullYear()
        );


        /* Page Rendering */

        if (
            document.body.dataset.page === "home"
        ) {

            renderHome();

        } else {

            renderPage();

        }


        /* Active Navigation */

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