const TelegramBot = require('node-telegram-bot-api')

module.exports = {
    name: 'bot',
    settings: {
        token: process.env.BOT_TOKEN || require('./info.json').token,
        name: process.env.BOT_NAME || require('./info.json').name
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
                ctx.params.chatID,
                ctx.params.msg
            ]
            let bot = this.bot
            //console.log(JSON.stringify(msg))
            bot.sendMessage(chatID, msg)
        }
    }

}