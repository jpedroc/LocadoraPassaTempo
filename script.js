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
            case 'cliente':
                formularioCliente();
                break;
        }
        tornarCamposObrigatorios();
        criarBotoes();
    }();
    formAtual = obj;
}

function limparFormulário(obj){
    $('#form').empty();
}

function criarBotoes(){
    $('<div class="divBotoes">'+
    '<button type="button" id="btnExcluir" onclick="excluirObj()" class="btn btn-secondary">Excluir</button>'+
    '<button type="button" id="btnBuscar" onclick="buscarObj()" class="btn btn-warning">Buscar</button>'+
    '<button type="button" id="btnCancelar" onclick="limparCampos()" class="btn btn-danger">Cancelar</button>'+
    '<button type="button" id="btnSalvar" onclick="validar()" class="btn btn-success">Salvar</button>'+
    '</div>'
    ).appendTo(content);
}

function popularSelect(arrayItens, obj){
    arrayItens.forEach((item) => {
        obj.append(`<option value="${item.id}">` + item.nome + '</option>');
    })
}

function adicionarSelect(id, label){
    $('<div class="form-group">'+
    `<label>${label}</label>`+
    `<select class="form-control" name="${id}" required id="${id}">`+
        '<option value="" disabled selected>Selecione...</option>'+
    '</select>'+
    '</div>').appendTo(content);
}

function formularioClasse() {
    $('<h1>Classe</h1>').appendTo(content);
    $('<div class="form-group"><label for="idClasse">ID</label><input name="idClasse" type="number" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeClasse">Nome</label><input name="nomeClasse" type="text" class="form-control" id="nome"></div>').appendTo(content);
    $('<div class="form-group"><label for="valorClasse">Valor</label><input name="valorClasse" type="number" class="form-control" id="valorClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="prazoDevolucao">Prazo para devolução</label><input name="prazoClasse" type="number" class="form-control" id="prazoDevolucao"></div>').appendTo(content);
}

function formularioAtor() {
    $('<h1>Ator</h1>').appendTo(content);
    $('<div class="form-group"><label for="idAtor">ID</label><input type="number" name="id" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeAtor">Nome</label><input type="text" name="nome" class="form-control" id="nome"></div>').appendTo(content);
}

function formularioDiretor() {
    $('<h1>Direto</h1>').appendTo(content);
    $('<div class="form-group"><label for="idDiretor">ID</label><input name="idDiretor" type="number" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeDiretor">Nome</label><input name="nomeDiretor" type="text" class="form-control" id="nome"></div>').appendTo(content);
}

function formularioTitulo() {
    $('<h1>Título</h1>').appendTo(content);
    $('<div class="form-group"><label for="idTitulo">ID</label><input name="idTitulo" type="number" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeTitulo">Nome</label><input name="nomeTitulo" type="text" class="form-control" id="nome"></div>').appendTo(content);
    $('<div class="form-group"><label for="categoria">Categoria</label><input name="categoria" type="text" class="form-control" id="categoria"></div>').appendTo(content);
    $('<div class="form-group"><label for="sinopse">Sinópse</label><textarea name="sinopse" class="form-control" id="sinopse" rows="3"></textarea></div>').appendTo(content);
    
    adicionarSelect("classe", "Classe");
    adicionarSelect('diretor', 'Diretor');

    $('<div class="form-group"><label>Atores</label><select name="atores" multiple class="form-control" id="atores"></select></div>').appendTo(content);

    var selectClasse = $('#classe');
    var selectDiretor = $('#diretor');
    var selectAtor = $('#atores');
    var listaClasse = JSON.parse(localStorage.getItem('classe'));
    var listaDiretor = JSON.parse(localStorage.getItem('diretor'));
    var listaAtores = JSON.parse(localStorage.getItem('ator'));

    popularSelect(listaClasse, selectClasse);
    popularSelect(listaDiretor, selectDiretor);
    popularSelect(listaAtores, selectAtor);

}

function formularioItem() {
    $('<h1>Item</h1>').appendTo(content);
    $('<div class="form-group"><label for="id">Número de Série</label><input name="numSerie" type="number" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="dtAquisicao">Data de aquisição</label><input name="dataAquisicao" type="date" class="form-control" id="dtAquisicao"></div>').appendTo(content);
    $('<div class="form-group"><label for="tpItem">Tipo</label><input type="text" name="tipoItem" class="form-control" id="tpItem"></div>').appendTo(content);
    adicionarSelect("titulo", "Título");

    var select = $('#titulo');
    var arrayItens = JSON.parse(localStorage.getItem('titulo'));
    popularSelect(arrayItens, select);
}

function getVetorLS(){
    return JSON.parse(localStorage.getItem(formAtual)) ? JSON.parse(localStorage.getItem(formAtual)) : [];  
}

function tornarCamposObrigatorios(){
    $('#form, :input').prop('required', true);
}

function validar(){
    $('#form').validate();
    if($('#form').valid()){
        salvarObj();
    }
}

function salvarObj(){
    const vetor = getVetorLS();
    const obj = getValue();

    const alter = vetor.find((element) => {
        return element.id == getValue().id        
    })

    alter ? vetor[vetor.indexOf(alter)] = obj : vetor.push(obj);

    localStorage.setItem(formAtual, JSON.stringify(vetor));
    limparCampos();
}

