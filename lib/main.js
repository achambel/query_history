var urlSimples = "http://10.200.35.7/portal/simples/ExecucaoDireta.aspx";

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
  height: 385,
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
  tabs.open(urlSimples);
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


// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: urlSimples,
  contentStyleFile: self.data.url("css/template.css"),
  contentScriptFile: [
              self.data.url("js/user.js"),
              self.data.url("js/utils.js"),
              self.data.url("js/prototypes.js"),
              self.data.url("js/storage.js"),
              self.data.url("js/pagemod.js"),
              self.data.url("js/events.js")
					]
});

//var tabs = require("sdk/tabs");
//tabs.open({url: urlSimples});