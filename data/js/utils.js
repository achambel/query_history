function populate(len) {
	var arr = new Array();
	var storage = localStorage.getItem(user.config.storageQueryKey);
 
	if(storage){
		arr = JSON.parse(storage);
	}
 
	for(var i = 1; i <= len; i++) {
		var obj = new Object();
		obj.date = new Date();
		obj.query = 'select * from table_' + Date.now() + ' where id = ' + i;
		arr.push(obj);
	}
		try {
			localStorage.setItem(config.storageQueryKey, JSON.stringify(arr));
		}
		catch (err if err instanceof DOMException) {
			console.error(err);
			flash(
				{ message: err.message + ' Ops, não possível salvar sua query. \
										Libere mais espaço removendo algumas delas.',
					class: 'alert alert-danger'					
				}
			);
		}
};
 
function flash(options = {message: null, class: null}) {
	var target = document.querySelector('#flash-messages');
	target.setAttribute('class', options.class);
	target.textContent = options.message;
};

function welcomeDev() {
  var welcome = 'Welcome, developer! See the code of the Query History extension on github.\n\
Visit https://github.com/achambel/query_history\n\
Enjoy!!!\n\
--------------------------------------------------------------------------------------------\n\
QueryHistory  Query  Query     Query  QueryHistory  Query         QueryHistory  QueryHistory\n\
Q             Query  Query QUE Query  Query     ry  Query         Query         Q           \n\
QueryHistory  Query  Query  R  Query  QueryHistory  Query         QueryHistory  QueryHistory\n\
           y  Query  Query  Y  Query  Query         Query         Query                    y\n\
QueryHistory  Query  Query     Query  Query         QueryHistory  QueryHistory  QueryHistory\n\
--------------------------------------------------------------------------------------------\n\
';
  console.log(welcome);
}