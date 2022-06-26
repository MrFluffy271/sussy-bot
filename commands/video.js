const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
  
  data: new SlashCommandBuilder()
     .setName(`duyuru`)
     .setDescription(`Duyuru Mesajı`)
     .addStringOption((message1) =>
        message1
        .setName("duyuru1")
          .setDescription("Videonun Duyuru Mesajı")
          .setRequired(true)
        )
      .addStringOption((message2) =>
        message2
        .setName("link")
          .setDescription("Videonun Linki")
          .setRequired(true)
        )
      .addStringOption((message3) =>
        message3
        .setName("duyuru2")
          .setDescription("Ek Duyuru(İsteğe Bağlı)")
          .setRequired(true)
        ),
      
  async execute(interaction) {
    interaction.reply({
      content: `${interaction.options.getString("duyuru1")}\n${interaction.options.getString("link")}\n${interaction.options.getString("duyuru2")}`,
      emphemral: true 
    });
  },  
};