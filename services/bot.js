const TelegramBot = require('node-telegram-bot-api')

module.exports = {
    name: 'bot',
    settings: {
        token: require('./info.json').token
    },

    created() {
        this.bot = new TelegramBot(this.settings.token, { polling: true })
    },

    started() {
        // Listen for any kind of message..
        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;

            // send a message to the chat acknowledging receipt of their message
            this.bot.sendMessage(chatId, 'Received your message');
        });
    }


}