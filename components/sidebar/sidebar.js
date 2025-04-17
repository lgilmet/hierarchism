class SideBar extends HTMLElement {
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
    this.addEventListeners();
  }

  openNav() {
    console.log("openNav");
    const background = this.shadowRoot.querySelector(".sidebar-container");
    const sidebar = this.shadowRoot.getElementById("mySidebar");
    if (sidebar) {
      sidebar.style.right = "0";
    }
    if (background) {
      background.classList.remove("hidden"); // Remove the hidden class to show the backdrop
      setTimeout(() => {
        background.classList.add("visible"); // Add the visible class to fade in
      }, 10); // Add a small delay to allow the transition to start
    }
  }

  closeNav() {
    console.log("closeNav");
    const sidebar = this.shadowRoot.getElementById("mySidebar");
    const background = this.shadowRoot.querySelector(".sidebar-container");

    console.log(background);
    if (sidebar) {
      sidebar.style.right = "-100%";
    }
    if (background) {
      background.classList.remove("visible"); // Remove the visible class to fade out
      // Wait for the transition to complete before removing the backdrop
      setTimeout(() => {
        background.classList.add("hidden"); // Add the hidden class to hide the backdrop
      }, 300); // Match the transition duration (0.3s)
    }
  }

  addEventListeners() {
    // Attach event listeners to buttons
    const openButton = this.shadowRoot.querySelector(".openbtn");
    const closeButton = this.shadowRoot.querySelector(".closebtn");
    const container = this.shadowRoot.querySelector(".sidebar-container");
    const links = this.shadowRoot.querySelectorAll(
      ".sidebar-content .closebtn"
    );

    if (openButton) {
      openButton.addEventListener("click", () => this.openNav());
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => this.closeNav());
    }

    if (container) {
      container.addEventListener("click", (event) => {
        if (event.target === container) {
          this.closeNav();
        }
      });
    }
    if (links) {
      links?.forEach((link) => {
        link.addEventListener("click", () => this.closeNav());
      });
    }
  }

  async render() {
    const response = await fetch("components/sidebar/sidebar.css");
    const style = await response.text();
    const sidebarResponse = await fetch("components/sidebar/sidebar.json");
    this._menuData = await sidebarResponse.json();
    const menuHTML = `
          <div class="sidebar-container hidden">
          </div>
              <nav class="sidebar" id="mySidebar">
                <div class="sidebar-header">
                    <span></span>
                    <button class="closebtn" >
                        <div class="x-icon">
                        </div>
                    </button>
                </div>
                <div class="sidebar-content">
                ${this._menuData
                  .map((item) => {
                    if (item.dropdown) {
                      return `

                        <details>
                        <summary>${item.text}</summary>
                        <div class="dropdown-content">
                        ${item.dropdown
                          .map(
                            (subItem) =>
                              `<a class="closebtn" href="${subItem.href}">${subItem.text}</a>`
                          )
                          .join("")}
                            </div>
                        </details>
                        `;
                    } else {
                      return `<a class="closebtn" href="${item.href}">${item.text}</a>`;
                    }
                  })
                  .join("")}
                </div>
              </nav>
        `;

    // // Combine the fetched CSS and dynamically generated HTML
    const combinedHTML = `
          <style>${style}</style>
              <button class="openbtn">
                <div class="hamburger">
                </div>
              </button>
          ${menuHTML}
        `;

    // // Inject the combined content into the shadow DOM
    this.shadowRoot.innerHTML = combinedHTML;
    // this.shadowRoot.innerHTML = "<div>hi</div>";
  }
}

customElements.define("side-bar", SideBar);
