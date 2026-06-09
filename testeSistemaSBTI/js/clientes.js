let clienteEditando = null;

async function salvarCliente() {

    let tipo = document.getElementById("tipoCliente").value;
    let cpf = document.getElementById("cpfCnpj").value;
    let nome = document.getElementById("nomeCliente").value;

    if(!tipo || !cpf || !nome){
        alert("Preencha todos os campos");
        return;
    }

    if(clienteEditando){

        await supabaseClient
        .from("clientes")
        .update({
            tipo_cliente: tipo,
            cpf_cnpj: cpf,
            nome: nome
        })
        .eq("id", clienteEditando);

    }else{

        await supabaseClient
        .from("clientes")
        .insert({
            tipo_cliente: tipo,
            cpf_cnpj: cpf,
            nome: nome
        });

    }

    limpar();
    listarClientes();
}
//-------------------------------
async function listarClientes(){

    const { data } =
        await supabaseClient
        .from("clientes")
        .select("*");

    let html = `
    <tr>
        <th>Nome</th>
        <th>CPF/CNPJ</th>
        <th>Ações</th>
    </tr>`;

    data.forEach(c => {

        html += `
        <tr>

            <td>${c.nome}</td>
            <td>${c.cpf_cnpj}</td>

            <td>

                <button onclick="editarCliente('${c.id}')">
                    Editar
                </button>

                <button onclick="excluirCliente('${c.id}')">
                    Excluir
                </button>

            </td>

        </tr>`;
    });

    document
    .getElementById("tbClientes")
    .innerHTML = html;
}

listarClientes();
//---------------------------------------------------------

async function excluirCliente(id){

    if(confirm("Deseja excluir?")){

        await supabaseClient
            .from("clientes")
            .delete()
            .eq("id", id);

        listarClientes();
    }
}
//---------------------------------------------------------

