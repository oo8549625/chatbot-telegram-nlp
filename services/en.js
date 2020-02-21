const { NlpManager } = require('node-nlp');

module.exports = {
    name: 'en',
    settings: {
        filename: './nlp_data/en.nlp'
    },

    async created() {
        this.manager = new NlpManager({ languages: ['en'], nlu:{useNoneFeatures: false} });

        //food
        this.manager.addNamedEntityText('food', 'burguer', ['en'], ['Burguer', 'Hamburguer']);
        this.manager.addNamedEntityText('food', 'pizza', ['en'], ['pizza']);
        this.manager.addNamedEntityText('food', 'pasta', ['en'], ['Pasta', 'spaghetti']);
        //who
        this.manager.addNamedEntityText('who', 'who', ['en'], ['am I', 'is he', 'is she', 'are you', 'are they']);

        //wanteat
        this.manager.addDocument('en', 'I want to eat %food%', 'wanteat');
        //who
        this.manager.addDocument('en', 'who %who%', 'who');

        //wanteat
        this.manager.addAnswer('en', 'wanteat', '肚子餓了！ ')
        //who
        this.manager.addAnswer('en', 'who', '不知道')

        await this.manager.train();
        this.manager.save(this.settings.filename);
    },

    started() {
        this.manager.load(this.settings.filename);
    },

    actions: {
        process(ctx) {
            let [chatID, text] = [
                ctx.params.chatID,
                ctx.params.text
            ]
            this.manager
                .process('en', text)
                .then(result => {
                    let answer = result.answer
                    let unknowMsg = "抱歉, 我不能理解"
                    let msg = answer ? answer : unknowMsg
                    this.broker.call('bot.replyMessage', { chatID, msg })
                });
        }
    }
}
