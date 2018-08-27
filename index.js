var fetch = require("node-fetch");
const discord = require("discord.js");
var blobUtil = require("blob-util");

const TOKEN = ""; //client token
var num = 1;
var tgtrain = 15000;
const bot = new discord.Client();

function checkMessages(messages) {
	var msgs = messages.filter(m => m.author.id === '365975655608745985').array();	//pokecord bot id
	if(msgs.length == 0) {
		return;
	}
	var emsgs = msgs[0].embeds; //first elem is most recent one
	if(emsgs.length > 0 && emsgs[0].description === 'Guess the pokémon and type +catch <pokémon> to catch it!') { 
		/**
		var emsg = emsgs[0];
		var image = emsg.image;
		console.log(image.url);
		fetch(image.url).then(image => {return image.buffer()}).then(buffer => {
			console.log(buffer.toString('base64'));
		}).catch(console.error);
		**/
		console.log('*****************************\nPokemon Appeared\n*****************************');
	}
}

bot.on("ready", async ()=>{
	console.log("Ready!");
	var server = bot.guilds.find("id","")
	var channel = new discord.TextChannel(server, {"id":""});
	bot.setInterval(()=>
	{
		/**
		channel.send("trivia play").then(msg=>{
			console.log(msg.content);
		});
		channel.send("t.rivia");
		channel.send("B");
		channel.send(num);
		num = (num % 4) + 1;
		**/
		//fetch messages from pokecord bot
		channel.fetchMessages({limit: 8}).then(messages => checkMessages(messages)).catch(console.error);
		channel.send("A");
	}, 1000);

	
	bot.setInterval(()=>
	{
		channel.send("t!tg train");
		tgtrain = (tgtrain + 30000) % 60000;
	}, tgtrain);
})


bot.login(TOKEN);
