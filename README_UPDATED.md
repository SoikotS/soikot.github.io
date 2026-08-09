# Updated Academic Portfolio

This version includes:

- Compact education-card spacing
- Full Profile sections:
  - Education
  - Professional Experiences
  - Conferences, Technical Talks & Workshops
  - Software Skills
  - Activities
  - Achievements
- Research experience images
- Publication front-page images
- Academic project images
- JSON-driven content
- Existing Home / Research / Publications / Projects / Profile structure

## Images to add

Put your images in these locations:

assets/
├── profile.jpeg
├── papers/
│   ├── j1.jpg
│   └── j2.jpg
├── research/
│   ├── photonics.jpg
│   └── integrated-photonics.jpg
└── projects/
    ├── project1.jpg
    ├── project2.jpg
    └── project3.jpg

The filenames can be changed in the corresponding JSON files.

## JSON editing

- data/profile.json → profile, education, experiences, skills, activities, achievements
- data/research.json → research interests, featured publication, research experience
- data/publications.json → publications and paper cover images
- data/projects.json → academic projects and project images
- data/updates.json → Home-page updates

## Important

The project/research image files are referenced but are not included because actual image files were not uploaded with the website files. Add your own images using the paths above.

For local preview, use a local server because the website uses fetch() to load JSON.
