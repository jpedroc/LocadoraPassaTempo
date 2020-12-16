var formAtual;
var content = $('#form')
let xhr = new XMLHttpRequest();

function gerarFormulario(obj) {
    (obj != formAtual) && function() {
        limparFormulario(formAtual);
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
            case 'locacao':
                formularioLocacao();
                break;
        }
        tornarCamposObrigatorios();
        formAtual = obj;
        criarBotoes();
    }();
}

function limparFormulario(obj){
    $('#form').empty();
    $('<input type="hidden" name="formAtual" value="" id="formAtual"></div>').appendTo(content);
    $('<input type="hidden" name="operacao" value="" id="operacao"></div>').appendTo(content);
}

function criarBotoes(){
    return formAtual == 'locacao' ? 
    function(){
        $('<div id="divBotoes" class="divBotoes">'+
        `<button type="button" id="btnBuscar" onclick="buscarItem($('#id').val())" class="btn btn-warning">Buscar</button>`+
        '<button type="button" id="btnCancelar" onclick="limparCampos()" class="btn btn-danger">Cancelar</button>'+
        '<button type="button" id="btnSalvar" onclick="salvarLocacao()" class="btn btn-success">Salvar</button>'+
        '</div>'
        ).appendTo(content);
    }() : 
    function(){
        $('<div id="divBotoes" class="divBotoes">'+
        '<button type="button" id="btnExcluir" onclick="excluirObj()" class="btn btn-secondary">Excluir</button>'+
        '<button type="button" id="btnBuscar" class="btn btn-warning">Buscar</button>'+
        '<button type="button" id="btnCancelar" onclick="limparCampos()" class="btn btn-danger">Cancelar</button>'+
        '<button type="button" id="btnSalvar" onclick="salvarObj()" class="btn btn-success">Salvar</button>'+
        '</div>'
        ).appendTo(content);
    }()
}

function excluirObj() {
    $('#operacao').val("excluir");
    $('#formAtual').val(formAtual);

    $('#form').trigger("submit");

    limparCampos();
}

function popularSelect(obj, classe){
    $.get(`ControllerGeral/?classe=${classe}`).done(function(element) {
        element.forEach((item) => {
            obj.append(`<option value="${item.id}">` + item.nome + '</option>');
        })
    });
}

function adicionarSelect(id, label, div){
    $('<div class="form-group">'+
    `<label>${label}</label>`+
    `<select class="form-control" name="${id}" id="${id}">`+
        '<option value="" disabled selected>Selecione...</option>'+
    '</select>'+
    '</div>').appendTo(div);
}

function formularioClasse() {
    $('<h1>Classe</h1>').appendTo(content);
    $('<div class="form-group"><label for="idClasse">ID</label><input name="idClasse" type="number" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="nomeClasse">Nome</label><input name="nomeClasse" type="text" class="form-control" id="nomeClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="valorClasse">Valor</label><input name="valorClasse" type="number" class="form-control" id="valorClasse"></div>').appendTo(content);
    $('<div class="form-group"><label for="prazoDevolucao">Prazo para devolução</label><input name="prazoClasse" type="number" class="form-control" id="prazoClasse"></div>').appendTo(content);
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
    
    adicionarSelect("classe", "Classe", content);
    adicionarSelect('diretor', 'Diretor', content);

    $('<div class="form-group"><label>Atores</label><select name="atores" multiple class="form-control" id="atores"></select></div>').appendTo(content);

    var selectClasse = $('#classe');
    var selectDiretor = $('#diretor');
    var selectAtor = $('#atores');

    popularSelect(selectClasse, "classe");
    popularSelect( selectDiretor, "diretor");
    popularSelect(selectAtor, "ator");

}

function formularioItem() {
    $('<h1>Item</h1>').appendTo(content);
    $('<div class="form-group"><label for="id">Número de Série</label><input name="numSerie" type="number" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="dtAquisicao">Data de aquisição</label><input name="dataAquisicao" type="date" class="form-control" id="dtAquisicao"></div>').appendTo(content);
    $('<div class="form-group"><label for="tpItem">Tipo</label><input type="text" name="tipoItem" class="form-control" id="tpItem"></div>').appendTo(content);
    adicionarSelect("titulo", "Título", content);

    var select = $('#titulo');
    var arrayItens = JSON.parse(localStorage.getItem('titulo'));
    popularSelect(arrayItens, select);
}

