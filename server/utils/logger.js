import bunyan from 'bunyan';

export default global.log = bunyan.createLogger({
    name: 'tntra-node-bootcamp',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        }
    ]
})
