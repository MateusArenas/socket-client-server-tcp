const tcpUtils = require('./utils/tcp').tcp  ///ok
const ports = require('./constants')  //ok a principio
const fs = require('fs') //file system 


class Node{
    createServer(port,host,connectionCallback){
        return tcpUtils.createServer(port, host,connectionCallback)/*/nao entendi/*/
    }
}

const host = new Node();
console.log(host.createServer('127.0.0.1', '127.0.0.1'))

