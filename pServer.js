/** setInterval(()=>{ let count = 0, wh; wh = count++ % 2 ? console.log("what is that ?") : console.log("How to ？"); }, 100); */
(function () {
    let flat = require('to-flat-obj');
    let fs = require('fs');
    let writeFile = (...arg) => {
        jsonStr = JSON.stringify(arg);
        fs.writeFile('./ports.json', jsonStr, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('写入ports.json成功！');
            fs.readFile('./ports.json', (err, data) => {
                if (err) {
                    return console.error(err);
                }
                console.log('异步读取数据: ' + data.toString());
            });
        });
    }
    let filterPort = (...arg) => {
        let ports = arg[0];
        let hasValidPort = false;
        for (var k in ports) {
            let isSuitPort = !isNaN(ports[k]);
            isSuitPort = isSuitPort && ports[k] >= 3000;
            isSuitPort = isSuitPort && ports[k] <= 9999;
            if (!isSuitPort) {
                delete ports[k];
            }
            hasValidPort = hasValidPort || isSuitPort;
        }
        if (!hasValidPort) {
            let filename = __filename.match(/([\w\._-]+)\.js$/)[1];
            ports = {};
            ports[filename] = 8080;
        }
        return ports;
        // writePortsJson(ports);
    }
    let genPortsJson = (...arg) => {
        let ports = flat(arg);
        ports = filterPort(ports);
        writeFile(ports);
        // console.log(42.);
    }
    // console.log(genPortsJson());
// console.log(genPortsJson(4444, [6323, 8888, "sdkfj"], {a: 1323, c: 4232, 8323: 6666, 'sdkfj': 'sdkfj'}, 'dkfj'));

    module.exports = genPortsJson;
})();
