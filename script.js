var formAtual;
var content = $('#form')

function gerarFormulario(obj) {
    
    (obj != formAtual) && function() {
        limparFormulário(formAtual);
        switch(obj){
            case 'ator':
                formularioAtor();
                break;
            case 'classe':
                formularioClasse();
                break;
            case 'diretor':
                formularioDiretor();
                break;
            case 'titulo':
                formularioTitulo();
                break;
            case 'item':
                formularioItem();
                break;
        }
        criarBotoes();
    }();
    formAtual = obj;
}

function limparFormulário(obj){
    $('#form').empty();
}

function criarBotoes(){
    $('<div class="divBotoes">'+
    '<button type="button" class="btn btn-danger">Cancelar</button>'+
    '<button type="button" onclick="getValue()" class="btn btn-success">Salvar</button>'+
    '</div>'
    ).appendTo(content);
}

function popularSelect(arrayItens, obj){
    arrayItens.forEach((item) => {
        obj.append(`<option value="${item.toLowerCase()}">` + item + '</option>');
    })
}

function adicionarSelect(id, label){
    $('<div class="form-group">'+
    `<label>${label}</label>`+
    `<select class="form-control" id="${id}">`+
        '<option value="" disabled selected>Selecione...</option>'+
    '</select>'+
    '</div>').appendTo(content);
}

function formularioClasse() {
    $('<h1>Classe</h1>').appendTo(content);
    $('<div class="form-group"><label for="idClasse">ID</label><input type="number" class="form-control" id="idClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeClasse">Nome</label><input type="text" class="form-control" id="nomeClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="valorClasse">Valor</label><input type="number" class="form-control" id="valorClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="prazoDevolucao">Prazo para devolução</label><input type="number" class="form-control" id="prazoDevolucao"></div>').appendTo(content);
}

function formularioAtor() {
    $('<h1>Ator</h1>').appendTo(content);
    $('<div class="form-group"><label for="idAtor">ID</label><input type="number" class="form-control" id="idAtor"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeAtor">Nome</label><input type="text" class="form-control" id="nomeAtor"></div>').appendTo(content);
}

function formularioDiretor() {
    $('<h1>Direto</h1>').appendTo(content);
    $('<div class="form-group"><label for="idDiretor">ID</label><input type="number" class="form-control" id="idDiretor"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeDiretor">Nome</label><input type="text" class="form-control" id="nomeDiretor"></div>').appendTo(content);
}

function formularioTitulo() {
    $('<h1>Título</h1>').appendTo(content);
    $('<div class="form-group"><label for="idTitulo">ID</label><input type="number" class="form-control" id="idTitulo"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeTitulo">Nome</label><input type="text" class="form-control" id="nomeTitulo"></div>').appendTo(content);
    $('<div class="form-group"><label for="categoria">Categoria</label><input type="text" class="form-control" id="categoria"></div>').appendTo(content);
    $('<div class="form-group"><label for="sinopse">Sinópse</label><textarea class="form-control" id="sinopse" rows="3"></textarea></div>').appendTo(content);
    
    adicionarSelect("selectClasse", "Classe");
    adicionarSelect('selectDiretor', 'Diretor');

    $('<div class="form-group"><label>Atores</label><select multiple class="form-control" id="multiselectAtor"></select></div>').appendTo(content);

    var selectClasse = $('#selectClasse');
    var selectDiretor = $('#selectDiretor');
    var selectAtor = $('#multiselectAtor');
    var listaClasse = ['Classe 1', 'Classe 2'];
    var listaDiretor = ['Igor Pulini', 'Victório Albani', 'Tua Mãe'];
    var listaAtores = ['Flavio', 'Marlon', 'Luiz', 'Diego', 'Eduardo', 'Robinho', 'Rosa'];

    popularSelect(listaClasse, selectClasse);
    popularSelect(listaDiretor, selectDiretor);
    popularSelect(listaAtores, selectAtor);

}

function formularioItem() {
    $('<h1>Item</h1>').appendTo(content);
    $('<div class="form-group"><label for="numSerie">Número de Série</label><input type="number" class="form-control" id="numSerie"></div>').appendTo(content);
    $('<div class="form-group"><label for="dtAquisicao">Data de aquisição</label><input type="date" class="form-control" id="dtAquisicao"></div>').appendTo(content);
    $('<div class="form-group"><label for="tpItem">Tipo</label><input type="text" class="form-control" id="tpItem"></div>').appendTo(content);
    adicionarSelect("selectTitulo", "Título");

    var select = $('#selectTitulo');
    var arrayItens = ['Diario de um Banana', 'Apocalipse', 'A Arte da Guerra'];
    popularSelect(arrayItens, select);
}

function getValue(){
    switch(formAtual){
        case 'ator':
            getAtorValue();
            break;
        case 'classe':
            getClasseValue();
            break;
        case 'diretor':
            getDiretorValue();
            break;
        case 'item':
            getItemValue();
            break;
        case 'titulo':
            getTituloValue();
            break;
    }
}

function getTituloValue() {
    var id = $('#idTitulo').val();
    var nome = $('#nomeTitulo').val();
    var categoria = $('#categoria').val();
    var sinopse = $('#sinopse').val();
    var classe = $('#selectClasse').val();
    var diretor = $('#selectDiretor').val();
    var atores = $('#multiselectAtor').val();

    console.log({id, nome, categoria, sinopse, classe, diretor, atores});
}

function getAtorValue(){
    var id = $('#idAtor').val();
    var nome = $('#nomeAtor').val();
    console.log({idAtor:id, nomeAtor:nome});
}

function getDiretorValue(){
    var id = $('#idDiretor').val();
    var nome = $('#nomeDiretor').val();
    console.log({id, nome});
}

function getClasseValue(){
    var idClasse = $('#idClasse').val();
    var nomeClasse = $('#nomeClasse').val();
    var valorClasse = $('#valorClasse').val();
    var prazo = $('#prazoDevolucao').val();

    console.log({idClasse, nomeClasse, valorClasse, prazo});
}

function getItemValue(){
    var numSerie = $('#numSerie').val();
    var dataAquisicao = $('#dtAquisicao').val();
    var tipoItem = $('#tpItem').val();

    console.log({numSerie, dataAquisicao, tipoItem});
}