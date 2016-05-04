// set font size from range
document.querySelector('#font').addEventListener('input', function(){
	setUserConfig();
	applyUserConfig();
});

// set clicked effect
document.querySelector('#saveOption').addEventListener('click', function(){
	this.classList.toggle('active') ;
	setUserConfig();
});

// set text-transform style
document.querySelectorAll('.text-transform').addEventListener('click', function(){
	document.querySelectorAll('.text-transform').removeClass('active');
	this.classList.add('active');
	setTextTransform(this);
	setUserConfig();
});

// implements in storage.js
document.querySelector('#btnExecutar').addEventListener('click', isSaveQuery);

// show/hide datatable
document.querySelector('#toggle-table').addEventListener('click', toggleTable);

// no submit form search history
document.querySelector('#submit-search').addEventListener('submit', function(e) {
	getQueries();
	e.preventDefault();
});

// export as dml insert
document.querySelector('#exportar-insert').addEventListener('click', exportInsert);

// upload json button
document.querySelector('#local-storage-upload').addEventListener('click', function(){
	document.querySelector('#upload').click();
});

// start upload action after file selection
document.querySelector('#upload').addEventListener('change', uploadFile);

document.querySelector('#flash-messages').addEventListener('click', function() { this.classList.add('hide') });

window.addEventListener('resize', function () {
  if((window.outerHeight - window.innerHeight) > 100) {
  		//console.clear();
    	welcomeDev();
   }
});

function setTextTransform(ele) {
	var target = document.querySelector('#edtdeclaracao');

	if(ele.id === 'capitalize') {
		target.style.textTransform = ele.id;
		target.value = target.value.capitalize();
	} else if(ele.id === 'uppercase') {
		target.style.textTransform = ele.id;
		target.value = target.value.toUpperCase();
	} else if(ele.id === 'lowercase') {
		target.style.textTransform = ele.id;
		target.value = target.value.toLowerCase();
	}
	else {
		target.style.textTransform = 'none';
	}

};


function toggleTable(options = {}) {
	var target = document.querySelector('#result-history table');
	target.classList.toggle('hidden');
 	document.querySelector('#history').focus();

	if(options.removeNodes) {
		target.removeAttribute('class');
		target.querySelector('tbody').innerHTML = ''; // reset all data tables
	}
};

// submit query when pressed <ctrl>+<enter>
document.addEventListener('keydown', function(e){
	if(e.ctrlKey && e.keyCode == 13) {
		document.querySelector('#btnExecutar').click();
	}
});


document.querySelectorAll('a.vertical-grid').addEventListener('click', function() {
	var th = document.querySelectorAll('#GridResultado th');
  var modalTable = document.querySelector('#verticalGridModalTable tbody');
  modalTable.innerHTML = '';

  for(let i = 0; i < th.length; i++) {
    var tr = document.createElement('tr');

    var columnName = document.createElement('td');
    columnName.innerHTML = `<strong>${th[i].textContent}</strong>`;

    tr.appendChild(columnName);

    var columnValue = document.createElement('td');
    columnValue.textContent = this.parentElement.parentElement.children[i].textContent;

    tr.appendChild(columnValue);

    modalTable.appendChild(tr);
  }
});

/** waiting for definitions
document.querySelector('#modalForm').addEventListener('submit', function(e) {
	e.preventDefault();
	var modalInput = document.querySelector('#modalInput');
	var chamado = new Chamado(modalInput.value.trim());

	modalInput.value = '';
	pushOnModalTable(chamado);
});



var stack = [];

function pushOnModalTable(chamado = {}) {

	if (stack.includes(chamado.number)) {
		return false;
	}

	var modalTable = document.querySelector('#modalTable tbody');
	var tr = document.createElement('tr');

	for(key in chamado) {
		var td = document.createElement('td');
		td.textContent = chamado[key];
		tr.appendChild(td);
	}

	var btn = document.createElement('button');
	btn.setAttribute('class', 'removeChamado btn btn-danger btn-sm');
	btn.addEventListener('click', function() {
		var line = this.parentElement.parentElement;
		line.remove();
		removeFromStack(line.firstChild.textContent);
	});

	var span = document.createElement('span');
	span.setAttribute('class', 'glyphicon glyphicon-trash');

	btn.appendChild(span);
	var td = document.createElement('td');
	td.appendChild(btn);
	tr.appendChild(td);

	modalTable.insertBefore(tr, modalTable.firstChild);

	stack.push(chamado.number);
}

function removeFromStack(item) {
	var index = stack.indexOf(item.toString());
	stack.splice(index, 1);
}

function updateOnModalTable(chamado) {
	var trs = document.querySelectorAll('#modalTable tbody tr');
	var tr;

	for(let i = 0; i < trs.length; i++) {

		if(trs[i].children[0].textContent == chamado.number) {
			tr = trs[i];
			tr.children[1].textContent = chamado.description;
			tr.children[2].textContent = chamado.date;
			tr.children[3].textContent = chamado.success;
			tr.children[4].textContent = chamado.server;
			tr.children[5].textContent = chamado.instance;
			tr.children[6].textContent = chamado.database;
			formatModalLine(tr, chamado);
			break;
		}

	}
}

function formatModalLine(element, chamado) {
	switch(chamado.success) {
		case 'S':
			element.classList.add('success');
			removeFromStack(chamado.number);
			showNotification(chamado);
			break;
		case 'N':
			element.classList.add('danger');
			removeFromStack(chamado.number);
			showNotification(chamado);
			break;
		default:
			element.classList.add('warning');
	}
}

var requestChamados = setInterval(function() {

	var opt = { method: 'POST', url: 'Tarefasexecutadas.aspx', chamado: null };

	for(let i = 0; i < stack.length; i++) {
		opt.chamado = stack[i];
		getChamado(opt);
	}


}, 30000);


Notification.requestPermission(function (permission) {
  console.log(permission);
});

function showNotification(chamado) {
	var notification = new Notification(`Chamado ${chamado.number} foi concluído`,
		{
			body: `Executado às ${chamado.date} com ` + (chamado.success == 'S' ? 'SUCESSO' : 'ERRO'),
			icon: atob('L3BvcnRhbC9zaW1wbGVzL0ltYWdlcy9Qcm9kZXNwX2JyYW5jby5KUEc='),
			lang: 'pt-BR'
		}
	);

	notification.onclick = function() {
		window.focus();
	}
}
*/

