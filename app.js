const express = require('express');
const app = express();
const path = require('path');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
  });

  app.get('/new', (req, res) => {
    res.render('newMessage', {});
  })

  app.post('/new', (req, res) => {
    const messageUser = req.body.username;
    const messageText = req.body.message;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
  })

  const port = 7000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });