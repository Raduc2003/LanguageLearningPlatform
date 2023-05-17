const express = require("express");
const router = express.Router();

router.use(cookieParser());

router.get("/", (req, res) => {
  res.render("signin");
});


router.post('/', (req, res) => {
  const { username, password } = req.body;
  
  // Verificați utilizatorul (aici ar trebui să verificați împotriva utilizatorilor stocați local)
  if (username === 'admin' && password === 'admin123') {
    // Utilizatorul este autentificat, generați un token JWT
    const token = jwt.sign({ username }, 'secretKey');
    
    // Setăm cookie-ul cu tokenul JWT
    res.cookie('token', token, { httpOnly: true });
    
    // Redirecționați către pagina principală sau o altă pagină relevantă
    res.redirect('/');
  } else {
    // Autentificare eșuată, afișați un mesaj de eroare sau redirecționați către pagina de autentificare
    res.redirect('/signin');
  }
});

module.exports = router;
