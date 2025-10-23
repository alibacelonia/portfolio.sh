class ConsolePortfolio {
  constructor(portfolio) {
    this.portfolio = portfolio;
    this.output = document.getElementById("output");
    this.input = document.getElementById("command");
    this.terminal = document.getElementById("terminal");

    this.init();
  }

  async init() {
    this.bindEvents();
    await this.type("System initialized successfully ✅");
    await this.type("Welcome to Ali's console portfolio! Type 'help' to get started.\n");
    this.focusInput();
  }

  bindEvents() {
    this.input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        const cmd = this.input.value.trim();
        this.input.value = "";
        await this.type(`$ ${cmd}`);
        await this.handleCommand(cmd);
      }
    });

    this.terminal.addEventListener("click", () => this.focusInput());
  }

  focusInput() {
    this.input.focus();
  }

  // 👇 Smooth auto-scroll helper
  scrollToBottom() {
    this.terminal.scrollTop = this.terminal.scrollHeight;
  }

  // 👇 Typewriter effect + auto-scroll
  async type(text = "", delay = 0.05) {
    for (let char of text) {
      this.output.innerHTML += char;
      this.scrollToBottom();
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    this.output.innerHTML += "\n";
    this.scrollToBottom();
  }

  async clear() {
    this.output.innerHTML = "";
  }

  async clearCommand() {
    this.input.value = "";
  }

  async help() {
    await this.type("Available commands:");
    await this.type("  about        - About me");
    await this.type("  summary      - Professional summary");
    await this.type("  skills       - List technical skills");
    await this.type("  devops       - Show DevOps & cloud skills");
    await this.type("  experience   - Professional experience");
    await this.type("  education    - Education background");
    await this.type("  contact      - Contact information");
    await this.type("  clear        - Clear the terminal");
    await this.type("  help         - Show this help message");
  }

  async showSkills(category) {
    const skills = this.portfolio.skills[category];
    if (skills) {
      await this.type(`\n${category}:`);
      await this.type("  " + skills.join(", "));
    }
  }

  async handleCommand(cmd) {
    const c = cmd.toLowerCase();
    const p = this.portfolio;

    switch (c) {
      case "about":
        await this.type(`${p.name} — ${p.title}`);
        break;

      case "summary":
        await this.type(p.summary);
        break;

      case "skills":
        for (const cat of Object.keys(p.skills)) await this.showSkills(cat);
        break;

      case "devops":
        await this.showSkills("Cloud & DevOps");
        break;

      case "experience":
        for (const job of p.experience) {
          await this.type(`\n${job.role} — ${job.company} (${job.period})`);
          await this.type(`Location: ${job.location}`);
          for (const a of job.achievements) await this.type("  - " + a);
        }
        break;

      case "education":
        for (const ed of p.education) {
          await this.type(`\n${ed.degree}`);
          await this.type(`${ed.school} — ${ed.location}`);
        }
        break;

      case "contact":
        for (const [k, v] of Object.entries(p.contact)) await this.type(`${k}: ${v}`);
        break;

      case "clear":
        await this.clear();
        break;

      case "help":
        await this.help();
        break;

      case "":
        break;

      default:
        await this.type(`Unknown command: ${cmd}`);
        await this.type(`Type "help" to see available commands.`);
    }
  }

  // ---------------------------
  // Static methods for loading
  // ---------------------------
  static async load() {
    const output = document.getElementById("output");
    output.innerHTML = "Initializing console system...\n";
    await ConsolePortfolio.loadingAnimation(output, "Fetching portfolio");

    try {
      const response = await fetch("/static/portfolio.json");
      if (!response.ok) throw new Error("Failed to load portfolio.json");
      const data = await response.json();

      output.innerHTML += "Portfolio loaded successfully ✅\n\n";
      new ConsolePortfolio(data);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      output.innerHTML +=
        "\n⚠️ Failed to load portfolio data. Please check your connection or console logs.\n";
    }
  }

  static async loadingAnimation(element, message = "Loading") {
    element.innerHTML += message;
    for (let i = 0; i < 3; i++) {
      element.innerHTML += ".";
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    element.innerHTML += "\n";
  }
}

// Initialize once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  ConsolePortfolio.load();
});
