var formAtual;

function gerarFormulario(obj) {
    var content = $('#form');
    
    (obj != formAtual) && function() {
        limparFormulário(formAtual);
        switch(obj){
            case 'ator':
                formularioAtor(content);
                break;
            case 'classe':
                formularioClasse(content);
                break;
            case 'diretor':
                formularioDiretor(content);
                break;
            case 'titulo':
                formularioTitulo(content);
                break;
            case 'item':
                formularioItem(content);
                break;
        }
        criarBotoes(content);
    }();
    formAtual = obj;
}

function limparFormulário(obj){
    $('#form').empty();
}

function criarBotoes(content){
    $('<div class="divBotoes">'+
    '<button type="button" class="btn btn-danger">Cancelar</button>'+
    '<button type="button" class="btn btn-success">Salvar</button>'+
    '</div>'
    ).appendTo(content);
}

function formularioClasse(content) {
    $('<h1>Classe</h1>').appendTo(content);
    $('<div class="form-group"><label for="nomeClasse">Nome</label><input type="text" class="form-control" id="nomeClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="valorClasse">Valor</label><input type="number" class="form-control" id="valorClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="prazoDevolucao">Prazo para devolução</label><input type="number" class="form-control" id="prazoDevolucao"></div>').appendTo(content);
}

function formularioAtor(content) {
    $('<h1>Ator</h1>').appendTo(content);
    $('<div class="form-group"><label for="nomeAtor">Nome</label><input type="text" class="form-control" id="nomeAtor"></div>').appendTo(content);
}

function formularioDiretor(content) {
    $('<h1>Direto</h1>').appendTo(content);
    $('<div class="form-group"><label for="nomeDiretor">Nome</label><input type="text" class="form-control" id="nomeDiretor"></div>').appendTo(content);
}

function formularioTitulo(content) {
    $('<h1>Título</h1>').appendTo(content);
    $('<div class="form-group"><label for="nomeTitulo">Nome</label><input type="text" class="form-control" id="nomeTitulo"></div>').appendTo(content);
    $('<div class="form-group"><label for="categoria">Categoria</label><input type="text" class="form-control" id="categoria"></div>').appendTo(content);
    $('<div class="form-group"><label for="sinopse">Sinópse</label><textarea class="form-control" id="sinopse" rows="3"></textarea></div>').appendTo(content);
}

function formularioItem(content) {
    $('<h1>Item</h1>').appendTo(content);
    $('<div class="form-group"><label for="numSerie">Número de Série</label><input type="number" class="form-control" id="numSerie"></div>').appendTo(content);
    $('<div class="form-group"><label for="dtAquisicao">Data de aquisição</label><input type="date" class="form-control" id="dtAquisicao"></div>').appendTo(content);
    $('<div class="form-group"><label for="tpItem">Tipo</label><input type="text" class="form-control" id="tpItem"></div>').appendTo(content);
}