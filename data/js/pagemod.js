var form = document.querySelector('#form1');
var node2Copy = document.querySelectorAll('[type=hidden], script');

var servidor = document.querySelector('#edtservidor');
servidor.removeAttribute('style');
servidor.setAttribute('class', 'form-control');

var db = document.querySelector('#edtbancodedados');
db.removeAttribute('style');
db.setAttribute('class', 'form-control');

var queryTextArea = document.querySelector('#edtdeclaracao').textContent;

var result = document.querySelector('#GridResultado') || document.createElement('div');

if (result.tagName == 'TABLE') {
  result.removeAttribute('style');
  result.querySelectorAll('tr').removeAttribute('style');
  result.setAttribute('class', 'table table-striped table-hover table-bordered table-condensed');
}
else {
  result.setAttribute('class', 'alert alert-info');
  result.textContent = 'Nenhum resultado encontrado';
}

document.querySelectorAll('html > *').remove();

// header
document.documentElement.appendChild(document.createElement('head'));
document.head.appendChild(document.createElement('title'));
document.title = 'SIMPLES - Página customizada por uma extensão';
document.head.innerHTML += '<meta charset="utf-8">';
document.head.innerHTML += '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
document.head.innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1">';
document.head.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">';
document.head.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">';

// body
document.documentElement.appendChild(document.createElement('body'));

document.body.innerHTML += '<div id="flash-messages"></div>';
document.body.innerHTML += '<nav class="navbar navbar-default"> \
      <div class="container"> \
        <div class="navbar-header"> \
          <a class="navbar-brand" id="home">SIMPLES</a> \
        </div> \
        <div id="navbar" class="collapse navbar-collapse"> \
          <ul class="nav navbar-nav navbar-right"> \
            <!-- <li><a href="#" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-time"></span> Chamados</a></li> -->\
          	<li><a href="#" id="user-matr"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a></li> \
            <li><a id="logout"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>Sair</a></li> \
          </ul> \
        </div><!--/.nav-collapse --> \
      </div> \
    </nav> \
    <div class="container" id="container"></div> \
    ';

document.querySelector('#home').setAttribute('href', "javascript:__doPostBack('edtVoltar','')");
document.querySelector('#logout').setAttribute('href', "javascript:__doPostBack('edtlogout','')");


form.innerHTML = '';
var container = document.querySelector('#container');
container.appendChild(form);
[].forEach.call(node2Copy, function(copy) { document.form1.appendChild(copy) });

document.querySelector('#user-matr').innerHTML += user.id;

document.form1.innerHTML += '<div id="options" class="form-inline"></div>';
var options = document.querySelector('#options');

var lbServidor = document.createElement('label');
lbServidor.setAttribute('for', 'edtservidor');
lbServidor.setAttribute('style', 'margin: 5px;');
lbServidor.textContent = 'Servidor:';
options.appendChild(lbServidor);
options.appendChild(servidor);

var lbDb = document.createElement('label');
lbDb.setAttribute('for', 'edtbancodedados');
lbDb.setAttribute('style', 'margin: 5px;');
lbDb.textContent = 'Banco de dados:';
options.appendChild(lbDb);
options.appendChild(db);

options.appendChild(document.createElement('hr'));

document.form1.innerHTML += `<div class="btn-group form-group">
                              <a class="btn btn-success btn-xs" title="Ctrl+Enter">
                                <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
                                <input name="btnExecutar" id="btnExecutar" alt="Executar" type="image">
                              </a>
                              <a class="btn btn-default btn-xs" id="saveOption">
                                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                                 Salvar query
                              </a>
                              <a  class="btn btn-default btn-xs text-transform" id="capitalize">
                                <span class="glyphicon glyphicon-font" aria-hidden="true"></span>
                                Capitalize
                              </a>
                              <a class="btn btn-default btn-xs text-transform" id="uppercase">
                                <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                Uppercase
                              </a>
                              <a class="btn btn-default btn-xs text-transform" id="lowercase">
                                <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                Lowercase
                              </a>
                              <label>
                                <input id="font" type="range" min="50" max="200" step="10">
                              </label>
                              <label class="btn btn-default btn-xs">
                                <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
                                <input name="btnExcel" id="btnExcel" alt="Exportar" type="image">
                              </label>
                            </div>`;

document.form1.innerHTML += '<div class="form-group"><textarea id="edtdeclaracao" class="form-control" name="edtdeclaracao" rows="10"></textarea></div>';
document.form1.innerHTML += '<div class="grid-resultado" id="result"></div>';

document.querySelector('#edtdeclaracao').textContent = queryTextArea;
document.querySelector('#result').appendChild(result);

var trs = document.querySelectorAll('#GridResultado tbody tr');
for(let i = 1; i < trs.length; i++) {
  var tr = trs[i].children[0];
  tr.innerHTML = `<a title="Clique para mostrar esta linha na vertical"
                     class="vertical-grid"
                     data-toggle="modal"
                     data-target="#verticalGridModal"
                     href="#">${tr.textContent}</a>`;
}

// footer
var footer = document.createElement('footer');
footer.setAttribute('class', 'footer');

footer.innerHTML = `<div class="input-group">
          <span class="input-group-btn">
          <button class="btn btn-default" type="button" id="toggle-table">
            Histórico
            <span class="glyphicon glyphicon-console"></span>
          </button>
          </span>
          <form id="submit-search" autocomplete="off">
            <input id="history" class="form-control" placeholder="search">
          </form>
          <span class="input-group-addon" id="message"></span>
      </div>
          <div class="pull-right">
            <input type="file" id="upload" accept="text/json" style="display:none;">
            <a id="exportar-insert" class="btn btn-default btn-xs" title="Exporta resultado da query com DML de INSERT">
              <span class="glyphicon glyphicon-menu-hamburger"></span>
                Exportar como INSERT
            </a>
            <a id="local-storage-download"></a>
            <a id="local-storage-json"></a>
            <a id="local-storage-info"></a>
            <button class="btn btn-success btn-xs" id="local-storage-upload" title="Importa arquivo JSON com queries">
              <span class="glyphicon glyphicon-open-file"></span>
              Upload JSON
            </button>
          </div>
      <div id="result-history">
        <table><tbody></tbody></table>
      </div>`;
document.body.appendChild(footer);
var verticalGridModal = document.createElement('div');
verticalGridModal.innerHTML = `
<div class="modal fade" id="verticalGridModal" tabindex="-1" role="dialog" aria-labelledby="verticalGridModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="verticalGridModalLabel">Vertical Grid</h4>
      </div>
      <div class="modal-body">
        <table id="verticalGridModalTable" class="table table-striped table-bordered table-responsive">
          <tbody></tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>`;

document.body.appendChild(verticalGridModal);

var jq = document.createElement('script');
jq.src = 'https://code.jquery.com/jquery-2.2.3.min.js';
jq.integrity = 'sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=';
jq.crossOrigin = 'anonymous';
document.body.appendChild(jq);

jq.onload = function() {
  var bjs = document.createElement('script');
  bjs.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js';
  document.body.appendChild(bjs);
}

