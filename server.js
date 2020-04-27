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
        const result = archger(req.body);
        console.log(result);
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
// req.body.id, req.body.andares, req.body.aptos, req.body.casas)
function archger(presets) {
    console.log(presets)
    if (presets.blocks == "") {
        presets.blocks = 1;
    }
    var line = 'idpredio;andar;apartamento;casa;\r\n';
    let id = parseInt(presets.id);
    let floors = parseInt(presets.andares);
    if (presets.aptos != "") {
        var apto = parseInt(presets.aptos);
    } else {
        var apto = parseInt(presets.casas);
    }
    
    for (b=0;b<parseInt(presets.blocks);b++) {   
        var apt = 0;
        var temp = 0;     
        for (i=0;i<floors;i++) {
            var flo = i+1;
            for (j=1;j<=apto;j++) {
                if(presets.count == true) {
                    let fib = flo * 100;
                    var apt = j + fib;
                } else {
                    apt = j + temp;
                }
                if (presets.aptos != "") {
                    line += id.toString() + ";" + ";" + apt + ";;\r\n";
                } else {
                    line += id.toString() + ";" + ";" + ";" + apt + ";\r\n";
                }
            }
            temp = apt;
        }
        id++;
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
        vpath = vpath.replace(')', '')
        vpath = vpath.replace('(', '')
        console.log(vpath);
    }
    return vpath + '.txt';
}

server.listen(port, function () {
    console.log('Servidor rodando na porta %d', port);
});