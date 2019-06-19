// Import net module.
var net = require('net');

// Cria e retorna um objeto net.Server, a função será invocada quando o cliente se conectar a este servidor.
var server = net.createServer(function(client) {

    console.log('Conexão do cliente. Endereço local do cliente:' + client.localAddress + ':' + client.localPort + '. endereço remoto do cliente:' + client.remoteAddress + ':' + client.remotePort);

    client.setEncoding('utf-8');

    client.setTimeout(1000);

   // Quando receber dados do cliente.
    client.on('data', function (data) {

        // Print dados e comprimento do cliente recebidos.
        console.log('Receber dados de envio do cliente: ' + data + ', tamanho dos dados: ' + client.bytesRead);

        // Servidor envia dados de volta para o cliente use o objeto net.Socket do cliente. 
        client.end('Servidor recebido dados: ' + data + ', envie de volta para o tamanho dos dados do cliente: ' + client.bytesWritten);
    });

    // Quando o cliente envia dados completos. 
    client.on('end', function () {
        console.log('Desconexão do cliente.');

        // Obtém a contagem de conexões atuais. 
        server.getConnections(function (err, count) {
            if(!err)
            {
                // Imprimir contagem de conexões atual no console do servidor 
                console.log("Existem %d conexões agora. ", count);
            }else
            {
                console.error(JSON.stringify(err));
            }

        });
    });

    // Quando o tempo limite do cliente. 
    client.on('timeout', function () {
        console.log('Tempo limite da requisição do cliente');
    })
});

// Tornar o servidor um servidor TCP escutando na porta 9999.
server.listen(9999, function () {

    // Obter informações de endereço do servidor. 
    var serverInfo = server.address();

    var serverInfoJson = JSON.stringify(serverInfo);

    console.log('TCP server listen no endereço: ' + serverInfoJson);

    server.on('close', function () {
        console.log('socket do servidor TCP está fechado.');
    });

    server.on('error', function (error) {
        console.error(JSON.stringify(error));
    });

});