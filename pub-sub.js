const channels = ()=> {
    const channels = {}

    const subscribe = (channelName,callback) =>{
        const currentCbs = channels[channelName] || []
        currentCbs.push(callback)
        channels[channelName] = currentCbs
        console.log('sub ', channels)
    }
    //propaga as informações nos callbacks
    const publish = (channelName,message)=>{
        if(channels[channelName]) // se existe o canal
            channels[channelName].forEach(fn => fn(message))
        console.log('publish ',channels)
    }
    const unsubscribe = (channelName, callback)=>{
        const index = (channels[channelName] || []).indexOf(callback)//procura o index
        if(index>=0)
            console.log(channels[channelName].splice(index,1))
        console.log(index)
        console.log('unsub ', channels[channelName])
    }


    return {
        publish,
        subscribe,
        unsubscribe,//quando eu nao queira mais que uma função seja chamada em um channel
        listen: ()=> console.log('listen: escuta'),
        emit: ()=> console.log('emit: emite')//envia para mais de um canal
    }
}

const socket = channels();

const fn = message=>{//toda vez que é dado um subscribe no canal, temos que ver se esse canal existe dentro da lista de channels, 
    //se ele existi, é colocado a resposta , dentro de uma lista no canal
    console.log('message',message)
}
socket.subscribe('futebol', fn)

socket.unsubscribe('futebol',fn)

socket.subscribe('futebol', message=>{//toda vez que é dado um subscribe no canal, temos que ver se esse canal existe dentro da lista de channels, 
    //se ele existi, é colocado a resposta , dentro de uma lista no canal
    console.log('message', message)
})

socket.publish('futebol',{
    message: 'time a e time b'
})


