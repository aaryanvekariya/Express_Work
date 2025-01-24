import { create } from "express-handlebars";
import express from "express";
const app = express();

  // Set up Handlebars as the view engine
const hbs = create({
  extname: ".hbs", // Use .hbs extension for views
  defaultLayout: "main", // Default layout
  layoutsDir: "views/layouts", // Directory for layout files
  partialsDir: "views/partials", // Directory for partial files (optional)
  helpers: {
    repeat: (n) => {
      return "⭐".repeat(n); // Repeat the star symbol based on rating
    },
  },
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Doctors Page
app.get("/doctors", (req, res) => {
  try {
    res.render("doctors", {
      title: "Our Expert Doctors",
      description:
        "Our clinic provides top-notch medical expertise in dermatology and skincare.",
    });
  } catch (error) {
    console.error("Error rendering doctors page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Services Page
app.get("/services", (req, res) => {
  try {
    const category = req.query.category || "General";
    res.render("services", {
      title: `${category} Services`,
      category,
    });
  } catch (error) {
    console.error("Error rendering services page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Appointments Page
app.post("/book-appointment", (req, res) => {
  try {
    const { name, email, service, preferredDate, preferredTime } = req.body;
    res.render("book-appointment", {
      title: "Appointment Confirmation",
      appointment: { name, email, service, preferredDate, preferredTime },
    });
  } catch (error) {
    console.error("Error processing appointment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Offerings Page
app.get("/offerings", (req, res) => {
  try {
    const offerings = [
      {
        name: "Anti-Aging Treatment",
        price: 5000,
        duration: "60 mins",
        description: "Advanced treatment to reduce fine lines and wrinkles",
        available: true,
      },
      {
        name: "Acne Treatment",
        price: 3000,
        duration: "45 mins",
        description: "Specialized treatment for acne-prone skin",
        available: true,
      },
      {
        name: "Chemical Peel",
        price: 4000,
        duration: "30 mins",
        description: "Skin resurfacing treatment for even tone",
        available: false,
      },
    ];
    res.render("offerings", {
      title: "Our Offerings",
      offerings,
    });
  } catch (error) {
    console.error("Error rendering offerings page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Testimonials Page
app.get("/testimonials", (req, res) => {
  try {
    const testimonials = [
      {
        name: "John Doe",
        rating: 5,
        comment: "Excellent service!",
        date: "2024-01-20",
      },
      {
        name: "Jane Smith",
        rating: 4,
        comment: "Very professional staff",
        date: "2024-01-18",
      },
    ];
    res.render("testimonials", {
      title: "Testimonials",
      testimonials,
    });
  } catch (error) {
    console.error("Error rendering testimonials page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Home Page (optional redirect)
app.get("/", (req, res) => {
  try {
    res.redirect("/doctors");
  } catch (error) {
    console.error("Error redirecting to doctors page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 404 Page
app.use((req, res) => {
  try {
    res.status(404).render("404", {
      title: "Page Not Found",
      message: "The page you are looking for does not exist.",
    });
  } catch (error) {
    console.error("Error rendering 404 page:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
