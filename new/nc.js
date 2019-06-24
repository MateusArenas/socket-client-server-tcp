(function(){
    "use strict";
    var net = require('net')
    ,server
    ,clients = {}
    ;//,client = '177.139.9.124 4000'

    function handleClient(client){
        var addr = client.remoteAddress
        , port = client.remotePort
        , name = addr + ':' + port
        ;
        console.log('[client joined]', name)

        clients[name] = client
        console.log(client)
        client.on('data', function(chunk){
            Object.keys(clients).forEach(function(name){
                var otherClient = clients[name]

                if(client === otherClient)
                    return

                otherClient.write(name + '> ' + chunk)
            });
            console.log(chunk.toString('utf8'))      
        });
        client.on('end', function(){
            client.write('GoodBye')
            console.log('[client left]', name)
            delete clients[name]
        })
    }
    function onListening(){
        console.log('Started listening on : ', server.address())
        
    }
    server = net.createServer(handleClient);
    server.on('error', function (e) {
        if (e.code == 'EADDRINUSE') {
          console.log('Endereço em uso, tentando novamente ......');
          setTimeout(function () {
            server.close();
            server.listen(onListening);
          }, 1000);
        }
      });

    var os = require( 'os' );
    const port = process.env.PORT;//seta uma porta qualquer sem uso

    var networkInterfaces = os.networkInterfaces( );
    console.log('pega o ip assim podendo estar no wifi,ethernet etc..')
    const myIp = networkInterfaces[Object.keys(networkInterfaces)[0]][0].address//pega o ip da maquina
    console.log( myIp );

    server.listen(port,myIp,onListening)
    
}());