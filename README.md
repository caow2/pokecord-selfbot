# pokecord-selfbot
Please note that selfbots are against Discord's TOS. This was mostly for educational purposes. <br>

Discord self bot utilizing Node.JS and discord.js to automate Pokecord text-spamming and pokemon catching (WIP).
The current implementation uses the discord.js API to fetch Pokecord bot's embedded messages. <br>
The 'Pokemon appeared' image data is taken as a blob object and converted to a byte64string. <br>
It will then take the byte64string and see if the byte64string has already been hashed/indexed in a JSON file.
The JSON array will serve as a HashMap where the key is a byte64string and the value is the pokemon's name.
<br> 
![alt text](https://github.com/caow2/pokecord-selfbot/blob/master/images/wild-pokemon.png)
<br>
Currently catching pokemon is unavailable due to an error when indexing pokemon into the JSON file.
