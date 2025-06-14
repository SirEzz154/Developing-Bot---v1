const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'embed',
  description: 'Create a full embed. Usage: !embed "Title" "Description" "Color" "Footer" "Author" "Thumbnail URL" "Image URL" "timestamp"',
  async execute(message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('❌ You must be an admin to use this command.');
    }

    const regex = /"([^"]*?)"/g;
    const matches = [...message.content.matchAll(regex)].map(m => m[1]);

    if (matches.length < 8) {
      return message.reply('❌ Usage: !embed "Title" "Description" "Color" "Footer" "Author" "Thumbnail URL" "Image URL" "timestamp"');
    }

    const [title, description, color, footer, author, thumbnail, image, timestamp] = matches;

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color.replace('#', ''))
      .setFooter({ text: footer, iconURL: message.author.displayAvatarURL() })
      .setAuthor({ name: author, iconURL: message.author.displayAvatarURL() })
      .setThumbnail(thumbnail)
      .setImage(image);

    if (timestamp.toLowerCase() === 'timestamp') {
      embed.setTimestamp();
    }

    message.channel.send({ embeds: [embed] });
  },
};
