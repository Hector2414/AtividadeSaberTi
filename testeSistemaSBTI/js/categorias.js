let categoriaEditando = null;

async function salvarCategoria() {

    const descricao =
        document.getElementById("descricaoCategoria").value;

    if (!descricao) {
        alert("Informe a descrição");
        return;
    }

    if (categoriaEditando) {

        const { error } = await supabaseClient
            .from("categorias")
            .update({
                descricao
            })
            .eq("id", categoriaEditando);

        if (error) {
            alert(error.message);
            return;
        }

    } else {

        const { error } = await supabaseClient
            .from("categorias")
            .insert({
                descricao
            });

        if (error) {
            alert(error.message);
            return;
        }
    }

    limparFormulario();
    listarCategorias();
}

async function listarCategorias() {

    const { data, error } =
        await supabaseClient
            .from("categorias")
            .select("*")
            .order("descricao");

    if (error) {
        console.log(error);
        return;
    }

    let html = `
        <tr>
            <th>Descrição</th>
            <th>Ações</th>
        </tr>
    `;

    data.forEach(cat => {

        html += `
        <tr>

            <td>${cat.descricao}</td>

            <td>

                <button onclick="editarCategoria('${cat.id}')">
                    Editar
                </button>

                <button onclick="excluirCategoria('${cat.id}')">
                    Excluir
                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById("tbCategorias").innerHTML = html;
}

async function editarCategoria(id) {

    const { data } =
        await supabaseClient
            .from("categorias")
            .select("*")
            .eq("id", id)
            .single();

    categoriaEditando = id;

    document.getElementById("descricaoCategoria").value =
        data.descricao;
}

async function excluirCategoria(id) {

    if (!confirm("Deseja excluir?"))
        return;

    await supabaseClient
        .from("categorias")
        .delete()
        .eq("id", id);

    listarCategorias();
}

function limparFormulario() {

    categoriaEditando = null;

    document.getElementById("descricaoCategoria").value = "";
}

listarCategorias();