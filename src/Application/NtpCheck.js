var ntpClient = require('ntp-client');

function getCurrentTime(server) {
    return new Promise(function(resolve, reject){ 
        ntpClient.getNetworkTime(server, 123, function(err, date) {
            if(err) {
                reject(err)
                return;
            }
        
            console.log("Current time : ");
            console.log(date);
            resolve(date)
        });
    });
}

export default {
    getCurrentTime: function() {
        return getCurrentTime("a.ntp.br")
    }
}