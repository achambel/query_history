var app = { name: 'simples' };
var matr = document.querySelector('#edtuser').textContent;

var userDefaultConfig = {
      id: matr,
      config: {
        storageConfigKey: `${app.name}.config.${matr}`,
        storageQueryKey: `${app.name}.queries.${matr}`,
        saveQuery: true,
        textQueryStyle: { target: 'lowercase', targetStyle: 'lowercase' },
        textZoom: { target: 'font', size: null }
      }
};

var user = JSON.parse(localStorage.getItem(userDefaultConfig.config.storageConfigKey)) || userDefaultConfig;

function setUserConfig() {
  var saveQuery = document.querySelector('#saveOption');
  var textQueryStyle = document.querySelector('.text-transform.active');
  var textZoom = document.querySelector('#font');

  user.config.saveQuery = saveQuery.classList.contains('active');
  user.config.textQueryStyle = { target: textQueryStyle.id, targetStyle: textQueryStyle.id };
  user.config.textZoom = { target: 'font', size: textZoom.value };

  saveUserConfig();
}

function saveUserConfig() {
  localStorage.setItem(user.config.storageConfigKey, JSON.stringify(user));
}

function applyUserConfig() {
  if(user.config.saveQuery) {
    var save = document.querySelector('#saveOption');
    save.classList.add('active');
  }

  if(user.config.textQueryStyle.target) {
    document.querySelector('#'+user.config.textQueryStyle.target).classList.add('active');
    document.querySelector('#edtdeclaracao').style.textTransform = user.config.textQueryStyle.targetStyle;
  }

  if(user.config.textZoom.size) {
    var textZoom = document.querySelector('#'+user.config.textZoom.target);
    textZoom.value = user.config.textZoom.size;
    document.querySelector('#edtdeclaracao').style.fontSize = textZoom.value + '%';
  }
}
