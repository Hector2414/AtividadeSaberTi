let itens = [];

async function carregarClientes() {

    const { data } =
        await supabaseClient
            .from("clientes")
            .select("*")
            .order("nome");

    const combo =
        document.getElementById("cliente");

    combo.innerHTML =
        '<option value="">Selecione</option>';

    data.forEach(cliente => {

        combo.innerHTML += `
            <option value="${cliente.id}">
                ${cliente.nome}
            </option>
        `;
    });
}

async function carregarProdutos() {

    const { data } =
        await supabaseClient
            .from("produtos")
            .select("*")
            .eq("status", "ATIVO");

    const combo =
        document.getElementById("produto");

    combo.innerHTML =
        '<option value="">Selecione</option>';

    data.forEach(produto => {

        combo.innerHTML += `
            <option
                value="${produto.id}"
                data-valor="${produto.valor_venda}">
                ${produto.descricao}
            </option>
        `;
    });
}

document.addEventListener("change", function (e) {

    if (e.target.id === "produto") {

        const option =
            e.target.options[e.target.selectedIndex];

        document.getElementById("valorUnitario").value =
            option.dataset.valor || "";
    }
});

function adicionarItem() {

    const produtoSelect =
        document.getElementById("produto");

    const produtoId =
        produtoSelect.value;

    const produtoNome =
        produtoSelect.options[
            produtoSelect.selectedIndex
        ].text;

    const quantidade =
        Number(
            document.getElementById("quantidade").value
        );

    const valorUnitario =
        Number(
            document.getElementById("valorUnitario").value
        );

    if (
        !produtoId ||
        quantidade <= 0 ||
        valorUnitario <= 0
    ) {
        alert("Dados inválidos");
        return;
    }

    const total =
        quantidade * valorUnitario;

    itens.push({
        produtoId,
        produtoNome,
        quantidade,
        valorUnitario,
        total
    });

    renderizarItens();
}

function renderizarItens() {

    const tbody =
        document.querySelector("#tbItens tbody");

    tbody.innerHTML = "";

    let totalGeral = 0;

    itens.forEach((item, indice) => {

        totalGeral += item.total;

        tbody.innerHTML += `
        <tr>

            <td>${item.produtoNome}</td>

            <td>${item.quantidade}</td>

            <td>
                R$ ${item.valorUnitario}
            </td>

            <td>
                R$ ${item.total.toFixed(2)}
            </td>

            <td>

                <button
                onclick="removerItem(${indice})">
                    Excluir
                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById("valorTotal").value =
        totalGeral.toFixed(2);
}

function removerItem(indice) {

    itens.splice(indice, 1);

    renderizarItens();
}

async function salvarOrcamento() {

    const clienteId =
        document.getElementById("cliente").value;

    const dataOrcamento =
        document.getElementById("dataOrcamento").value;

    const dataValidade =
        document.getElementById("dataValidade").value;

    const valorTotal =
        Number(
            document.getElementById("valorTotal").value
        );

    if (!clienteId) {

        alert("Selecione um cliente");
        return;
    }

    if (itens.length === 0) {

        alert("Adicione itens");
        return;
    }

    const { data, error } =
        await supabaseClient
            .from("orcamentos")
            .insert({
                cliente_id: clienteId,
                data_orcamento: dataOrcamento,
                data_validade: dataValidade,
                valor_total: valorTotal
            })
            .select();

    if (error) {

        alert(error.message);
        return;
    }

    const orcamentoId = data[0].id;

    for (const item of itens) {

        await supabaseClient
            .from("itens_orcamento")
            .insert({

                orcamento_id: orcamentoId,

                produto_id: item.produtoId,

                quantidade: item.quantidade,

                valor_unitario:
                    item.valorUnitario,

                valor_total:
                    item.total
            });
    }

    alert("Orçamento salvo com sucesso");

    itens = [];

    renderizarItens();
}

carregarClientes();
carregarProdutos();