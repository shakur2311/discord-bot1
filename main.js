const { REST, Routes } = require('discord.js');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const main = ()=>{
    const commands = [
        {
          name: 'mari',
          description:'mari puta'
        },
        {
          name : 'boton',
          description: 'este es un boton'
        },
        {
          name: 'cumpleaños',
          description :'Agrega un cumpleaños'
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
}

module.exports = {main};