module.exports = {
  name: 'status',
  description: 'Change the bot status. Usage: !status [online|idle|dnd] [status message]. Leave blank to reset to online.',
  async execute(message, args) {
    // Check if user is admin
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ You must be an admin to use this command.');
    }

    // If no args, reset to online with no activity
    if (args.length === 0) {
      await message.client.user.setPresence({ 
        status: 'online', 
        activities: [] 
      });
      return message.reply('✅ Status reset to **online** with no activity.');
    }

    // Parse status type from first arg
    const validStatuses = ['online', 'idle', 'dnd', 'invisible'];
    const status = args[0].toLowerCase();

    if (!validStatuses.includes(status)) {
      return message.reply(`❌ Invalid status. Valid options: ${validStatuses.join(', ')}`);
    }

    // Get the rest of the args as the activity message
    const activityMessage = args.slice(1).join(' ');

    // Prepare presence options
    const presenceData = {
      status: status,
      activities: [],
    };

    // If activity message is provided, set it as playing status
    if (activityMessage.length > 0) {
      presenceData.activities.push({ 
        name: activityMessage,
        type: 0 // Playing
      });
    }

    // Set the bot presence
    await message.client.user.setPresence(presenceData);

    message.reply(`✅ Status updated to **${status}**${activityMessage ? ` with activity: **${activityMessage}**` : ''}.`);
  },
};
