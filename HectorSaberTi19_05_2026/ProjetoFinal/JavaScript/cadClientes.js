// Validação Bootstrap
        document.getElementById('formCliente').addEventListener('submit', function (e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.preventDefault();
                alert('Cliente salvo com sucesso!');
                this.reset();
                this.classList.remove('was-validated');
                return;
            }
            this.classList.add('was-validated');
        });

        // Máscara CPF
        document.getElementById('cpf').addEventListener('input', function () {
            let v = this.value.replace(/\D/g, '').substring(0, 11);
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            this.value = v;
        });

        // Máscara Telefone/Celular
        function mascaraTel(el) {
            el.addEventListener('input', function () {
                let v = this.value.replace(/\D/g, '').substring(0, 11);
                if (v.length <= 10) {
                    v = v.replace(/(\d{2})(\d)/, '($1) $2');
                    v = v.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    v = v.replace(/(\d{2})(\d)/, '($1) $2');
                    v = v.replace(/(\d{5})(\d)/, '$1-$2');
                }
                this.value = v;
            });
        }
        mascaraTel(document.getElementById('telefone'));
        mascaraTel(document.getElementById('celular'));

        // Máscara CEP
        document.getElementById('cep').addEventListener('input', function () {
            let v = this.value.replace(/\D/g, '').substring(0, 8);
            v = v.replace(/(\d{5})(\d)/, '$1-$2');
            this.value = v;
        });