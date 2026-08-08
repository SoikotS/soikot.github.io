
document.getElementById("year").textContent = new Date().getFullYear();

const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a").forEach(link => {
    const target = link.getAttribute("href");
    if (target === current || (current === "" && target === "index.html")) {
        link.classList.add("active");
    }
});
