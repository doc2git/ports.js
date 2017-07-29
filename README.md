## pServer.js
#### pServer.js通过module.export = ... 的方式暴露给外界一个函数；
#### 会作对传入的端口参数做扁平化处理；
#### 会将端口以对象形式写入ports.json中，以供前后台js共享；
#### 该插件可作为开发依赖安装
#### demo_server.js 是commonjs使用的例子;
```
let genPort = require('./pServer');
console.log(genPort(4003, {4442: 8723, a: 8832}, [4222, 8797]));;
```
#### 输出类似如下：
```
写入ports.json成功！
异步读取数据: [{"4003":4003,"4222":4222,"4442":8723,"8797":8797,"a":8832}]
```

#### demo_front.js 是浏览器中使用的例子;
```
<script src="./ports.json"></script>
<script>
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './ports.json', false);
    xhr.onload = function () {
        window.ports = JSON.parse(xhr.responseText);
    }
    xhr.send();
    console.log(ports);
</script>
```

#### 输出类似如下：
```
[Object]
0: Object
    4003: 4003
    4222: 4222
    4442: 8723
    8797: 8797
    a: 8832
  __proto__: Object
    length: 1
__proto__: Array(0)
```
