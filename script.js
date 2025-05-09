async function loadContent() {
  const hash = window.location.hash.substring(1) || "hierarchism";

  let path;
  if (hash === "readme") {
    path = "readme.md";
  } else {
    path = `content/${hash}.md`;
  }

  try {
    const response = await fetch(path);
    const md = await response.text();
    const content = document.getElementById("content");
    content.innerHTML = marked.parse(md);
    const title = content.querySelector("title");
    document.title = title ? title.innerText : "Hierarchism";
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  } catch (error) {
    document.getElementById("content").innerHTML = `
            <h1>404</h1>
            <p>Content not found: ${hash}</p>
        `;
  }
}

window.addEventListener("hashchange", loadContent);
window.addEventListener("load", loadContent);
