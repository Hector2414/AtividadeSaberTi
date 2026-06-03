const SUPABASE_URL ="https://yvssjulktwozcloozyxp.supabase.co";

const SUPABASE_KEY ="sb_publishable_wOBLgNupLXmo-YDFBC8wrA_EYSHGD9k";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let itens = [];

//---------------------------------------------------

async function login() {

    const usuario =
        document.getElementById("usuario").value;

    const senha =
        document.getElementById("senha").value;

    const { data } = await supabase
        .from('usuarios')
        .select('*')
        .eq('usuario', usuario)
        .eq('senha', senha)
        .single();

    if(data){
        localStorage.setItem("logado","true");
        location.href = "index.html";
    }else{
        alert("Usuário ou senha inválidos");
    }
}

//----------------------------------------------------------

async function salvarCliente(){

    const tipo_cliente =
        document.getElementById("tipo").value;

    const cpf_cnpj =
        document.getElementById("cpf").value;

    const nome =
        document.getElementById("nome").value;

    if(!nome || !cpf_cnpj){
        alert("Preencha todos os campos");
        return;
    }

    await supabase
        .from("clientes")
        .insert({ tipo_cliente, cpf_cnpj, nome });

    limparCliente();
    listarClientes();
}

function limparCliente(){
    document.getElementById("tipo").value = '';
    document.getElementById("cpf").value = '';
    document.getElementById("nome").value = '';
}

//-----------------------------------------------------------

