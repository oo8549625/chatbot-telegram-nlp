const { Language} = require('node-nlp')

module.exports = {
    name: 'nlp',

    created() {
        this.language = new Language()
    },

    started() {

    },

    actions:{
        guessLanguage(ctx){
            let [chatID, text]=[
                ctx.params.chat.id,
                ctx.params.text
            ]
            let msg = this.language.guessBest( text, ['zh','en'])
            if(msg.score > 0) this.broker.call(`${msg.alpha2}.process`, {text})
            //this.broker.call('bot.replyMessage', {chatID, msg})
        }
    },

    methods: {
    }
}