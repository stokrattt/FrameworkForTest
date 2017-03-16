function main(){
    global.fiber = Fiber.current;
    console.log('вошли2');
    SFsleep(4);
    myEmitter.emit('event');
}

//==================================================================================================
module.exports = main;
