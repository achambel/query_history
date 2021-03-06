var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
  id: "query-history-simples",
  label: "Query History SIMPLES",
  icon: {
    "32": "./icon.png"
  },
  onChange: handleChange,
  onClick: openURL
});

var panel = panels.Panel({
  width: 500,
  height: 480,
  contentURL: self.data.url("panel.html"),
  onHide: handleHide
});


function openURL() {
  var tabs = require("sdk/tabs");
  var urlMatch = /portal\/simples/;

  for(let tab of tabs){
      if(urlMatch.test(tab.url.toLowerCase())){
        tab.activate();
        return;
      }
  }
}

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

// show panel after addon install
exports.main = function (options, callbacks) {
  if (options.loadReason == 'install') {
    button.click();
  }
};

// Import the page-mod API
 var pageMod = require("sdk/page-mod");
  // The script replaces the page contents
 pageMod.PageMod({
   include: /.*simples\/ExecucaoDireta.*/,
   contentStyleFile: [
              self.data.url("css/template.css"),
              self.data.url("css/vendor/codemirror/codemirror.css"),
              self.data.url("css/vendor/codemirror/show-hint.css")
   ],
   contentScriptFile: [
               self.data.url("js/vendor/codemirror/codemirror-compressed.js"),
               self.data.url("js/user.js"),
               self.data.url("js/utils.js"),
               self.data.url("js/prototypes.js"),
               self.data.url("js/storage.js"),
               self.data.url("js/pagemod.js"),
               self.data.url("js/sql.js"),
               self.data.url("js/events.js"),
               self.data.url("js/editor.js")
           ]
 });

