module.exports = {
  name: 'say',
  description: 'Make the bot say something (admin only)',
  async execute(message, args) {
    // Check if user is admin
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ You must be an admin to use this command.');
    }

    // If no message provided
    if (!args.length) {
      return message.reply('❌ Please provide a message for me to say.');
    }

    // Join args into a string
    const text = args.join(' ');

    // Delete the user's command message (optional)
    try {
      await message.delete();
    } catch (err) {
      console.error('Could not delete message:', err);
    }

    // Send the message
    message.channel.send(text);
  },
};
