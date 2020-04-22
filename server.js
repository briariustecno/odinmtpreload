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
    path = 'C:/Odin';
    dir = 'C:/Odin';
    // let date = archger(req);
    console.log(req.body);
    // res.send(JSON.stringify(req.body))

    new Promise((res, rej) => {
        var result = archger(req.body);
        res(result)
    }).then((data) => {
        res.send(data);
    })
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
    fs.writeFile(path, "teste",{enconding:'utf-8',flag: 'a'}, function(erro) {

        if(erro) {
            console.log(erro)
        } else {
            console.log("Arquivo salvo!");
            res(date);
        }        
    }); 
})

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
    var status = {
        data: line,
        status: 'acabou'
    }
    return status;
}

server.listen(port, function () {
    console.log('Servidor rodando na porta %d', port);
  });