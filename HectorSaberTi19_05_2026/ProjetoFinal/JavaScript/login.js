document.getElementById('formLogin').addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'home.html';
});

document.getElementById('toggleSenha').addEventListener('click', function () {
    const campoSenha = document.getElementById('senha');
    const icone = document.getElementById('iconeOlho');

    if (campoSenha.type === 'password') {
        campoSenha.type = 'text';
        icone.innerHTML = '<path d="M10.94 6.08A6.93 6.93 0 0 1 12 6c3.18 0 6 2.24 7 6-.28.94-.76 1.81-1.38 2.56M9.14 9.14A3 3 0 0 0 12 15a3 3 0 0 0 2.83-2M3 3l18 18M10.59 10.59A3 3 0 0 0 12 9M5 5S3.27 6.27 2 9c1 3.76 3.82 6 7 6 .95 0 1.87-.17 2.73-.47"/>';
    } else {
        campoSenha.type = 'password';
        icone.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    }
});
