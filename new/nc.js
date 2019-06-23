(function(){
    "use strict";
    const port = process.env.PORT;
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
        client.on('data', function(chunk){
            Object.keys(clients).forEach(function(name){
                var otherClient = clients[name]

                if(client === otherClient)
                    return

                otherClient.write(name + '> ' + chunk)
            });
            //console.log(chunk.toString('utf8'))      
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
    server.listen(4000,'fe80::e820:5867:2b10:ca7b%10',onListening)
    
}());