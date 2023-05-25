const authenticate = (req, res, next) => {
    const authCookie = req.cookies.auth;
    console.log(authCookie);
    if (authCookie === "true") {
      // Utilizatorul este autentificat, permite accesul la ruta protejată
      next();
    } else {
      // Utilizatorul nu este autentificat, redirecționează către pagina de autentificare
      res.redirect("/signin");
      res.clearCookie("auth"); 
      res.clearCookie("user")
    }
  };

  module.exports ={authenticate}
  