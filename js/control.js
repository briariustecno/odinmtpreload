document.getElementById('btn-submit').addEventListener('click', redefineSubmit, false);

function redefineSubmit(evt) {
    evt.preventDefault();
    const data = {
        user : document.getElementById('first').value,
        adress : document.getElementById('second').value,
        id : document.getElementById('third').value,
        andares : document.getElementById('fourth').value,
        aptos : document.getElementById('fifth').value,
        casas : document.getElementById('sixth').value,
        obs : document.getElementById('seventh').value
    }

    checkForm(JSON.stringify(data));
}

function checkForm (sdata) {
    // console.log(sdata);
    var xhttp = new window.XMLHttpRequest();
    xhttp.open('POST', '/form_search', true); 
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = function() {
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
            var respost = xhttp.responseText;
            console.log(respost);
        }
    }
    xhttp.send(sdata);
}