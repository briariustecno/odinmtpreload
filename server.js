var express = require('./node_modules/express');
var app     = express();
var server  = require('http').createServer(app);
var port    = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var fs = require('fs');
const dir = "C:\\Odin"

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json())

app.post('/form_search', function (req, res) {
    new Promise((res, rej) => {
        var result = archger(req.body);
        res(result)
    }).then((data) => {
        res.send(data);
    })
})

app.post('/download', ((req, res) => {
    var name = req.body.adress;
    console.log(req.body);
    const path = SetNamePath(name);
    console.log(path);
    const rtn = {
        path: path,
        content: JSON.stringify(req.body.content)
    }
    res.send(rtn);
}))

function archger(options) {
    var line = 'idpredio;andar;apartamento;casa;\r\n';
    const id = options.id;
    let floors = parseInt(options.andares);
    let apto = parseInt(options.aptos);
    for (i=0;i<floors;i++) {
        var flo = i+1;
        for (j=1;j<=apto;j++) {
            let fib = flo * 100;
            let apt = j + fib;
            line += id + ";" + ";" + apt + ";;\r\n";
        }
    }
    return line;
}

function SetNamePath ( vpath ) {
    for (i=0;i<=vpath.length;i++) {
        vpath = vpath.replace(' ', '_')
        vpath = vpath.replace('.', '')
        vpath = vpath.replace(',', '')
        vpath = vpath.replace('ã', 'a')
        vpath = vpath.replace('Ã', 'A')
        console.log(vpath);
    }
    return vpath + '.txt';
}

server.listen(port, function () {
    console.log('Servidor rodando na porta %d', port);
  });