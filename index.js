

module.exports = function(sails) {
    
    var search = require('./lib/search.js');
    var register = require('./lib/register.js');
    var exec = require('./lib/exec.js');
    var setup = require('./lib/setup.js');
    var init = require('./lib/init.js');
    var getScene = require('./lib/getScene.js');
    var activateScene = require('./lib/activateScene.js');
    var update = require('./lib/update.js');

    gladys.on('ready', function(){
        init();
    });

    return {
        search,
        register,
        exec,
        setup,
        getScene,
        activateScene,
        update

    };
};