function tornarCamposObrigatorios(){
    // $('#form, :input').not(':input[type="checkbox"]').prop('required', true);
}

function salvarObj(){
    $('#operacao').val(
        $('#id').val() ? "alterar" : "novo"
    );
    $('#formAtual').val(formAtual);

    $('#form').trigger("submit");

    limparCampos();
}

function valorCheck(){
    $('#isDependente').is(':checked') ? 
        (function() {
            $('#formSocio :input')
                .val('')
                .prop('checked', false)
                .prop('selected', false)
                .prop('disabled', true);
            $('#formSocio, :input').prop('required', false);
            $('#socio').prop("disabled", false).prop("required", true);
        }()) 
        : 
        (function() {
            $('#formSocio, :input').prop("disabled", false).prop("required", false);
            $('#socio').prop("disabled", true).val('');
        }())
}


function limparCampos(){
    $('#form, :input')
        .val('')
        .prop('checked', false)
        .prop('selected', false);
}

function formularioCliente(){
    $('<h1>Cadastro Cliente</h1>').appendTo(content);
    $('<div class="form-group"><label for="estaAtivo">Está ativo?</label><input type="checkbox" name="estaAtivo" class="form-control" id="estaAtivo"></div>').appendTo(content);
    $('<div class="form-group"><label for="id">Número de Inscrição</label><input type="number" name="id" class="form-control" id="id"></div>').appendTo(content);
    $('<div class="form-group"><label for="nome">Nome</label><input type="text" class="form-control" name="estanomeAtivo" id="nome"></div>').appendTo(content);
    $('<div class="form-group"><label for="dtNascimento">Data de nascimento</label><input type="date" name="dtNascimento" class="form-control" id="dtNascimento"></div>').appendTo(content);
    adicionarSelect('socio', 'Sócio', content)
    adicionarSelect('sexo', 'Sexo', content);
    $('<div class="form-group"><label for="isDependente">Dependente?</label><input onclick="valorCheck()" type="checkbox" class="form-control" name="isDependente" id="isDependente"></div>').appendTo(content);
    
    $('<div id="formSocio"><div class="form-group"><label for="cpf">CPF</label><input type="number" class="form-control" name="cpf" id="cpf"></div>'+
    '<div class="form-group"><label for="endereco">Endereço</label><input type="text" class="form-control" name="endereco" id="endereco"></div>' +
    '<div class="form-group"><label for="telefone">Telefone</label><input type="tel" class="form-control" name="telefone" id="telefone"></div></div>').appendTo(content);
    
    var select = $('#socio');
    var arrayItens = JSON.parse(localStorage.getItem('cliente'));
    popularSelect(arrayItens, select);
    popularSelect([{id:'masculino', nome:'Masculino'}, {id:'feminino', nome:'Feminino'},{id:'outros', nome:'Outros'}], $('#sexo'));
    valorCheck();
}

function adicionarItemTabela(obj){
    $(`<tr> <td>${obj.id}</td> <td>${obj.titulo.nome}</td> <td>${obj.status}</td> <td><button type="button" class="btn btn-info" onclick="buscarItem(${parseInt(obj.id)})">Alocar</button></td> </tr>`).appendTo($('#bodyTable'));
}

function buscarItem(obj){
    const vetor = JSON.parse(localStorage.getItem('item'));
    const item = vetor.find(element => {
        return element.id == obj;
    })
    $('#valor').val(item.titulo.classe.valorClasse);
    var now = new Date();
    now.setDate(now.getDate() + parseInt(item.titulo.classe.prazoDevolucao));
    const data = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) +  '-' + ("0" + now.getDate()).slice(-2);
    $('#dataDevolucao').val(data);
    preencherFormulario(item);
}

