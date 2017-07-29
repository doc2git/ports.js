/** let count = 0; setInterval(()=>{ count++ % 2 ? console.log("what is that ?") : console.log("How to ？");  }, 100); */
/**
 * 此文件为es5,es6,commonjs导出共用的端口，用法分别见demo_front.html和demo_server.js;
 */
(function () {
    function Ports(start, end) { //定义Ports类
        this.start = start;
        this.end = end;
    }

    Ports.prototype.assign = function (value) { //在Ports原型上添加默认的端口赋值方法
        this["p" + value] = value;
    };
    Ports.prototype.fill = function () { //在Ports原型上添加默认的初始化指定范围端口方法
        for (let i = this.start; i < this.end; i++) {
            this.assign(i);
        }
    }
    let p = new Ports(3000, 9999);
    p.fill();
    delete p.start;
    delete p.end;

    let hasExports = typeof module !== 'undefined' && module.exports;
    if (hasExports) {
        module.exports = p;
        return p;
    } else {
        window.ports = p;
        return p
    }
})();