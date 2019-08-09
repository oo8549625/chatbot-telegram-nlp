const {ServiceBroker} = require('moleculer')

const broker = new ServiceBroker({
    logger: true,
    loglevel: 'info',

    cacher: 'Memory'
})

let [bot] = [
    require('./services/bot.js')
]

broker.createService(bot)

broker.start()