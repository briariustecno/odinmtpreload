document.getElementById('btn-submit').addEventListener('click', redefineSubmit, false);
document.getElementById('btn-download').addEventListener('click', redefineDownload, false);

var obj = {
    content: "",
    adress: ""
};

function redefineSubmit(evt) {
    evt.preventDefault();
    const data = {
        user : document.getElementById('first').value,
        adress : document.getElementById('second').value,
        id : document.getElementById('third').value,
        andares : document.getElementById('fourth').value,
        aptos : document.getElementById('fifth').value,
        casas : document.getElementById('sixth').value,
        obs : document.getElementById('seventh').value,
        count: document.getElementById('count_interval').value
    }

    console.log(data.count)
    obj.adress = data.adress;

    checkForm(JSON.stringify(data));
}

function redefineDownload (evt) {
    evt.preventDefault();
    download();
}

function checkForm (sdata) {
    // console.log(sdata);
    var xhttp = new window.XMLHttpRequest();
    xhttp.open('POST', '/form_search', true); 
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function() {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            var respost = xhttp.responseText;
            console.log('Pedido Realizado!');
            obj.content = respost;
            document.getElementById('btn-download').style.display = 'block';
       }
    }
    xhttp.send(sdata);
}

function download () {
    // console.log(sdata);
    var xhttp = new window.XMLHttpRequest();
    xhttp.open('POST', '/download', true); 
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function() {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            var respost = xhttp.responseText;
            console.log('Download!!');
            global_data = respost;
            document.getElementById('btn-download').style.display = 'none';
       }
    }
    xhttp.send(JSON.stringify(obj));
}