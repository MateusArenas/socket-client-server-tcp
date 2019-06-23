(function(){
    "use strict";

    var net = require('net')
    ,socket
    ;//,client = '177.139.9.124 4000'
    const conf = {port:4000 , host:'fe80::e820:5867:2b10:ca7b%10'}
    

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