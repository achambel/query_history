function tasks(opt) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'document';
    xhr.open(opt.method, opt.url);

    xhr.onload = function() {
      if(xhr.status === 200) {
        resolve(xhr.response);
      }
      else {
        reject(Error(`Request failed! Error code: ${xhr.statusText}`));
      }
    }

    xhr.onerror = function() {
      reject(Error('There was a network error.'));
    }

    xhr.send(opt.data);
  });

}


function getChamado(opt) {

  tasks(opt).then(function(response) {
    var formData = new FormData();
    var hiddens = response.querySelectorAll('input[type=hidden]');

    for(let i = 0; i < hiddens.length; i++) {
      formData.append(hiddens[i].name, hiddens[i].value);
    }

    formData.append('edtchamado', opt.chamado);
    formData.append('edtAtualizar', 'Atualizar');

    opt.data = formData;

    resultChamado(opt);

  }, function(Error) {
    console.log(Error);
  });

}

function resultChamado(opt) {
  tasks(opt).then(function(response){

      var element = response.querySelectorAll('#GridAgendamento td');

      var data = {
        number: parseInt(element[1].textContent.trim()) || opt.chamado,
        description: element[2].textContent.trim(),
        date: element[3].textContent.trim(),
        success: element[4].textContent.trim(),
        server: element[5].textContent.trim(),
        instance: element[6].textContent.trim(),
        database: element[7].textContent.trim()
      }

      updateOnModalTable(data);

  }, function(Error) {
      console.log(Error);
  });
}
