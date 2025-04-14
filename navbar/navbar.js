class TopNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // set menu(data) {
  //   this._menuData = data || [];
  //   this.render();
  // }

  async connectedCallback() {
    await this.render();
  }

  async render() {
    // Fetch the CSS and HTML content from navbar.html
    const response = await fetch("navbar/navbar.html");
    const navbarHTML = await response.text();
    this._menuData = [
      { text: "Hierarchism", href: "#hierarchism" },
      {
        text: "Do you believe?",
        href: "#chat/oppression-s-core-beliefs-2025-04-14",
      },
    ];
    // Generate the menu dynamically
    const menuHTML = `
        <nav class="navbar">
          ${this._menuData
            .map((item) => {
              if (item.dropdown) {
                return `
                  <div class="dropdown">
                    <button class="dropbtn">${item.text}</button>
                    <div class="dropdown-content">
                    <div class="content-border">
                      ${item.dropdown
                        .map(
                          (subItem) =>
                            `<a href="${subItem.href}">${subItem.text}</a>`
                        )
                        .join("")}
                        </div>
                    </div>
                  </div>
                `;
              } else {
                return `<a href="${item.href}">${item.text}</a>`;
              }
            })
            .join("")}
        </nav>
      `;

    // Combine the fetched CSS and dynamically generated HTML
    const combinedHTML = `
        ${navbarHTML}
        ${menuHTML}
      `;

    // Inject the combined content into the shadow DOM
    this.shadowRoot.innerHTML = combinedHTML;
  }
}

customElements.define("top-navbar", TopNavbar);
