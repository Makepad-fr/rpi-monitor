var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
const os = require('os');

/**
* Function returns the current temperature of the device.
* @namespace getTemperature
* @return {Promise<number>} returns current device temperature on celcius
**/
async function getTemperature() {
    return new Promise((resolve, reject) => {
        let temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp']);
        temp.stdout.on('data', function(data) {
                resolve(data/1000);
        });
    });
}

const hostname = os.hostname();

/**
* Function returns the used memory percentage.
* @namespace getMemoryPercentage
* @param {type} var parameter description
* @return {double} returns the used memory pourcentage of the device
**/
function getMemoryPercentage() {
    return new Promise((resolve, reject) => {
	let temp = exec('free | grep -i "mem"', function(error, stdout, stderr) {
	    if (error) {
		reject(stderr.replace(/\n/g, ''));
	    } else {
		let response = stdout.replace(/\n/g,'').replace(/\s+/g,' ');
		const freeMem = parseInt(response.split(' ')[2]);
		const totalMem = parseInt(response.split(' ')[1]);
		resolve(freeMem/totalMem*100);
	    }
	});
    });
}

/**
* Function returns the cpu usage of the device.
* @namespace getCPUUsage
* @return {double[]} returns the CPU usage percentage as a double
**/
async function getCPUUsage() {
    return new Promise((resolve, reject) => {
        const startCPUIdle = os.cpus().map((core) => core.times.idle);
        var endCPUIdle;
        setTimeout(
            function () {
                endCPUIdle = os.cpus().map((core) => core.times.idle); 
                let idleDifference = endCPUIdle.map((value, index) => value - startCPUIdle[index]);
                idleDifference = idleDifference.map((idle) => (500 - idle)/500);
                resolve(idleDifference);
            },
            500
        );
    });
}


module.exports = {
    freeMemoryPercentage: getMemoryPercentage,
    hostname: hostname,
    temperature: getTemperature,
    cpuPercentage: getCPUUsage
};