async function login() {

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    const { data, error } = await supabaseClient
        .from("usuarios")
        .select("*")
        .eq("usuario", usuario)
        .eq("senha", senha);

    if (data.length > 0) {

        localStorage.setItem("usuarioLogado", usuario);

        window.location.href = "home.html";

    } else {

        document.getElementById("msg").innerHTML =
            "Usuário ou senha inválidos";

    }
}