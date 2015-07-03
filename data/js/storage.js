function isSaveQuery() {
	if(user.config.saveQuery) {
		saveQuery();
	}
}

function saveQuery () {
	var newQuery = new Object();
	newQuery.date = new Date().toString();
	newQuery.query = document.querySelector('#edtdeclaracao').value;
 
	var queries = new Array();
 
	if(localStorage.getItem(user.config.storageQueryKey)) {
		queries = JSON.parse(localStorage.getItem(user.config.storageQueryKey));
	}
 
	queries.push(newQuery);
	localStorage.setItem(user.config.storageQueryKey, JSON.stringify(queries));
};
 
function removeQueries () {
	if(confirm('Realmente gostaria de remover todas as queries?')) {
		localStorage.removeItem(user.config.storageQueryKey);
		toggleTable({'removeNodes': true});
		getQueries();
	}
};
 
function contentQuery(obj) { 
	var str = document.querySelector('#history').value;
	return obj.query.toUpperCase().contains(str.toUpperCase()); 
};
 
function setMessage(length, limit) { 
	var message = document.querySelector('#message');
	message.setAttribute('class', 'input-group-addon');
	message.textContent = length + ' registro(s) encontrado(s)';
 
	if(length <= limit && length > 0) {
		message.classList.add('alert-success');
	} 
	else if(length === 0) {
		message.classList.add('alert-danger');
	}
	else {
		message.classList.add('alert-warning');
		message.textContent = 'Mostrando ' + limit + ' de ' + length + ' encontrados. Seja mais específico.';
	}
};
 
function getQueries() {
 
	var queryStorage = localStorage.getItem(user.config.storageQueryKey);
	var limit = 20;
 
	if(queryStorage) {
		var queries = JSON.parse(queryStorage);
		var queryFiltered = queries.filter(contentQuery);
		queryFiltered.reverse().slice(limit * -1);
		showQueries(queryFiltered);
		setMessage(queryFiltered.length, limit);
	} 
	else {
		setMessage(0, limit);
	}
	showLocalStorageInfo();
};
 
function showLocalStorageInfo() {
	var queryStorage = localStorage.getItem(user.config.storageQueryKey) || '[]';
	var queryLength = JSON.parse(queryStorage).length;
	var info = document.querySelector('#local-storage-info');
	var exports = document.querySelector('#local-storage-download');
	var json = document.querySelector('#local-storage-json');
	var upload = document.querySelector('#local-storage-upload');
 
	if(queryLength > 0) {
		var quota = localStorage.quota(user.config.storageQueryKey);
		info.addEventListener('click',removeQueries);
		info.setAttribute('title', 'Remove todas (' + queryLength + ') queries salvas');
		info.innerHTML = '<span class="badge">' + quota.toFixed(2) + 'MB </span>';
		info.innerHTML += '<span class="glyphicon glyphicon-trash"></span>';
		
		var klass = 'btn-info';
		if(quota >= 3 && quota < 4) { klass = 'btn-warning'; }
		if(quota >= 4) { klass = 'btn-danger'; }
		info.setAttribute('class', 'btn btn-xs ' + klass);
 
		json.innerHTML = '<span class="glyphicon glyphicon-share"></span>';	 
		json.innerHTML += 'JSON';
		json.setAttribute('title', 'Gera arquivo JSON para upload das queries salvas');
		json.setAttribute('class', 'btn btn-default btn-xs');
		//Pay attention. File with extension .json on windowns the file.type is empty. So, save data-uri with extension .js
		json.setAttribute('download', 'query_simples_' + user.id + '.js');
		json.addEventListener('click', function () {
			exportQueries(json, queryStorage, 'JSON');
		});
 
		exports.innerHTML = '<span class="glyphicon glyphicon-save-file"></span>';	 
		exports.innerHTML += 'Exportar ' + queryLength + ' queries salvas';
		exports.setAttribute('title', 'Gera arquivo SQL com ' + queryLength + ' queries salvas');
		exports.setAttribute('class', 'btn btn-default btn-xs');
		exports.setAttribute('download', 'query_simples_' + Date.now() + '.sql');
		exports.addEventListener('click', function() {
			exportQueries(exports, queryStorage, 'sql');
		});
	} else {
		info.setAttribute('class', 'label label-info');
		info.textContent = 'Ops, ainda não há queries salvas!';
		info.removeEventListener('click', removeQueries, false);
		json.setAttribute('class', 'hide');
		exports.setAttribute('class', 'hide');
		toggleTable();
	}
};

