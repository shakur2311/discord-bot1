const { REST, Routes } = require('discord.js');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
/* const GUILD_ID = ''; */


const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'mari',
    description:'mari puta'
  },
  {
    name: 'prueba',
    description: 'comando prueba'
  },
  {
    name: 'prueba2',
    description: 'prueba2'
  }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);
//Con esto creo que esta leyendo la variable comandos que le pasamos con el parametro de client_id
//y lee los slash commands cada vez que se corre el bot, en busqueda de nuevos comandos
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

//Se crea la conexión de cliente con el discordbot
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'mari') {
    await interaction.reply('puta!');
  }else if(interaction.commandName === 'ping'){
    await interaction.reply('Pong!');
  }else if(interaction.commandName === 'prueba'){
    await interaction.reply('prueba1Respuesta');
  }else if(interaction.commandName === 'prueba2'){
    await interaction.reply('prueba2Respuesta');
  }
  
  
});

client.login(TOKEN);