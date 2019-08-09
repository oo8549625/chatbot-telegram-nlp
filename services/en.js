const { NlpManager } = require('node-nlp');

module.exports = {
    name: 'en',
    settings: {
        filename: './nlp/en.nlp'
    },

    async created() {
        this.manager = new NlpManager({ languages: ['en'] });
        //hero
        this.manager.addNamedEntityText('hero', 'spiderman', ['en'], ['Spiderman', 'Spider-man']);
        this.manager.addNamedEntityText('hero', 'iron man', ['en'], ['iron man', 'iron-man']);
        this.manager.addNamedEntityText('hero', 'thor', ['en'], ['Thor']);
        //food
        this.manager.addNamedEntityText('food', 'burguer', ['en'], ['Burguer', 'Hamburguer']);
        this.manager.addNamedEntityText('food', 'pizza', ['en'], ['pizza']);
        this.manager.addNamedEntityText('food', 'pasta', ['en'], ['Pasta', 'spaghetti']);
        //who
        this.manager.addNamedEntityText('who', 'who', ['en'], ['am I', 'is he', 'is she', 'are you', 'are they']);


        //sawhero
        this.manager.addDocument('en', 'I saw %hero% eating %food%', 'sawhero');
        this.manager.addDocument('en', 'I have seen %hero%, he was eating %food%', 'sawhero');
        //wanteat
        this.manager.addDocument('en', 'I want to eat %food%', 'wanteat');
        //who
        this.manager.addDocument('en', 'who %who%', 'who');


        //sawhero
        this.manager.addAnswer('en', 'sawhero', '真的假的！')
        this.manager.addAnswer('en', 'sawhero', '在哪裡看見的？')
        //wanteat
        this.manager.addAnswer('en', 'wanteat', '肚子餓了！ ')
        //who
        this.manager.addAnswer('en', 'who', '瘋子！')
        this.manager.addAnswer('en', 'who', '不知道')

        await this.manager.train();
        this.manager.save(this.settings.filename);
    },

    started() {
        this.manager.load(this.settings.filename);
    },

    actions: {
        process(ctx) {
            let [text] = [
                ctx.params.text
            ]
            this.manager
                .process('en', text)
                .then(result => {
                    let msg = result.answer
                    this.broker.call('bot.replyMessage', { msg })
                });
        }
    }
}