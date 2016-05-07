let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {
  BrowserPolicy.content.allowOriginForAll('lorempixel.com');
  BrowserPolicy.content.allowOriginForAll('172.16.1.3:3000');
};

var _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;
