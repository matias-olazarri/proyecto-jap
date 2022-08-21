let miFormulario = document.getElementById('login-form');

miFormulario.addEventListener('submit', function (evento) {
    let clave = document.getElementById('password');
    let usuario = document.getElementById('usuario');

    let miTexto = usuario.value;
    console.log(miTexto);


    if (clave != "" && miTexto != "") {
        evento.preventDefault();
        window.location.href = 'home.html';

    }

});


