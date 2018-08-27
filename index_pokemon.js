var fetch = require("node-fetch");
const discord = require("discord.js");
var fs = require('fs');
var parse = require('csv-parse');

/**	Index pokemon into a JSON file; it will act as a hashmap where the byte64string for the blob data is the key and the name of pokemon
	is the value.
	Still WIP -> JavaScript Heap Memory Error due to byte64string being too large - find way to hash blob or byte64string to smaller representation.
	Consider image cropping or toning down resolution. */
const TOKEN = ""; 

const bot = new discord.Client();

var index = 766; //track which pokemon we're currently indexing
var pokemon = [];

var arr = undefined;
fs.readFile('mapping.json', function (err, data) {
	arr = JSON.parse(data);
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function appendToJSON(json_object) {
	if(index === 1061) {
		return;	//done
	}
	arr.push(json_object);

	fs.writeFile("mapping.json", JSON.stringify(arr, null, 2))
}

function checkMessagesAndJSONIFY(messages) {
	var msgs = messages.filter(m => m.author.id === '365975655608745985').array(); //pokecord bot id
	if(msgs.length == 0) {
		return;
	}
	var emsgs = msgs[0].embeds; //first elem is most recent one
	if(emsgs.length > 0 && emsgs[0].author.name === 'Professor Oak') {
		var emsg = emsgs[0];
		var image = emsg.image;
		fetch(image.url).then(image => { return image.buffer()}).then( buffer => {
			var base64str = buffer.toString('base64');
			//create JSON mapping for the pokemon
			let pkmn = {
				base64str : base64str,
				name : pokemon[index]
			};

			appendToJSON(pkmn);
			index++;	//put here to ensure only incremented after adding
			console.log("Added " + index + " out of " + pokemon.length + " pokemon.");
		}).catch(console.error);
	}
	/**if(emsgs.length > 0 && emsgs[0].description === 'Guess the pokémon and type +catch <pokémon> to catch it!') { 
		
		var emsg = emsgs[0];
		var image = emsg.image;
		console.log(image.url);
		fetch(image.url).then(image => {return image.buffer()}).then(buffer => {
			console.log(buffer.toString('base64'));
		}).catch(console.error);
		console.log('*****************************\nPokemon Appeared\n*****************************');
	}**/
}

bot.on("ready", async ()=>{
	console.log("READY");
	var server = bot.guilds.find("id","");
	var channel = new discord.TextChannel(server, {"id":""});

	fs.createReadStream('./pokemon.csv').pipe(
		parse({delimiter: ','})).on('data', async function(csvrow){
			console.log(csvrow[0]);
			pokemon.push(csvrow[0]);
		}).on('end', async function() {
			console.log('Reached EOF');
		});

	bot.setInterval(()=>
	{
		channel.send("+info " + pokemon[index]);
		channel.fetchMessages({limit: 3}).then(messages => checkMessagesAndJSONIFY(messages)).catch(console.error);
		//let fetchMessages take care of incrementing index after creating json
	}, 4000);
})

bot.login(TOKEN);
