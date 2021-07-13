const cleanup = () => {

}

process.on('exit', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGILL', cleanup);
process.on('SIGTERM', cleanup);

module.exports = {

}
