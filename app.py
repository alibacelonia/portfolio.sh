from flask import Flask, render_template, jsonify

app = Flask(__name__)

portfolio = {
    "name": "Ali Bacelonia",
    "title": "Full-Stack Developer",
    "summary": "6 years building web apps, Django & Python fan, DevOps-curious.",
    "skills": [
        "Python", "Django", "Docker", "Postgres", "Redis", "HTMX", "CI/CD"
    ],
    "projects": [
        {
            "name": "Buzzerboy SaaS",
            "description": "Multi-tenant SaaS platform for HR workflows with modular apps.",
            "tech": ["Django", "Postgres", "Docker", "HTMX"],
            "url": "https://github.com/ali/buzzerboy-saas"
        },
        {
            "name": "Resume AI",
            "description": "AI-powered resume optimizer with prompt-tuning features.",
            "tech": ["FastAPI", "OpenAI", "LangChain"]
        }
    ],
    "contact": {
        "email": "ali@example.com",
        "location": "Manila, Philippines"
    }
}

@app.route("/")
def home():
    return render_template("index.html", portfolio=portfolio)

@app.route("/api/portfolio")
def get_portfolio():
    return jsonify(portfolio)

if __name__ == "__main__":
    app.run(debug=True)
