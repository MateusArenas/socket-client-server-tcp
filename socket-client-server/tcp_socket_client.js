// Import net module.
var net = require('net');

// Essa função cria e retorna um objeto net.Socket para representar o cliente TCP. 
function getConn(connName){

    var option = {
        host:'localhost',
        port: 9999
    }

    // Cria o cliente TCP. 
    var client = net.createConnection(option, function () {
        console.log('Nome da conexão:' + connName);
        console.log('Endereço local da conexão: ' + client.localAddress + ":" + client.localPort);
        console.log('Endereço remoto da conexão:' + client.remoteAddress + ":" + client.remotePort);
    });

    client.setTimeout(1000);
    client.setEncoding('utf8');

    // Quando receber o servidor, envie os dados. 
    client.on('data', function (data) {
        console.log('Server return data : ' + data);
    });

    // Quando a conexão é desconectada. 
    client.on('end',function () {
        console.log('Client socket disconnect. ');
    });

    client.on('timeout', function () {
        console.log('Client connection timeout. ');
    });

    client.on('error', function (err) {
        console.error(JSON.stringify(err));
    });

    return client;
}

// Cria um soquete do cliente java. 
var javaClient = getConn('Java');

// Cria o soquete do cliente do nó.
var nodeClient = getConn('Node');

javaClient.write('Java é a melhor linguagem de programação.');

nodeClient.write('Node é mais melhor que java.');