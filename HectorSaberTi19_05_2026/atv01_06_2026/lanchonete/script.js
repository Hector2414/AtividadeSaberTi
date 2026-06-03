var TAXA_ENTREGA = 4.00;

function toggleItem(card) {
  var checkbox = card.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;
  card.classList.toggle('selecionado', checkbox.checked);
  calcular();
}

function toggleEntrega() {
  var check = document.getElementById('checkEntrega');
  var opcao = document.getElementById('opcaoEntrega');
  check.checked = !check.checked;
  opcao.classList.toggle('ativo', check.checked);
  calcular();
}

function calcular() {
  var itens = document.querySelectorAll('.menu .item');
  var checkEntrega = document.getElementById('checkEntrega');
  var lista = document.getElementById('listaResumo');
  var totalEl = document.getElementById('totalFinal');

  var subtotal = 0;
  var html = '';

  for (var i = 0; i < itens.length; i++) {
    var check = itens[i].querySelector('input[type="checkbox"]');
    if (check.checked) {
      var nome = itens[i].querySelector('.item-nome').textContent;
      var preco = parseFloat(itens[i].querySelector('.item-preco').getAttribute('data-preco'));
      subtotal += preco;
      html += '<div class="resumo-linha"><span>' + nome + '</span><span>R$ ' + preco.toFixed(2).replace('.', ',') + '</span></div>';
    }
  }

  var total = subtotal;

  if (checkEntrega.checked) {
    html += '<div class="resumo-linha taxa"><span>Taxa de entrega</span><span>R$ 4,00</span></div>';
    total += TAXA_ENTREGA;
  }

  lista.innerHTML = html || '<p class="resumo-vazio">Nenhum item selecionado</p>';
  totalEl.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
}

function confirmarPedido() {
  var checkEntrega = document.getElementById('checkEntrega');
  var totalEl = document.getElementById('totalFinal');
  var itens = document.querySelectorAll('.menu .item');
  var algumSelecionado = false;

  for (var i = 0; i < itens.length; i++) {
    if (itens[i].querySelector('input[type="checkbox"]').checked) {
      algumSelecionado = true;
      break;
    }
  }

  if (!algumSelecionado) {
    alert('Selecione pelo menos um item antes de confirmar!');
    return;
  }

  var tipo = checkEntrega.checked ? 'Entrega em domicílio' : 'Retirada no balcão';
  document.getElementById('modalTexto').innerHTML =
    'Tipo: <strong>' + tipo + '</strong><br>Total: <strong>' + totalEl.textContent + '</strong>';

  document.getElementById('modalOverlay').classList.add('visivel');
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('visivel');
}
