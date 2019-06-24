(function(){
    "use strict";

    var net = require('net')
    ,socket
    ;//,client = '177.139.9.124 4000'
    const conf = {port:53456 , host:'fe80::fda8:40b2:eb71:de14'}
    

socket = net.connect(conf,()=>{
    console.log('Addreess M : ',socket.remoteAddress)
    console.log('port M : ',socket.remotePort)
})
socket.on('connect',function(){
    console.log('connect to the server')
})
socket.on('data',function(chunk){
    console.log(chunk)
})
socket.on('end',function(){
    console.log('server hung up')
})

    
}());