async function listarClientes(){

    const { data } =
        await supabase
        .from("clientes")
        .select("*");

    const tbody = document.getElementById("listaClientes");
    if(tbody){
        tbody.innerHTML = (data || []).map(c => `
            <tr>
                <td>${c.id}</td>
                <td>${c.tipo_cliente}</td>
                <td>${c.cpf_cnpj}</td>
                <td>${c.nome}</td>
                <td>
                    <button class="btn-danger"
                        onclick="excluir(${c.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    const selectCliente = document.getElementById("cliente");
    if(selectCliente){
        selectCliente.innerHTML =
            '<option value="">Selecione</option>' +
            (data || []).map(c =>
                `<option value="${c.id}">${c.nome}</option>`
            ).join('');
    }
}

//---------------------------------------------------------------

async function excluir(id){

    await supabase
        .from("clientes")
        .delete()
        .eq("id", id);

    listarClientes();
}

//---------------------------------------------------------------

async function salvarCategoria(){

    const descricao =
        document.getElementById("descricao").value;

    if(!descricao){
        alert("Informe a descrição");
        return;
    }

    await supabase
        .from("categorias")
        .insert({ descricao });

    document.getElementById("descricao").value = '';
    listarCategorias();
}

//-------------------------------------------------------------------

async function listarCategorias(){

    const { data } =
        await supabase
        .from("categorias")
        .select("*");

    const tbody = document.getElementById("listaCategorias");
    if(tbody){
        tbody.innerHTML = (data || []).map(c => `
            <tr>
                <td>${c.id}</td>
                <td>${c.descricao}</td>
                <td>
                    <button class="btn-danger"
                        onclick="excluirCategoria(${c.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    const selectCategoria = document.getElementById("categoria");
    if(selectCategoria){
        selectCategoria.innerHTML =
            '<option value="">Selecione</option>' +
            (data || []).map(c =>
                `<option value="${c.id}">${c.descricao}</option>`
            ).join('');
    }
}

async function excluirCategoria(id){

    await supabase
        .from("categorias")
        .delete()
        .eq("id", id);

    listarCategorias();
}

//-------------------------------------------------------------------

async function salvarProduto(){

    const categoria_id =
        document.getElementById("categoria").value;

    const descricao =
        document.getElementById("descricao").value;

    const observacao =
        document.getElementById("obs").value;

    const valor_venda =
        document.getElementById("valor").value;

    const data_cadastro =
        document.getElementById("data").value;

    const status =
        document.getElementById("status").value;

    if(!categoria_id || !descricao || !valor_venda || !status){
        alert("Campos obrigatórios");
        return;
    }

    await supabase
        .from("produtos")
        .insert({
            categoria_id,
            descricao,
            observacao,
            valor_venda,
            data_cadastro,
            status
        });

    listarProdutos();
}

//-------------------------------------------------------------------

async function listarProdutos(){

    const { data } =
        await supabase
        .from("produtos")
        .select("*, categorias(descricao)");

    const tbody = document.getElementById("listaProdutos");
    if(tbody){
        tbody.innerHTML = (data || []).map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.categorias?.descricao || ''}</td>
                <td>${p.descricao}</td>
                <td>R$ ${Number(p.valor_venda).toFixed(2)}</td>
                <td>${p.status}</td>
                <td>
                    <button class="btn-danger"
                        onclick="excluirProduto(${p.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    const selectProduto = document.getElementById("produto");
    if(selectProduto){
        selectProduto.innerHTML =
            '<option value="">Selecione</option>' +
            (data || []).map(p =>
                `<option value="${p.id}">${p.descricao}</option>`
            ).join('');
    }
}

async function excluirProduto(id){

    await supabase
        .from("produtos")
        .delete()
        .eq("id", id);

    listarProdutos();
}

//---------------------------------------------------

function adicionarItem(){

    const selectProduto =
        document.getElementById("produto");

    const produto_id = selectProduto.value;

    const produto_nome =
        selectProduto.options[selectProduto.selectedIndex].text;

    const qtd =
        Number(document.getElementById("qtd").value);

    const valor =
        Number(document.getElementById("valor").value);

    if(!produto_id || !qtd || !valor){
        alert("Preencha todos os campos do item");
        return;
    }

    itens.push({
        produto_id,
        produto_nome,
        qtd,
        valor_unitario: valor,
        valor_total: qtd * valor
    });

    renderizarItens();
    calcularTotal();
}

function removerItem(index){
    itens.splice(index, 1);
    renderizarItens();
    calcularTotal();
}

function renderizarItens(){

    const tbody = document.getElementById("itens");
    if(!tbody) return;

    tbody.innerHTML = itens.map((item, i) => `
        <tr>
            <td>${item.produto_nome}</td>
            <td>${item.qtd}</td>
            <td>R$ ${item.valor_unitario.toFixed(2)}</td>
            <td>R$ ${item.valor_total.toFixed(2)}</td>
            <td>
                <button class="btn-danger"
                    onclick="removerItem(${i})">
                    Remover
                </button>
            </td>
        </tr>
    `).join('');
}

//---------------------------------------------------

function calcularItem(){

    const qtd =
        Number(document.getElementById("qtd").value);

    const valor =
        Number(document.getElementById("valor").value);

    return qtd * valor;
}

//---------------------------------------------------

function calcularTotal(){

    let total = 0;

    itens.forEach(item => {
        total += item.valor_total;
    });

    const el = document.getElementById("total");
    if(el) el.textContent = `R$ ${total.toFixed(2)}`;

    return total;
}

//----------------------------------------------------------

async function salvarOrcamento(){

    const cliente_id =
        document.getElementById("cliente").value;

    if(!cliente_id){
        alert("Selecione um cliente");
        return;
    }

    if(itens.length === 0){
        alert("Adicione itens");
        return;
    }

    const data_orcamento =
        document.getElementById("data_orcamento").value;

    const data_validade =
        document.getElementById("data_validade").value;

    const valor_total = calcularTotal();

    const { data: orcamento } = await supabase
        .from("orcamentos")
        .insert({ cliente_id, data_orcamento, data_validade, valor_total })
        .select()
        .single();

    if(orcamento){

        await supabase
            .from("orcamento_itens")
            .insert(itens.map(item => ({
                orcamento_id: orcamento.id,
                produto_id: item.produto_id,
                quantidade: item.qtd,
                valor_unitario: item.valor_unitario,
                valor_total: item.valor_total
            })));

        itens = [];
        renderizarItens();
        calcularTotal();
        alert("Orçamento salvo!");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    if(document.getElementById("listaClientes")){
        listarClientes();
    }

    if(document.getElementById("listaCategorias")){
        listarCategorias();
    }

    if(document.getElementById("listaProdutos")){
        listarProdutos();
    }
});