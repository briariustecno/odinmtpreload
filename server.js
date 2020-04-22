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
    // let date = archger(req);
    // res.send(JSON.stringify(req.body))

    new Promise((res, rej) => {
        var result = archger(req.body);
        res(result)
    }).then((data) => {
        res.send(data);
    })
})

app.post('/download', ((req, res) => {
    var name = req.body.adress;
    console.log(name);
    let hpath =  SetNamePath(name);
    let path = 'C:\\Odin\\' + hpath;
    if (!fs.existsSync(dir)){
        //Efetua a criação do diretório
        fs.mkdir(dir, (err) => {
            if (err) {
                console.log("Deu ruim...");
                return
            }
    
            console.log("Diretório criado!")
        });
    }
    console.log(req.body.content)
    fs.writeFile(path, req.body.content,{enconding:'utf-8',flag: 'a'}, function(erro) {
        
        if(erro) {
            console.log(erro)
        } else {
            console.log("Arquivo salvo!");
            res.send('Arquivo Salvo!');
        }        
    }); 
}))

function archger(options) {
    var line = 'idpredio' + ';' + 'andar'+ ';' + 'apartamento' + ';' + 'casa;\r\n';
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