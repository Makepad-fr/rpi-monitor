var spawn = require('child_process').spawn;

async function getTemperature() {
    return new Promise((resolve, reject) => {
	temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp']);
	temp.stdout.on('data', function(data) {
            resolve(data/1000);
	});
    });
}

getTemperature().then((temp) => {
    console.log(`Current temperature ${temp}`);
});

