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


