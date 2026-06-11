let produtoEditando = null;

async function carregarCategorias() {

    const { data } =
        await supabaseClient
            .from("categorias")
            .select("*")
            .order("descricao");

    const combo =
        document.getElementById("categoria");

    combo.innerHTML =
        '<option value="">Selecione</option>';

    data.forEach(cat => {

        combo.innerHTML += `
            <option value="${cat.id}">
                ${cat.descricao}
            </option>
        `;
    });
}

async function salvarProduto() {

    const categoria =
        document.getElementById("categoria").value;

    const descricao =
        document.getElementById("descricao").value;

    const observacao =
        document.getElementById("observacao").value;

    const valorVenda =
        document.getElementById("valorVenda").value;

    const dataCadastro =
        document.getElementById("dataCadastro").value;

    const status =
        document.getElementById("status").value;

    if (
        !categoria ||
        !descricao ||
        !valorVenda ||
        !dataCadastro ||
        !status
    ) {
        alert("Preencha todos os campos obrigatórios");
        return;
    }

    const produto = {
        categoria_id: categoria,
        descricao,
        observacao,
        valor_venda: valorVenda,
        data_cadastro: dataCadastro,
        status
    };

    if (produtoEditando) {

        await supabaseClient
            .from("produtos")
            .update(produto)
            .eq("id", produtoEditando);

    } else {

        await supabaseClient
            .from("produtos")
            .insert(produto);
    }

    limparFormulario();
    listarProdutos();
}

async function listarProdutos() {

    const pesquisa =
    document.getElementById("pesquisaProduto")
    ?.value || "";

    const status =
    document.getElementById("filtroStatus")
    ?.value || "";

    let query = supabaseClient
    .from("produtos")
    .select(`
        *,
        categorias(descricao)
    `);

    if (pesquisa) {
    query = query.ilike("descricao", `%${pesquisa}%`);
    }

    if (status) {
    query = query.eq("status", status);
    }

const { data } = await query;

    let html = `
        <tr>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
    `;

    data.forEach(produto => {

        html += `
        <tr>

            <td>
                ${produto.categorias?.descricao || ""}
            </td>

            <td>
                ${produto.descricao}
            </td>

            <td>
                R$ ${produto.valor_venda}
            </td>

            <td>
                ${produto.status}
            </td>

            <td>

                <button
                    onclick="editarProduto('${produto.id}')">
                    Editar
                </button>

                <button
                    onclick="excluirProduto('${produto.id}')">
                    Excluir
                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById("tbProdutos").innerHTML = html;
}

async function editarProduto(id) {

    const { data } =
        await supabaseClient
            .from("produtos")
            .select("*")
            .eq("id", id)
            .single();

    produtoEditando = id;

    document.getElementById("categoria").value =
        data.categoria_id;

    document.getElementById("descricao").value =
        data.descricao;

    document.getElementById("observacao").value =
        data.observacao;

    document.getElementById("valorVenda").value =
        data.valor_venda;

    document.getElementById("dataCadastro").value =
        data.data_cadastro;

    document.getElementById("status").value =
        data.status;
}

async function excluirProduto(id) {

    if (!confirm("Deseja excluir?"))
        return;

    await supabaseClient
        .from("produtos")
        .delete()
        .eq("id", id);

    listarProdutos();
}

function limparFormulario() {

    produtoEditando = null;

    document.getElementById("categoria").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("observacao").value = "";
    document.getElementById("valorVenda").value = "";
    document.getElementById("dataCadastro").value = "";
    document.getElementById("status").value = "";
}

carregarCategorias();
listarProdutos();