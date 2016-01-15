// implements remove method on object type NodeList
// E.g. >> document.querySelectorAll('.active').remove();
// Remove all elements that contains active class
NodeList.prototype.remove = function() {
	[].forEach.call(this, function(obj) { obj.remove() });
};

// implements removeAttribute method on object type NodeList
// E.g. >> document.querySelectorAll('span').removeAttribute('style');
// Remove all styles attributes the elements span.
NodeList.prototype.removeAttribute = function(attr) {
	[].forEach.call(this, function(obj) { obj.removeAttribute(attr) });
};

// implements addEventListener method on object type NodeList
// E.g >> document.querySelectorAll('.btn-group a').addEventListener('click', function(){ this.classList.toggle('active') });
// Add/remove class active on element
NodeList.prototype.addEventListener = function(event, callback) {
	[].forEach.call(this, function(obj) { obj.addEventListener(event, callback) });
};

// implements removeClass method on object type NodeList
// E.g >> documento.querySelectorAll('a').removeClass('active');
// Remove all classes from element
NodeList.prototype.removeClass = function(klass) {
	[].forEach.call(this, function(obj) { obj.classList.remove(klass) });
};

// implements capitalize method on object String
// E.g >> 'adriano chambel'.capitalize(); // return 'Adriano Chambel'
// First letter from each word in uppercase

String.prototype.capitalize = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
};

// overwrite toString method from Date class
// E.g >> new Date().toString(); // return DD/MM/YYYY HH:MI:SS
Date.prototype.toString = function() {
	var date = new Date();
	var day = ('00' + date.getDate()).substr(-2, 2);
	var month = ('00' + date.getMonth() + 1).substr(-2, 2);
	var year = ('00' + date.getFullYear()).substr(-2, 2);
	var hours = ('00' + date.getHours()).substr(-2, 2);
	var minutes = ('00' + date.getMinutes()).substr(-2, 2);
	var seconds = ('00' + date.getSeconds()).substr(-2, 2);
	var milliseconds = ('000' + date.getMilliseconds()).substr(-3, 3);

	return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
};

// Return string length in MB from localStorage api
Storage.prototype.quota = function(k) {
	var storage = localStorage.getItem(k);
	if (storage) {
		return (storage.length / 1024 / 1024); // MB
	}
};
