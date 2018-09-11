const shared = require('./shared.js');

module.exports = function update(params){

    return shared.getApi()
        .then(function(api) {
            api.getLights()
                .then(function(lights) {
                    lights.forEach(function(light) {
                        var options = {
                            identifier: light.id,
                            service: 'hue'
                        };

                        gladys.device.getByIdentifier(options)
                            .then(function(device) {
                                search(device.id)
                                    .then(function(deviceTypes) {
                                        updateState(deviceTypes, device.state);
                                    })
                            })
                    })
                })
        })
};

function updateState(deviceTypes ,state){

    if (state.on){
        var valeur = '1';
        var luminosite = Math.round((state.bri)/2.54);
    }
    else {
        var valeur = '0';
    }

    deviceTypes.forEach(function(deviceType) {
        switch (deviceType.type){
            case 'binary':
                if(deviceType.lastValue !== parseInt(valeur)) {
                    gladys.deviceState.create({devicetype: deviceType.id, value: valeur});
                }
                break;
            case 'brightness':
                if (state.on){
                    if(deviceType.lastValue !== luminosite) {
                        gladys.deviceState.create({devicetype: deviceType.id, value: luminosite});
                    }
                }
                break;
            case 'hue':
                if (state.on && state.hasOwnProperty('hue')){
                    if(deviceType.lastValue !== state.hue) {
                        gladys.deviceState.create({devicetype: deviceType.id, value: state.hue});
                    }
                }
                break;
            case 'saturation':
                if (state.on && state.hasOwnProperty('sat')){
                    if(deviceType.lastValue !== state.sat) {
                        gladys.deviceState.create({devicetype: deviceType.id, value: state.sat});
                    }
                }
                break;
            default:
                break;
        }
    })
};

function search(id_lampe){

    var device = {
        id: id_lampe
      }
    
    return gladys.deviceType.getByDevice(device)
        .then(function(deviceTypes) {
            return deviceTypes
        });
};