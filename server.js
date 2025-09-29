const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  if (!req.session.count) req.session.count = 0;

  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTMX USER STATE</title>
    <script src="https://unpkg.com/htmx.org@1.9.2"></script>
  </head>
  <body>
    <main>
      <header>
        <h1>Per Session State with HTMX and Express Session</h1>
      </header>
      <section id="counter-feature">
        <h2>Counter</h2>
        <div id="counter">${req.session.count}</div>
         <button hx-post="/decrement" hx-target="#counter" hx-swap="outerHTML">
          -
        </button>
        <button hx-post="/increment" hx-target="#counter" hx-swap="outerHTML">
          +
        </button>
       
      </section>
    </main>
  </body>
</html>`);
});

app.post("/increment", (req, res) => {
  req.session.count = (req.session.count || 0) + 1;
  res.send(`<div id="counter">${req.session.count}</div>`);
});

app.post("/decrement", (req, res) => {
  req.session.count = (req.session.count || 0) - 1;
  res.send(`<div id="counter">${req.session.count}</div>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
