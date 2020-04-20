var fs = require('fs');

module.exports = (adress) => {
    
}

function writeJson (passInfo) {
    var fs = require('fs');
    var data = JSON.stringify(passInfo)
    fs.writeFile('./js/data-search.json', data, function(err, result) {
        if(err) console.log('error', err);
    });
}

function list () {
    
}