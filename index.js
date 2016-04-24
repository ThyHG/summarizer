var self = require("sdk/self");

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var ui = require("sdk/ui");
var Style = require("sdk/stylesheet/style").Style;
var { attach, detach } = require('sdk/content/mod');

var style = Style({
  uri: './contentscreencss.css'
});

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Open Summarizer",
  icon: {
    "16": "./Summary_icon-16x16.png",
    "32": "./Summary_icon-32x32.png",
    "64": "./Summary_icon-64x64.png"
  },
  onClick: openSidebar
});

function openSidebar(state) {
  // var worker = tabs.activeTab.attach({
  //   contentScriptFile: self.data.url("datscript.js")
  // });
  // worker.port.on('selectText', function(text) {
  //   console.log(text)
  // });
  attach(style, tabs.activeTab);
  sidebar.show();
}

var sidebar = ui.Sidebar({
  id: 'my-sidebar',
  title: 'Summarizer',
  url: require("sdk/self").data.url("sidebar.html"),
  onAttach: function (worker) {
    //attach the script (datscript) to the contentpage
    var worker2 = tabs.activeTab.attach({
      contentScriptFile: self.data.url('datscript.js')
    });
    //Listen to the textselect from datscript
    worker2.port.on("selectText", function(text) {
      //Reroute the text selected to the sidebar html.
      worker.port.emit('textToSidebar', text)
    });
    // attach(style, tabs.activeTab);
  }
});
