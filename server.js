import express from "express";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ IMPORTANT: point to classroom/views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "classroom", "views"));

// session config
const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

// locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.name = req.session.name;
  next();
});

// routes
app.get("/register", (req, res) => {
  const { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("success", "User registered successfully");
  res.redirect("/hellow");
});

app.get("/hellow", (req, res) => {
  // page.ejs is directly inside views
  res.locals.messages = req.flash("success")
  res.render("page");
});

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});





// // Middleware to parse cookies
// app.use(cookieParser());

// // Route to set a cookie
// app.get("/getcookies", (req, res) => {
//   // Set a cookie named "greet" with value "hello"
//   res.cookie("greet", "hello", {
//     httpOnly: true,       // cookie cannot be accessed by client-side JS
//     maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
//   });
//   res.send("Sent you some cookies 🍪");
// });

// // Route to read cookies
// app.get("/showcookies", (req, res) => {
//   console.log(req.cookies); // prints all cookies
//   res.send(req.cookies);    // sends cookies to browser
// });

// // Route to clear a cookie
// app.get("/clearcookie", (req, res) => {
//   res.clearCookie("greet");
//   res.send("Cookie cleared 🧹");
// });



// app.use(session({ secret: "mysupersecretstring",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.get("/test", (req, res) => {
//   if (req.session.count) {
//     req.session.count += 1;
//   } else {
//     req.session.count = 1;
//   }

//   res.send(`you sent a request ${req.session.count} times`);
// });

// app.listen(3000, () => {
//   console.log("🚀 Server running on port 3000");
// });
