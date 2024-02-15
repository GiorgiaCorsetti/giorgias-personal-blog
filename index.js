// Import necessary libraries
import express from 'express';
import bodyParser from 'body-parser';

// Initialize express app
const app = express();
const port = 3000;



// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static("public"));

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

const posts = []; // This will hold your posts

const todos = [
    
    "Learn Node.js",
    "Read about EJS",
    "Build a to-do list app",
    "Create a post creation feature",
    "Create edit and delete feature",
    "Style the blog according to my preferences",
    "Make the website responsive for all devices",
    "Complete blog project",
];

app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

app.get("/compose", (req, res) => {
    res.render("compose");
  });

  app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

  app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    if (post) {
        res.render("edit", { post: post, postId: postId });
    } else {
        res.redirect("/");
    }
});

app.get("/todos", (req, res) => {
    res.render("todos", { todos: todos });
});

  app.post("/compose", (req, res) => {
    const { title, content } = req.body;
    const newPost = { title: title, content: content };
    posts.push(newPost);
    res.redirect("/");
  });

  app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10); // Parse `id` as integer

    app.post("/delete/:id", (req, res) => {
        const postId = parseInt(req.params.id, 10); // Convert the index to an integer
    
        // Check if the postId is within bounds
        if (!isNaN(postId) && postId >= 0 && postId < posts.length) {
            posts.splice(postId, 1); // Remove the post from the array
            res.redirect("/"); // Redirect back to the home page
        } else {
            res.status(404).send("Post not found.");
        }
    });

    if (!isNaN(postId) && postId >= 0 && postId < posts.length) {
        const updatedPost = {
            title: req.body.title,
            content: req.body.content
        };

        posts[postId] = updatedPost; // Update the post
        res.redirect("/");
    } else {
        // Handle invalid postId: redirect, show an error, etc.
        res.status(404).send('Post not found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

