const eventSocket = require('./eventSocket')

const log = new (require('./logger'))('dbg-event-stream/eventSocket_test')

log.info('starting socket test')

let es = new eventSocket({ eventNames: ['VehicleDestroy'], worlds: ['1'] })

es.on('VehicleDestroy', (data) => {
	log.info('vd data', data)
})

es.on('heartbeat', (data) => {
	log.info('heartbeat', data)
})

setTimeout(() => { 
	es.stopListening() 
	log.info('called stop listening')
	process.exit(0)
}, 10000)

es.startListening()
log.info('called start listening')