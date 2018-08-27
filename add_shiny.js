var fs = require('fs');
var parse = require('csv-parse');

/** Append shiny pokemon names to csv -> just go through original and append Shiny in front */
fs.createReadStream('./pokemon.csv').pipe(
		parse({delimiter: ','})).on('data', async function(csvrow){
			console.log('shiny ' + csvrow[0]);
			fs.appendFileSync('pokemon.csv', ['shiny ' + csvrow[0] + ',\n']);
		}).on('end', async function() {
			console.log('Reached EOF');
		});