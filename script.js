document.addEventListener("DOMContentLoaded", function() {
    const url = "https://rafaelescalfoni.github.io/desenv_web/filmes.json";
    const catalogoDiv = document.getElementById('catalogo');

    // Função para preencher a ficha de apresentação
    function preencherFicha(filme) {
        const ficha = document.createElement('div');
        ficha.classList.add('ficha');

        const titulo = document.createElement('h2');
        titulo.textContent = filme.titulo;
        ficha.appendChild(titulo);

        const resumo = document.createElement('p');
        resumo.textContent = filme.resumo;
        ficha.appendChild(resumo);

        const img = document.createElement('img');
        img.src = filme.figura;
        img.alt = `Poster de ${filme.titulo}`;
        ficha.appendChild(img);

        const faixaEtaria = document.createElement('div');
        faixaEtaria.classList.add('faixa-etaria');
        if (filme.classificacao <= 14) {
            faixaEtaria.classList.add('verde');
        } else if (filme.classificacao < 18) {
            faixaEtaria.classList.add('amarelo');
        } else {
            faixaEtaria.classList.add('vermelho');
        }
        faixaEtaria.textContent = `${filme.classificacao}+`;
        ficha.appendChild(faixaEtaria);

        const generos = document.createElement('p');
        generos.textContent = `Gêneros: ${filme.generos.join(', ')}`;
        ficha.appendChild(generos);

        const elenco = document.createElement('p');
        elenco.textContent = `Elenco: ${filme.elenco.join(', ')}`;
        ficha.appendChild(elenco);

        const opinioes = document.createElement('p');
        opinioes.textContent = 'Opiniões: ';
        filme.opinioes.forEach(opiniao => {
            const span = document.createElement('span');
            span.classList.add('estrelas');
            span.textContent = '★'.repeat(opiniao.rating);
            opinioes.appendChild(span);
            opinioes.appendChild(document.createTextNode(` ${opiniao.descricao}\n`));
        });
        ficha.appendChild(opinioes);

        catalogoDiv.appendChild(ficha);
    }

    // Função para carregar dados do JSON
    function carregarDados() {
        fetch(url)
            .then(response => {
                console.log('Response status:', response.status); // Verificar o status da resposta
                return response.json();
            })
            .then(dados => {
                console.log('Dados recebidos:', dados); // Verificar se os dados estão sendo recebidos
                dados.forEach(filme => preencherFicha(filme));
            })
            .catch(error => {
                const erroMsg = document.createElement('p');
                erroMsg.textContent = "Erro ao carregar os dados.";
                catalogoDiv.appendChild(erroMsg);
                console.error("Erro ao carregar os dados: ", error);
            });
    }

    carregarDados(); // Carrega os dados ao iniciar
});
