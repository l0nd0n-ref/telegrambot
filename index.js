const TelegramApi = require('node-telegram-bot-api')

const token = 'YOUR_TELEGRAM_TOKEN_HERE'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}],
            [{text: '2', callback_data: '2'}],
            [{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}],
            [{text: '5', callback_data: '5'}],
            [{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}],
            [{text: '8', callback_data: '8'}],
            [{text: '9', callback_data: '9'}],
            [{text: '10', callback_data: '10'}]
        ]
    })
}

bot.setMyCommands([
    {command: '/start', description: 'Початок роботи з ботом'},
    {command: '/info', description: 'Дізнатися про себе'},
    {command: '/info_bot', description: 'Дізнатися про бота'},
    {command: '/game', description: 'Почати гру'}
])



const start = () => {
    bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp')
        return bot.sendMessage(chatId, 'Вітаю тебе у цьому Телеграм Боті! Якщо ти хочеш дізнатися більше про цього бота напиши /info_bot. Якщо ти хосеш двзнатися більше про себе напиши /info')
    }
    if (text === '/info') {
        return bot.sendMessage(chatId, 'Тебе Звати: ' + msg.from.first_name + ' ' + msg.from.last_name)
    }
   if (text === '/info_bot') {
    bot.sendMessage(chatId, 'Цей бот був ствовений на Node.Js, і він ще в розробці. Цей бот дасть змогу тобі допомогти в різних питаннях.')
   }
   if (text === 'Привіт') {
    await bot.sendMessage(chatId, 'Привіт!')
   }
   if (text === 'Як справи?') {
    await bot.sendMessage(chatId, 'Все добре, а у тебе?')
   }
   if (text === 'Дякую') {
    await bot.sendMessage(chatId, 'На здоров\'я!')
   }
   if (text === '/game') {
    await bot.sendMessage(chatId, 'Я загадав число від 1 до 10, вгадай його!', gameOptions)
    const randomNumber = Math.floor(Math.random() * 10) + 1; // Ensure range is 1-10
    chats[chatId] = randomNumber;
   }
    });
};

bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id

    // Acknowledge the callback query
    await bot.answerCallbackQuery(msg.id);

    if (Number(data) === chats[chatId]) {
        return bot.sendMessage(chatId, 'Ти вгадав число!')
    } else {
        return bot.sendMessage(chatId, 'Ти не вгадав число!' + ' Я загадав число: ' + chats[chatId])
    }
})  

start()
