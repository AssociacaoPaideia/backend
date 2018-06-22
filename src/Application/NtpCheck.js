var ntpClient = require('ntp-client');

function getCurrentTime(server) {
    return new Promise(function(resolve, reject){ 
        ntpClient.getNetworkTime(server, 123, function(err, date) {
            if(err) {
                reject(err)
                return;
            }
        
            console.log("Current time : ");
            console.log(date); // Mon Jul 08 2013 21:31:31 GMT+0200 (Paris, Madrid (heure d’été))
            resolve(date)
        });
    });
}

export default {
    getCurrentTime: function() {
        return getCurrentTime("a.ntp.br")
    }
}