function exportQueries(ele, queryStorage, format) {
	if(format === 'sql') {
		var data = JSON.parse(queryStorage).map(function(obj) {
				return '-- ' + obj.date + '\n' + obj.query + ';\n';
		}).join('\n');
		ele.setAttribute('href', 'data:text/sql;charset=utf-8,' + encodeURI(data));
	}
	
	if(format === 'JSON') {
		ele.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURI(localStorage[user.config.storageQueryKey]));
	}
 
	ele.addEventListener('mouseout', function() {
		this.removeAttribute('href');
	});
};
 
function showQueries(queryFiltered){
	document.querySelector('#result-history table').setAttribute('class', 'table table-striped table-bordered table-hover');
	var resultHistory = document.querySelector('#result-history table tbody');
	resultHistory.innerHTML = ''; // reset nodes from table
 
	for(var i = 0; i < queryFiltered.length; i++) {
		var item = document.createElement('tr');
 
		var date = document.createElement('td');
		date.textContent = queryFiltered[i].date;
		item.appendChild(date);
		
		var query = document.createElement('td');
		query.textContent = queryFiltered[i].query;
		item.appendChild(query)
 
		resultHistory.appendChild(item);
	}
	historyActions();
};
 
function addOnTextArea (text) {
	var textarea = document.querySelector('#edtdeclaracao');
	textarea.value = text;
	textarea.focus();
}

function uploadFile(){
	fileList = this.files;
	file = fileList[0]; // only one file, no multiple selection
 
	// check if file type is application/json. Pay attention. File with extension .json on windowns the file.type is empty. So, save data-uri with extension .js
	var fileType = /^application\/json$/;
  if (!fileType.test(file.type)) {
  	flash({
  					message: 'O Arquivo ' + file.name + ' do tipo ' + file.type + ' não é permitido. Esperado JSON File.',
  					class: 'alert alert-danger'
  				});
  	return false;
  }
 
  reader = new FileReader();
  reader.onload = function(e){
  	try {
	  	toStorage = JSON.parse(e.target.result);
	  	toStorage.forEach(function(obj) { 
	  		if(!("date" && "query" in obj)){
	  			throw new SyntaxError('Eram esperados os atributos date e query.');
	  		} 
	  	});
 
	  	var save = toStorage;
	  	if (user.config.storageQueryKey in localStorage) { 
	  		save = toStorage.concat(JSON.parse(localStorage[user.config.storageQueryKey])); 
			}
	  	
	  	localStorage.setItem(user.config.storageQueryKey, JSON.stringify(save));
	  	showLocalStorageInfo();
	  	
	  	flash(
	  				{
  						message: 'Arquivo ' + file.name + ' com ' + (file.size / 1024).toFixed(2) + 'KB carregado com sucesso',
  						class: 'alert alert-success'
  					}
  		);
	  }
	  catch(err) {
	  	console.error(err);
	  	flash(
	  					{
	  						message: 'Não foi possível carregar o arquivo ' + file.name + '. Erro: ' + err.message,
	  						class: 'alert alert-danger'
	  					}
	  	);
	  }
  };
 
  reader.readAsText(file);
};

function historyActions() {
	var table = document.querySelector('#result-history tbody');
 
	if(table.hasChildNodes()) {
		var tr = table.querySelectorAll('tr');
		
		[].forEach.call(tr, function(ele) {
 
			ele.firstChild.style.cursor = 'pointer';
			ele.firstChild.classList.add('warn-hover');
			ele.firstChild.title = 'Clique para remover esta query';
			ele.firstChild.addEventListener('click', function () {
				if(confirm('Remover esta query?')){
					removeQuery(this.textContent);
					getQueries();
				}
			});
 
		
			ele.lastChild.style.cursor = 'copy';
			ele.lastChild.classList.add('info-hover');
			ele.lastChild.title = 'Clique para copiar para área de edição';
			ele.lastChild.addEventListener('click', function() {
				addOnTextArea(this.textContent);
			});
		
		});
		
	}
}
 
function removeQuery(date) {
	var queryStorage = JSON.parse(localStorage.getItem(user.config.storageQueryKey));
	var queryFiltered = queryStorage.filter(function(obj) {
		return obj.date !== date;
	});
	localStorage.setItem(user.config.storageQueryKey, JSON.stringify(queryFiltered));
}

