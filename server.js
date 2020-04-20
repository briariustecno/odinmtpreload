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
    let date = req.body;
    console.log(date.one);

    let name = date.two;
    let hpath =  SetNamePath(name);
    let path = 'C:\\Odin\\' + hpath;
    console.log(path);
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
    fs.writeFile(path, date.one,{enconding:'utf-8',flag: 'a'}, function(erro) {

        if(erro) {
            console.log(erro)
        } else {
            console.log("Arquivo salvo!");
        }        
    }); 
})

app.get('/form_upload', function(req, res) {
    console.log("Heyman");
    const teste = fs.readFileSync("C:\\Odin\\geodata.json" , "utf8");
    const convert = JSON.parse(teste);
    const origin = objToArr(convert);
    // console.log(origin[0]);
    // var convertida = original.map(function(obj) {
    //     return Object.keys(obj).map(function(chave) {
    //         return obj[chave];
    //     });
    // });
})

app.get('/form_excel', function(req, res) {
    console.log("Heyman");
    const SheetOne = fs.readFileSync("C:\\Odin\\Plan1.csv" , "utf8");
    const SheetTwo = fs.readFileSync("C:\\Odin\\Plan2.csv" , "utf8");
    console.log(SheetTwo);
    // console.log(origin[0]);
    // var convertida = original.map(function(obj) {
    //     return Object.keys(obj).map(function(chave) {
    //         return obj[chave];
    //     });
    // });
})

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

function objToArr (obj) {
    const vetor = [];
    const path = 'C:\\Odin\\Gisplay_Audit.csv'
    for (key of Object.keys(obj)) {
        vetor.push([key, obj[key]])
    }
    
    var cons = "ID;X;Y;Data;Lat;Long;Tipo_de_Levantamento;" + 
    "Tipo_de_Logradouro;Tipo_de_Comercial;Nome_do_Condominio;Nome_Estab;" + 
    "Numero_Logradouro;Qtd_Blocos;Qtd_Andares;Qtd_Apto_Andar;" +
    "Qtd_Salas;HP_Total;Atendimento;" + "CSC;Alt_Esf;Tensão;Trafo;Travessia;HP;" +
    "Rua;Lado;Obs.;Node;\r\n";
    console.log(cons);
    for(i=0;i<vetor.length;i++) {
        let object = vetor[i];
        let key = object[0];
        let info = object[1];
        let id = i+1;
        let x = info.longitude, y = info.latitude;
        let tlevant = info.type, tlogr = info.typelogr;
        if (tlevant == "postes") {
            tlevant = "Poste"
        } else if (tlevant == "logradouros") {
            tlevant = "Logradouro";
        }
        if(tlevant == "" && tlogr == "Unidade(casa)") {
            tlevant = "Logradouro";
        }
        let first = id + ";" + x + ";" + y + ";;" + y + ";" + x + ";" + tlevant + ";" + tlogr + ";";
        let tcom = info.typecom, ncond = info.namecond, nestb = info.nameestb;
        let numl = info.number, qtdbl = info.qtdbl, qtdfl = info.qtdfl, apand = info.aptoand;
        let qtdsl = info.qtdsl, hp = "", atend = info.atend;
        let csc = info.csc, altesf = info.altesf, tensao = info.tensao;
        let trafo = info.trafo, trav = info.trav, chp = info.hp, rua = info.street;
        let lado = info.side, obs = info.obs, node = info.node;
        let second = tcom + ";" + ncond + ";" + nestb + ";" + numl + ";";
        let third = qtdbl + ";" + qtdfl + ";" + apand + ";" + qtdsl + ";";
        let fourth = hp + ";" + atend + ";" + csc + ";" + altesf + ";" + tensao + ";";
        let fifth = trafo + ";" + trav + ";" + chp + ";" + rua + ";" + lado + ";";
        let sixth = obs + ";" + node + ";";
        cons +=  first + second + third + fourth + fifth + sixth+ "\r\n";
    }
    console.log(cons)
    fs.writeFile(path, cons,{enconding:'utf-8',flag: 'a'}, function(erro) {

        if(erro) {
            console.log(erro)
        } else {
            console.log("Arquivo salvo!");
        }        
    }); 
}

function LoopSolution() {

}

server.listen(port, function () {
    console.log('Servidor rodando na porta %d', port);
  });