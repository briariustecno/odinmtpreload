document.getElementById('btn-submit').addEventListener('click', redefineSubmit, false);
document.getElementById('btn-upload').addEventListener('click', redefineUpload, false);
document.getElementById('btn-excel').addEventListener('click', redefineExcel, false);

function redefineUpload(evt) {
    evt.preventDefault();
    getData();
}

function redefineExcel(evt) {
    evt.preventDefault();
    getExcel();
}

function redefineSubmit(evt) {
    evt.preventDefault();
    const data = {
        user : document.getElementById('first').value,
        adress : document.getElementById('second').value,
        idgroup : document.getElementById('third').value,
        qtdfloors : document.getElementById('fourth').value,
        qtdapto : document.getElementById('fifth').value,
        qtdhouse : document.getElementById('sixth').value,
        obs : document.getElementById('seventh').value
    }
    let cop = MakeLine(data);
    checkForm(cop, data.adress);
}

function MakeLine ( msg ) {
    var line = 'idpredio' + ';' + 'andar'+ ';' + 'apartamento' + ';' + 'casa;\r\n';
    const id = msg.idgroup;
    let floors = parseInt(msg.qtdfloors);
    let apto = parseInt(msg.qtdapto);
    for (i=0;i<floors;i++) {
        var flo = i+1;
        for (j=1;j<=apto;j++) {
            let fib = flo /* 100*/;
            let apt = j + fib;
            line += id + ";" + /*flo +*/ ";" + apt + ";;\r\n";
        }
    }
    return line;
}

function checkForm ( body, adr ) {
    let cfg = new Object;
    cfg.one = body;
    cfg.two = adr;
    var xhttp = new window.XMLHttpRequest();
    xhttp.open('POST', '/form_search', true); 
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange = function() {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            var respost = JSON.parse(xhttp.responseText);
            console.log(respost[0]);
        }
    }
    xhttp.send(JSON.stringify(cfg));
}

function getData() {
    var xhttp = new window.XMLHttpRequest();
    xhttp.open('GET', '/form_upload', true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange = function() {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            var respost = JSON.parse(xhttp.responseText);
            console.log("ok");
        }
    }
    xhttp.send();
}

function getExcel() {
    var xhttp = new window.XMLHttpRequest();
    xhttp.open('GET', '/form_excel', true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onreadystatechange = function() {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            var respost = JSON.parse(xhttp.responseText);
            console.log("ok");
        }
    }
    xhttp.send();
}