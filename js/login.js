let miFormulario = document.getElementById('login-form');

miFormulario.addEventListener('submit', function(evento){
    let clave = document.getElementById('password');
    let usuario = document.getElementById('usuario');

    if (clave != "" && usuario.value != "") {
        evento.preventDefault();
        localStorage.setItem("user", usuario.value);
        window.location.href = 'home.html';
       
    }
 
});


