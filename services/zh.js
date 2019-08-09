const { NlpManager } = require('node-nlp');

module.exports = {
    name: 'zh',
    settings: {
        filename: './nlp/zh.nlp'
    },

    async created() {
        this.manager = new NlpManager({ languages: ['zh'] });


        //hero
        this.manager.addNamedEntityText('英雄', '蜘蛛人', ['zh'], ['蜘蛛人']);
        this.manager.addNamedEntityText('英雄', '鋼鐵人', ['zh'], ['鋼鐵人', '鋼鐵俠']);
        this.manager.addNamedEntityText('英雄', '索爾', ['zh'], ['索爾', '雷神索爾']);
        //food
        this.manager.addNamedEntityText('食物', '漢堡', ['zh'], ['漢堡']);
        this.manager.addNamedEntityText('食物', '披薩', ['zh'], ['披薩']);
        this.manager.addNamedEntityText('食物', '義大利麵', ['zh'], ['義大利麵']);
        //music
        this.manager.addNamedEntityText('音樂', '音樂', ['zh'], ['歌', '音樂']);


        //sawhero
        this.manager.addDocument('zh', '我看見 %英雄% 在吃 %食物%', '看見英雄');
        this.manager.addDocument('zh', '我有看見 %英雄%, 他正在吃 %食物%', '看見英雄');
        //wanteat
        this.manager.addDocument('zh', '我想去吃 %食物%', '想吃');
        //who
        this.manager.addDocument('zh', '我誰', '某人');
        this.manager.addDocument('zh', '你誰', '某人');
        //music
        this.manager.addDocument('zh', '播％音樂％', '音樂')
        

        //sawhero
        this.manager.addAnswer('zh', '看見英雄', '真的假的！')
        this.manager.addAnswer('zh', '看見英雄', '在哪裡看見的？')
        //wanteat
        this.manager.addAnswer('zh', '想吃', '肚子餓了！ ')
        //who
        this.manager.addAnswer('zh', '某人', '瘋子！')
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
            let [text] = [
                ctx.params.text
            ]
            this.manager
                .process('zh', text)
                .then(result => {
                    let msg = result.answer
                    this.broker.call('bot.replyMessage', { msg })
                });
        }
    }
}