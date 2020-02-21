const { NlpManager } = require('node-nlp');

module.exports = {
    name: 'zh',
    settings: {
        filename: './nlp_data/zh.nlp'
    },

    async created() {
        this.manager = new NlpManager({languages: ['zh'], threshold: 0.8, nlu:{useNoneFeatures: false}});


        //food
        this.manager.addNamedEntityText('食物', '漢堡', ['zh'], ['漢堡']);
        this.manager.addNamedEntityText('食物', '披薩', ['zh'], ['披薩']);
        this.manager.addNamedEntityText('食物', '義大利麵', ['zh'], ['義大利麵']);
        //music
        this.manager.addNamedEntityText('音樂', '音樂', ['zh'], ['歌', '音樂']);



        //wanteat
        this.manager.addDocument('zh', '我想去吃 %食物%', '想吃');
        //who
        this.manager.addDocument('zh', '我誰', '某人');
        this.manager.addDocument('zh', '你誰', '某人');
        //music
        this.manager.addDocument('zh', '播％音樂％', '音樂')
        


        //wanteat
        this.manager.addAnswer('zh', '想吃', '肚子餓了！ ')
        //who
        this.manager.addAnswer('zh', '謀人', '不知道')
        //music
        this.manager.addAnswer('zh', '音樂', '已播放！')
        this.manager.addAnswer('zh', '音樂', '開播！')

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
                .process('zh', text)
                .then(result => {
                    let answer = result.answer
                    let unknowMsg = "抱歉, 我不能理解"
                    let msg = answer ? answer : unknowMsg
                    this.broker.call('bot.replyMessage', { chatID, msg })
                });
        }
    }
}
