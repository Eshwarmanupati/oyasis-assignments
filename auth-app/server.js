const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

const users = {};


const style = `
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      width: 350px;
      text-align: center;
    }
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
    input {
      width: 90%;
      padding: 10px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 6px;
      outline: none;
    }
    input:focus {
      border-color: #007bff;
    }
    button {
      width: 100%;
      padding: 10px;
      margin-top: 12px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background: #0056b3;
    }
    a {
      display: block;
      margin-top: 12px;
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
`;


const registerPage = `
  ${style}
  <div class="container">
    <h2>Register</h2>
    <form method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Register</button>
    </form>
    <a href="/login">Already have an account? Login</a>
  </div>
`;

const loginPage = `
  ${style}
  <div class="container">
    <h2>Login</h2>
    <form method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
    <a href="/register">Need an account? Register</a>
  </div>
`;

const securePage = (username) => `
  ${style}
  <div class="container">
    <h2>Welcome, ${username} 🎉</h2>
    <p>This is a secured page.</p>
    <a href="/logout">Logout</a>
  </div>
`;


app.get("/register", (req, res) => res.send(registerPage));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.send(" Username already exists!");
  }

  users[username] = await bcrypt.hash(password, 10);
  res.redirect("/login");
});

app.get("/login", (req, res) => res.send(loginPage));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!users[username] || !(await bcrypt.compare(password, users[username]))) {
    return res.send(" Invalid username or password!");
  }

  req.session.username = username;
  res.redirect("/secure");
});

app.get("/secure", (req, res) => {
  if (!req.session.username) return res.redirect("/login");
  res.send(securePage(req.session.username));
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
);
