const { SlashCommandBuilder } = require(`@discordjs/builders`);
const fs = require("fs");
const path = require('path');
const scriptName = path.basename(__filename);
const command = scriptName.slice(0, -3);
const file = `./texts/${command}.txt`;
const text = fs.readFileSync(file, "utf-8");
const array = text.split("\n")



function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}




module.exports = {
  
  data: new SlashCommandBuilder()
     .setName(`${command}`)
     .setDescription(`meeeoww??`),
  async execute(interation) {
    interation.reply({
      content: `${getRandomItem(array)}`,
      emphemral: true });
  },  
};