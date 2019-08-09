const {ServiceBroker} = require('moleculer')

const broker = new ServiceBroker({
    logger: true,
    loglevel: 'info',

    cacher: 'Memory'
})

let [bot, nlp, en, zh] = [
    require('./services/bot.js'),
    require('./services/nlp.js'),
    require('./services/en.js'),
    require('./services/zh.js')
]

broker.createService(bot)
broker.createService(nlp)
broker.createService(en)
broker.createService(zh)


broker.start()