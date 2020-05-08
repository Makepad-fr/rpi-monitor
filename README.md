# @makepad/rpi-monitor

A basic Raspberry Pi monitoring functions

## Installation

Use the package manager `npm` to install `@makepad/rpi-monitor`

```javascript
npm i @makepad/rpi-monitor
```

## Usage

```javascript
const rpi = require('@makepad/rpi-monitor');

rpi.hostname; // Returns the hostname of the machine
rpi.freeMemoryPercentage().then((result) => {
    // Returns the free memory percentage
});
rpi.cpuPercentage().then((result) => {
    // Returns the CPU percentage as a list for each core
});
rpi.temperature(); // Returns the temperature of the device
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.