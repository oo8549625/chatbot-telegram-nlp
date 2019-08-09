const TelegramBot = require('node-telegram-bot-api')

module.exports = {
    name: 'bot',
    settings: {
        token: require('./info.json').token,
        name: require('./info.json').name
    },

    created() {
        this.bot = new TelegramBot(this.settings.token, { polling: true })
    },

    started() {
        // Listen for any kind of message..
        this.bot.on('message', (msg) => {  
            this.broker.call('nlp.guessLanguage', msg)
        });
    },

    actions:{
        replyMessage(ctx){
            let[chatID, msg]=[
                ctx.params.chatID||818712881,
                ctx.params.msg
            ]
            let bot = this.bot
            //console.log(JSON.stringify(msg))
            bot.sendMessage(chatID, msg)
        }
    }

}