
const os = require('os');

module.exports = {
  systemInfo:function(){

  let architecture = os.arch();

  let hostname = os.hostname();

  let type = os.type();

  console.log(`Operating System Info: CPU architecture: ${architecture} Host-Name: ${hostname} OS Type: ${type}`)

  },

  userInfo:function(){

  let uname = os.userInfo().username;

  let homedirectory = os.userInfo().homedir;

  console.log(`Usere Info: Username: ${uname} HomeDirectory:${homedirectory}`);

  }

}
