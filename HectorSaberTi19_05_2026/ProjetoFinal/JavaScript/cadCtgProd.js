let categorias = [];
        let proximoId = 1;
        let idEditando = null;
        let idExcluindo = null;
        const modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluir'));

        function renderizarTabela(lista) {
            const tbody = document.getElementById('tabelaCategorias');
            const semReg = document.getElementById('semRegistros');
            tbody.innerHTML = '';

            if (lista.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Nenhuma categoria encontrada.</td></tr>';
                return;
            }

            lista.forEach(function (cat) {
                const tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + cat.id + '</td>' +
                    '<td>' + cat.nome + '</td>' +
                    '<td>' + (cat.descricao || '-') + '</td>' +
                    '<td><span class="badge ' + (cat.status === 'ativo' ? 'bg-success' : 'bg-secondary') + '">' + (cat.status === 'ativo' ? 'Ativo' : 'Inativo') + '</span></td>' +
                    '<td>' +
                        '<button class="btn btn-sm btn-warning me-1" onclick="editar(' + cat.id + ')">Editar</button>' +
                        '<button class="btn btn-sm btn-danger" onclick="confirmarExcluir(' + cat.id + ')">Excluir</button>' +
                    '</td>';
                tbody.appendChild(tr);
            });
        }

        document.getElementById('formCategoria').addEventListener('submit', function (e) {
            e.preventDefault();
            if (!this.checkValidity()) {
                this.classList.add('was-validated');
                return;
            }

            const nome = document.getElementById('nomeCategoria').value.trim();
            const descricao = document.getElementById('descricao').value.trim();
            const status = document.getElementById('status').value;

            if (idEditando !== null) {
                const cat = categorias.find(function (c) { return c.id === idEditando; });
                cat.nome = nome;
                cat.descricao = descricao;
                cat.status = status;
                idEditando = null;
                document.getElementById('btnSalvar').textContent = 'Salvar';
            } else {
                categorias.push({ id: proximoId++, nome: nome, descricao: descricao, status: status });
            }

            this.reset();
            this.classList.remove('was-validated');
            document.getElementById('pesquisa').value = '';
            renderizarTabela(categorias);
        });

        document.getElementById('btnLimpar').addEventListener('click', function () {
            idEditando = null;
            document.getElementById('btnSalvar').textContent = 'Salvar';
            document.getElementById('formCategoria').classList.remove('was-validated');
        });

        function editar(id) {
            const cat = categorias.find(function (c) { return c.id === id; });
            document.getElementById('nomeCategoria').value = cat.nome;
            document.getElementById('descricao').value = cat.descricao;
            document.getElementById('status').value = cat.status;
            idEditando = id;
            document.getElementById('btnSalvar').textContent = 'Atualizar';
            document.getElementById('formCategoria').classList.remove('was-validated');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function confirmarExcluir(id) {
            const cat = categorias.find(function (c) { return c.id === id; });
            idExcluindo = id;
            document.getElementById('nomeExcluir').textContent = cat.nome;
            modalExcluir.show();
        }

        document.getElementById('btnConfirmarExcluir').addEventListener('click', function () {
            categorias = categorias.filter(function (c) { return c.id !== idExcluindo; });
            idExcluindo = null;
            modalExcluir.hide();
            document.getElementById('pesquisa').value = '';
            renderizarTabela(categorias);
        });

        document.getElementById('pesquisa').addEventListener('input', function () {
            const termo = this.value.toLowerCase();
            const filtradas = categorias.filter(function (c) {
                return c.nome.toLowerCase().includes(termo) || (c.descricao && c.descricao.toLowerCase().includes(termo));
            });
            renderizarTabela(filtradas);
        });