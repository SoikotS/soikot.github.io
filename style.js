* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    color: #171717;
    background: #ffffff;
    line-height: 1.7;
}

a {
    text-decoration: none;
    color: inherit;
}

.container {
    width: min(1120px, 90%);
    margin: auto;
}


/* Navigation */

.navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid #e8e8e8;
    backdrop-filter: blur(10px);
}

.nav-container {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
}

nav {
    display: flex;
    gap: 26px;
}

nav a {
    font-size: 14px;
    color: #555;
    transition: 0.2s;
}

nav a:hover {
    color: #000;
}


/* Hero */

.hero {
    min-height: 680px;
    display: flex;
    align-items: center;
    background: #fafafa;
}

.hero-content {
    display: grid;
    grid-template-columns: 1.4fr 0.6fr;
    gap: 80px;
    align-items: center;
}

.eyebrow,
.section-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #666;
}

.hero h1 {
    margin-top: 15px;
    font-size: clamp(48px, 7vw, 82px);
    line-height: 1;
    letter-spacing: -4px;
}

.hero h2 {
    max-width: 650px;
    margin-top: 25px;
    font-size: 27px;
    font-weight: 500;
    line-height: 1.3;
}

.hero-description {
    max-width: 650px;
    margin-top: 25px;
    color: #666;
    font-size: 17px;
}

.hero-buttons {
    display: flex;
    gap: 12px;
    margin-top: 35px;
}

.btn {
    padding: 12px 22px;
    border: 1px solid #111;
    font-size: 14px;
    transition: 0.2s;
}

.btn.primary {
    background: #111;
    color: white;
}

.btn.primary:hover {
    background: #333;
}

.btn.secondary:hover {
    background: #111;
    color: white;
}


/* Profile */

.hero-image {
    display: flex;
    justify-content: center;
}

.profile-placeholder {
    width: 270px;
    height: 270px;
    border-radius: 50%;
    background: #111;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 65px;
    font-weight: 700;
}


/* Sections */

.section {
    padding: 110px 0;
}

.light-section {
    background: #f7f7f7;
}

.section-heading {
    margin-bottom: 55px;
}

.section-heading h2 {
    margin-top: 8px;
    font-size: 42px;
    letter-spacing: -1.5px;
}


/* About */

.about-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 80px;
}

.about-grid p {
    margin-bottom: 20px;
    font-size: 17px;
    color: #555;
}

.info-card {
    border-top: 1px solid #222;
}

.info-item {
    padding: 18px 0;
    border-bottom: 1px solid #ddd;
}

.info-item span {
    display: block;
    font-size: 12px;
    color: #777;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.info-item strong {
    display: block;
    margin-top: 3px;
}


/* Research */

.research-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.research-card {
    position: relative;
    padding: 35px;
    min-height: 230px;
    background: white;
    border: 1px solid #e5e5e5;
}

.research-number {
    font-size: 13px;
    color: #999;
}

.research-card h3 {
    margin: 35px 0 10px;
    font-size: 23px;
}

.research-card p {
    color: #666;
}


/* Publications */

.publication {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 40px;
    padding: 35px 0;
    border-top: 1px solid #ddd;
}

.publication-year {
    font-size: 15px;
    color: #777;
}

.publication h3 {
    max-width: 800px;
    font-size: 21px;
    line-height: 1.4;
}

.authors {
    margin-top: 10px;
    color: #555;
}

.journal {
    margin-top: 5px;
    font-style: italic;
    color: #777;
}

.publication-link {
    display: inline-block;
    margin-top: 15px;
    font-size: 14px;
    font-weight: 700;
}


/* Projects */

.project-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.project-card {
    background: white;
    border: 1px solid #e3e3e3;
}

.project-image {
    height: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    color: white;
    font-size: 35px;
    font-weight: 700;
}

.project-content {
    padding: 28px;
}

.project-content > span {
    font-size: 11px;
    letter-spacing: 1.5px;
    color: #777;
}

.project-content h3 {
    margin: 12px 0;
    font-size: 21px;
}

.project-content p {
    color: #666;
}

.project-content a {
    display: inline-block;
    margin-top: 18px;
    font-size: 14px;
    font-weight: 700;
}


/* Timeline */

.timeline {
    border-left: 1px solid #ccc;
    padding-left: 35px;
}

.timeline-item {
    position: relative;
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 30px;
    padding-bottom: 55px;
}

.timeline-item::before {
    content: "";
    position: absolute;
    left: -41px;
    top: 7px;
    width: 11px;
    height: 11px;
    background: #111;
    border-radius: 50%;
}

.timeline-date {
    color: #777;
    font-size: 14px;
}

.timeline-content h3 {
    font-size: 22px;
}

.timeline-content h4 {
    margin-top: 4px;
    font-weight: 500;
}

.timeline-content p {
    margin-top: 12px;
    color: #666;
}


/* Education */

.education-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.education-card {
    padding: 35px;
    background: white;
    border: 1px solid #e3e3e3;
}

.education-card span {
    font-size: 13px;
    color: #777;
}

.education-card h3 {
    margin: 15px 0 10px;
    font-size: 23px;
}

.education-card p {
    color: #666;
}

.education-card strong {
    display: block;
    margin-top: 15px;
}


/* Contact */

.contact-section {
    padding: 130px 0;
    background: #111;
    color: white;
}

.contact-container {
    max-width: 800px;
}

.contact-section .section-label {
    color: #aaa;
}

.contact-section h2 {
    margin-top: 15px;
    font-size: 60px;
    letter-spacing: -2px;
}

.contact-section > .container > p:not(.section-label) {
    margin-top: 20px;
    max-width: 600px;
    color: #bbb;
}

.contact-links {
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    margin-top: 35px;
}

.contact-links a {
    padding-bottom: 3px;
    border-bottom: 1px solid #888;
}

.contact-links a:hover {
    border-color: white;
}


/* Footer */

footer {
    background: #111;
    border-top: 1px solid #333;
    color: #888;
}

.footer-content {
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
}


/* Responsive */

@media (max-width: 850px) {

    nav {
        display: none;
    }

    .hero-content {
        grid-template-columns: 1fr;
        gap: 50px;
        padding: 80px 0;
    }

    .hero {
        min-height: auto;
    }

    .hero-image {
        justify-content: flex-start;
    }

    .profile-placeholder {
        width: 190px;
        height: 190px;
        font-size: 45px;
    }

    .about-grid {
        grid-template-columns: 1fr;
        gap: 45px;
    }

    .research-grid,
    .education-grid {
        grid-template-columns: 1fr;
    }

    .project-grid {
        grid-template-columns: 1fr;
    }

    .publication {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .timeline-item {
        grid-template-columns: 1fr;
        gap: 5px;
    }

    .contact-section h2 {
        font-size: 45px;
    }

    .footer-content {
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        padding: 20px 0;
    }
}