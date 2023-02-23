const {main} = require('./main');
const {EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const cumpleanosModel = require('./Models/cumpleañosModel');
require('dotenv').config();

//variables
let contador = 0;
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

//funciones
const incremento = ()=>{
    contador = contador + 1;
}

main();




//Se crea la conexión de cliente con el discordbot
const { Client, GatewayIntentBits, ActionRowBuilder,ButtonBuilder,ButtonStyle,Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if(interaction.isChatInputCommand()){
    if(interaction.commandName === 'mari'){
        await interaction.reply("puta!");
    }else if(interaction.commandName === 'boton'){
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('botonClickeame')
					.setLabel('Dale click!')
					.setStyle(ButtonStyle.Primary),
		);
    
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Mari puta')
            .setURL('https://discord.js.org')
            .setDescription('Descripción de mariputa');

        await interaction.reply({content: 'Quizas deberias:', components: [row], embeds:[embed]});
    }else if(interaction.commandName === 'cumpleaños'){
        const modal = new ModalBuilder()
            .setCustomId('modalCumpleanos')
            .setTitle("Agregar Cumpleaños")
        //Agregando componentes al modal
        //Creando inputs
        const nombreInput = new TextInputBuilder()
            .setCustomId('nombreInput')
            .setLabel('Nombres')
            .setStyle(TextInputStyle.Short);
        const nickInput = new TextInputBuilder()
            .setCustomId('nickInput')
            .setLabel('Nick')
            .setStyle(TextInputStyle.Short);
        const fechaInput = new TextInputBuilder()
            .setCustomId('fechaInput')
            .setLabel('Cumpleaños')
            .setPlaceholder('Formato (dia-mes)')
            .setStyle(TextInputStyle.Short);
        //Creando action row por cada input
        const nombreInputActionRow = new ActionRowBuilder().addComponents(nombreInput);
        const nickInputActionRow = new ActionRowBuilder().addComponents(nickInput);
        const fechaInputActionRow = new ActionRowBuilder().addComponents(fechaInput);
        //Agregando ActionRows con los inputs dentro, al modal
        modal.addComponents(nombreInputActionRow,nickInputActionRow,fechaInputActionRow);
        await interaction.showModal(modal);

    }
  }else if(interaction.isButton()){
    if(interaction.customId==="botonClickeame"){
        incremento();
        await interaction.reply(contador.toString());
    }
  }else if(interaction.isModalSubmit()){
    if(interaction.customId === "modalCumpleanos"){
        const nombresInput = interaction.fields.getTextInputValue('nombreInput');
        const nickInput = interaction.fields.getTextInputValue('nickInput');
        const fechaInput = interaction.fields.getTextInputValue('fechaInput')
        
        /* interaction.fields.fields.clear(); */
        await cumpleanosModel.create(
            {nombreCumpleanos:nombresInput,
            nickCumpleanos:nickInput,
            fechaCumpleanos:fechaInput});
        console.log("Cumpleaños guardado!");
        
        const cumpleanosList = await cumpleanosModel.findAll();
        const cumpleanosListString = cumpleanosList.map((c,index)=> {
            return `${c.dataValues.nickCumpleanos} : ${c.dataValues.fechaCumpleanos}\n`
        }).toString().replaceAll(',','');


        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Cumpleaños registrados O4F')
        .setDescription(cumpleanosListString);
        await interaction.reply({content:"Datos guardados satisfactoriamente!",embeds:[embed]});
    }
  }
});

client.login(TOKEN);