function valorCheck(){
    $('#formSocio :input').prop("disabled", !($('#isSocio').is(':checked')));
}

function limitarDependente(){
    var total = $('#multiselectDependentes :selected').length;

    return total > 3 ?  $('#btnSalvar').prop('disabled', true) : $('#btnSalvar').prop('disabled', false);;
}

function limparCampos(){
    $('#form, :input')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
}

function formularioCliente(){
    $('<h1>Cadastro Cliente</h1>').appendTo(content);
    $('<div class="form-group"><label for="numInscricao">Número de Inscrição</label><input type="number" class="form-control" id="numInscricao"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeCliente">Nome</label><input type="text" class="form-control" id="nomeCliente"></div>').appendTo(content);
    $('<div class="form-group"><label for="dtNascimento">Data de nascimento</label><input type="date" class="form-control" id="dtNascimento"></div>').appendTo(content);
    adicionarSelect('selectSexo', 'Sexo');
    $('<div class="form-group"><label for="estaAtivo">Está ativo?</label><input type="checkbox" class="form-control" id="estaAtivo"></div>').appendTo(content);
    $('<div class="form-group"><label for="isSocio">Sócio</label><input onclick="valorCheck()" type="checkbox" class="form-control" id="isSocio"></div>').appendTo(content);
    
    $('<form id="formSocio"><div class="form-group"><label for="cpf">CPF</label><input type="number" class="form-control" id="cpf"></div>'+
    '<div class="form-group"><label for="endereco">Endereço</label><input type="text" class="form-control" id="endereco"></div>' +
    '<div class="form-group"><label for="tel">Telefone</label><input type="tel" class="form-control" id="tel"></div>' +
    '<div class="form-group"><label>Dependentes</label><select onchange="limitarDependente()" multiple class="form-control" id="multiselectDependentes"></select></div></form>').appendTo(content);
    
    popularSelect(['Masculino', 'Feminino', 'Outros'], $('#selectSexo'));
    popularSelect(['João Pedro', 'Kaio Binda', 'Arthur', 'Chrystian', 'Jean', 'Alisson'], $('#multiselectDependentes'));
    valorCheck();
}

function getValue(){
    switch(formAtual){
        case 'ator':
            return getAtorValue();
        case 'classe':
            return getClasseValue();
        case 'diretor':
            return getDiretorValue();
        case 'item':
            return getItemValue();
        case 'titulo':
            return getTituloValue();      
    }
}

function getTituloValue() {
    const ator = {
        id:$('#id').val(),
        nome:$('#nome').val(),
        categoria:$('#categoria').val(),
        sinopse:$('#sinopse').val(),
        classe:buscarPorId($('#classe').val(), 'classe'),
        diretor:buscarPorId($('#diretor').val(), 'diretor'),
        atores:buscarLista($('#atores').val(), 'ator')
    }
    return ator;
}

function getAtorValue(){
    var ator = {
        id: $('#id').val(),
        nome: $('#nome').val()
    }
    return ator;
}

function getDiretorValue(){
    const diretor = {
        id: $('#id').val(),
        nome:$('#nome').val()
    }
    return diretor;
}

function getClasseValue(){
    const classe = {
        id:$('#id').val(),
        nome:$('#nome').val(),
        valorClasse:$('#valorClasse').val(),
        prazoDevolucao:$('#prazoDevolucao').val()
    }
    return classe;
}

function getItemValue(){
    const item = { 
        id: $('#id').val(),
        dtAquisicao: $('#dtAquisicao').val(),
        tpItem: $('#tpItem').val(),
        titulo: buscarPorId($('#titulo').val(), 'titulo')
    }
    return item;
}

function buscarPorId(id, obj){
    const vetor = JSON.parse(localStorage.getItem(obj));
    return vetor.find(element => { return element.id == id});
}

function buscarLista(vetor, obj){
    const vetorAux = [];
    console.log(vetor);
    vetor.forEach(element => {
        vetorAux.push(buscarPorId(element, obj));
    })

    return vetorAux;
}

function excluirObj(){
    var obj = getValue();
    var vetor = JSON.parse(localStorage.getItem(formAtual));

    obj = vetor.find(element => {
        return element.id == obj.id;
    })

    var apagar = confirm('Deseja realmente excluir este registro?');
    if (apagar){
        var pos = vetor.indexOf(obj);
        if(pos != -1){
            vetor.splice(pos, 1);
        }			
        limparCampos();
    }else{
        event.preventDefault();
    }	

    localStorage.setItem(formAtual, JSON.stringify(vetor));
}

function preencherFormulario(obj){
    Object.keys(obj).forEach(function(item){
        if(obj[item].id){
            $(`#${item} option:contains(${obj[item].nome})`).prop('selected', true);
        }
        else if(Array.isArray(obj[item])){
            obj[item].forEach(element => {
                $(`#${item} option:contains(${element.nome})`).prop('selected', true);
            })
        }
        else {
            $(`#${item}`).val(obj[item]);
        }
    });
}

function buscarObj(){
    var obj = $('#id').val();
    obj = buscarPorId(obj, formAtual);
    preencherFormulario(obj);
}