function salvarLocacao(){
    var item = buscarPorId($('#id').val(), 'item');
    const now = new Date();
    const data = now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) +  '-' + ("0" + now.getDate()).slice(-2);
    
    item.status == 'Disponível' ? 
    function(){
        item.cliente = buscarPorId($('#cliente').val(), 'cliente');
        item.status = 'Locado';
        item.dataDevolucao = $('#dataDevolucao').val();
    }() : 
    function(){
        item.multa = $('#multa').val();
        item.status = 'Disponível';
        item.cliente = '';
        item.dataDevolucao = data;
    }();

    var vetor = JSON.parse(localStorage.getItem('item'));
    const pos = vetor.find(element => {
        return parseInt(element.id) == parseInt(item.id) ;
    })
    
    pos ? vetor[vetor.indexOf(pos)] = item : vetor.push(item);

    localStorage.setItem('item', JSON.stringify(vetor));
    limparCampos(); 
}

function popularTabela(arrayItens){
    arrayItens.forEach(element => {
        adicionarItemTabela(element);
    })
}

function formularioLocacao(){
    $('<h1>Locar Item</h1>').appendTo(content);

    adicionarSelect('cliente', 'Cliente', content);
    $(`<div class="form-group"><label for="id">Num Série</label><input type="number" name="id" class="form-control" id="id"></div>` +
    '<div class="form-group"><label for="valor">Valor R$</label><input type="number" name="valor" class="form-control" id="valor"></div>'+
    '<div class="form-group"><label for="dataDevolucao">Data Devolução</label><input type="date" name="data" class="form-control" id="dataDevolucao"></div>'+
    '<div class="form-group"><label for="multa">Multa R$</label><input type="number" name="multa" class="form-control" id="multa"></div>').appendTo(content);
    
    $('<table class="table">'+
    '<thead class="thead-dark">'+
        '<tr> <th id="id" scope="col">Num Série</th> <th id="titulo" scope="col">Título</th> <th id="status" scope="col">Status</th> <th id="op" scope="col"></th> </tr>'+
    '</thead> <tbody id="bodyTable"></tbody>').appendTo(content);

    const vetorItens = JSON.parse(localStorage.getItem('item'));
    const vetorClientes = JSON.parse(localStorage.getItem('cliente'));
    popularSelect(vetorClientes, $('#cliente'));
    popularTabela(vetorItens);
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
        case 'cliente':
            return getClienteValue();   
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
        titulo: buscarPorId($('#titulo').val(), 'titulo'),
        status: 'Disponível',
        dataDevolucao: '',
        cliente: ''
    }
    return item;
}

function getClienteValue(){
    const cliente = {
        id: $('#id').val(),
        nome: $('#nome').val(),
        dtNascimento: $('#dtNascimento').val(),
        nome: $('#nome').val(),
        socio: buscarPorId($('#socio').val(), 'cliente'),
        sexo: $('#sexo').val(),
        cpf: $('#cpf').val(),
        endereco: $('#endereco').val(),
        telefone: $('#telefone').val(),
        estaAtivo: $('#estaAtivo').is(':checked'),
        isDependente: $('#ativo').is(':checked')
    }
    return cliente;
}

function buscarPorId(id, obj){
    const vetor = JSON.parse(localStorage.getItem(obj));
    return id ? vetor.find(element => { return element.id == id}) : null;
}

function buscarLista(vetor, obj){
    const vetorAux = [];
    vetor.forEach(element => {
        vetorAux.push(buscarPorId(element, obj));
    })

    return vetorAux;
}

function preencherFormulario(obj){
    Object.keys(obj).forEach(function(item){
        obj[item] && function(){
            if(obj[item].id){
                $(`#${item} option:contains(${obj[item].id})`).prop('selected', true);
            }
            else if(typeof obj[item] === 'boolean'){
                $(`#${item}`).prop('checked', obj[item]);
            }
            else if(Array.isArray(obj[item])){
                obj[item].forEach(element => {
                    $(`#${item} option:contains(${element.nome})`).prop('selected', true);
                })
            }
            else {
                $(`#${item}`).val(obj[item]);
            }
        }()
    });
}

function buscarObj(){
    var obj = $('#id').val();
    obj = buscarPorId(obj, formAtual);
    preencherFormulario(obj);
}

