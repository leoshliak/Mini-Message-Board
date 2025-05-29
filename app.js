const { time } = require('console');
const express = require('express');
const app = express();
const path = require('path');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date().toLocaleString('en-GB', { hour: '2-digit', 
        minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date().toLocaleString('en-GB', { hour: '2-digit', 
        minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
    },
    
  ];
  
  const assetPath = path.join(__dirname, "public");
  app.use(express.static(assetPath));

  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
  });

  app.get('/message/:id', (req, res) => {
    const messageId = parseInt(req.params.id);
    if (messageId >= 0 && messageId < messages.length) {
      res.render('message', { title: 'Message Details', message: messages[messageId] });
    } else {
      res.render('message', { title: 'Message Not Found', message: null });
    }
  });

  app.get('/new', (req, res) => {
    res.render('newMessage', {title: "New Message", messages: messages});
  })

  app.post('/new', (req, res) => {
    const messageUser = req.body.username;
    const messageText = req.body.message;
    messages.push({ text: messageText, user: messageUser, added: new Date().toLocaleString('en-GB', { hour: '2-digit', 
      minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) });
    res.redirect('/');
  })

  const port = 7000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });