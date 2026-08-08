
async function loadJSON(file){const r=await fetch(file);if(!r.ok)throw new Error(file);return r.json()}
function setText(id,value){const el=document.getElementById(id);if(el)el.textContent=value}
async function renderHome(){
 try{
  const [p,r,u]=await Promise.all([loadJSON("data/profile.json"),loadJSON("data/research.json"),loadJSON("data/updates.json")]);
  setText("hero-name",p.name);setText("hero-title",p.title);setText("hero-description",p.short_intro);
  const img=document.getElementById("profile-image"); if(img){ img.loading="eager"; img.decoding="async"; const preload=new Image(); preload.onload=()=>{img.src=p.photo;img.classList.add("loaded")}; preload.onerror=()=>img.classList.add("loaded"); preload.src=p.photo; }
  setText("about-text",p.about);setText("stat-publications",p.scholar.publications);setText("stat-citations",p.scholar.citations);setText("stat-hindex",p.scholar.h_index);
  const socials=document.getElementById("social-links"); if(socials) socials.innerHTML=p.socials.map(x=>`<a class="social-btn" href="${x.url}" target="_blank" rel="noopener">${x.name}</a>`).join("");
  const interests=document.getElementById("interest-grid");interests.innerHTML=r.interests.map((x,i)=>`<div class="card"><span class="meta">0${i+1}</span><h3>${x.title}</h3><p>${x.description}</p></div>`).join("");
  const fp=document.getElementById("featured-publication");fp.innerHTML=`<div>${r.featured.year}</div><div><h3>${r.featured.title}</h3><p class="authors">${r.featured.authors}</p><p class="journal">${r.featured.journal}</p><a class="link" href="${r.featured.link}" target="_blank">View publication →</a></div>`;
  const up=document.getElementById("updates");up.innerHTML=u.map(x=>`<div class="update"><div class="update-date">${x.date}</div><div><h3>${x.title}</h3><p>${x.description}</p></div></div>`).join("");
 }catch(e){console.error(e)}
}
async function renderPage(){
 const page=document.body.dataset.page;
 try{
  if(page==="research"){const r=await loadJSON("data/research.json");document.getElementById("research-list").innerHTML=r.experience.map(x=>`<div class="item"><div class="item-date">${x.period}</div><div><h3>${x.title}</h3><h4>${x.area}</h4><p>${x.description}</p></div></div>`).join("")}
  if(page==="publications"){const p=await loadJSON("data/publications.json");document.getElementById("publication-list").innerHTML=p.map(x=>`<div class="publication"><div class="publication-year">${x.year}</div><div><h3>${x.title}</h3><p class="authors">${x.authors}</p><p class="journal">${x.journal}</p><a class="link" href="${x.link}" target="_blank">DOI / Article →</a></div></div>`).join("")}
  if(page==="projects"){const p=await loadJSON("data/projects.json");document.getElementById("project-list").innerHTML=p.map(x=>`<div><div class="project-top">${x.short}</div><div class="project-body"><span class="meta">${x.category}</span><h3>${x.title}</h3><p>${x.description}</p><a class="link" href="${x.link}" target="_blank">Project details →</a></div></div>`).join("")}
  if(page==="profile"){const p=await loadJSON("data/profile.json");setText("profile-name",p.name);setText("profile-about",p.about);document.getElementById("education-list").innerHTML=p.education.map(x=>`<div class="card"><span class="meta">${x.period}</span><h3>${x.degree}</h3><p>${x.institution}</p><strong>${x.result}</strong></div>`).join("")}
 }catch(e){console.error(e)}
}
document.addEventListener("DOMContentLoaded",()=>{setText("year",new Date().getFullYear());if(document.body.dataset.page==="home")renderHome();else renderPage();const current=location.pathname.split("/").pop()||"index.html";document.querySelectorAll("nav a").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active")})});
