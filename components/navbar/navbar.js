class TopNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set menu(data) {
    this._menuData = data || [];
    this.render();
  }

  async connectedCallback() {
    await this.render();
  }

  async render() {
    const response = await fetch("components/navbar/navbar.css");
    const style = await response.text();
    this._menuData = [{ text: "Hierarchism", href: "" }];
    // Generate the menu dynamically
    const menuHTML = `
    <div class="navbar-section">
      <div class="navbar-container">
          <div class="navbar-spacer">
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
                  
                    <side-bar></side-bar>
          </div>
      </div>
    </div>
      `;

    // Combine the fetched CSS and dynamically generated HTML
    const combinedHTML = `
        <style>${style}</style>
        ${menuHTML}
      `;

    // Inject the combined content into the shadow DOM
    this.shadowRoot.innerHTML = combinedHTML;
  }
}

customElements.define("top-navbar", TopNavbar);
