const fs = require('fs');
const path = require('path');

const statusFile = path.join(__dirname, '..', 'status.json'); // Use JSON file for status

module.exports = {
  name: 'status',
  description: 'Change the bot status. Usage: !status [online|idle|dnd|invisible] [activityType] [activity message]. Leave blank to reset to online.',
  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ You must be an admin to use this command.');
    }

    // Reset status if no args
    if (args.length === 0) {
      const presenceData = { status: 'online', activities: [] };
      try {
        await message.client.user.setPresence(presenceData);
        fs.writeFileSync(statusFile, JSON.stringify(presenceData, null, 2), 'utf8');
        return message.reply('✅ Status reset to **online** with no activity.');
      } catch (error) {
        console.error(error);
        return message.reply('❌ Failed to update status.');
      }
    }

    // Validate status (online/idle/dnd/invisible)
    const validStatuses = ['online', 'idle', 'dnd', 'invisible'];
    const status = args[0].toLowerCase();
    if (!validStatuses.includes(status)) {
      return message.reply(`❌ Invalid status. Valid options: ${validStatuses.join(', ')}`);
    }

    // Define valid activity types and their type codes
    const activityTypes = {
      playing: 0,
      streaming: 1,
      listening: 2,
      watching: 3,
      competing: 5
    };

    // If only one arg (status), treat as no activity
    if (args.length === 1) {
      const presenceData = { status, activities: [] };
      try {
        await message.client.user.setPresence(presenceData);
        fs.writeFileSync(statusFile, JSON.stringify(presenceData, null, 2), 'utf8');
        return message.reply(`✅ Status updated to **${status}** with no activity.`);
      } catch (error) {
        console.error(error);
        return message.reply('❌ Failed to update status.');
      }
    }

    // Parse activity type (second arg)
    const actTypeKey = args[1].toLowerCase();
    let typeCode = activityTypes.playing;
    let activityMessage = '';

    if (activityTypes.hasOwnProperty(actTypeKey)) {
      typeCode = activityTypes[actTypeKey];
      activityMessage = args.slice(2).join(' ');
    } else {
      // If no valid type provided, default to playing and treat rest as message
      activityMessage = args.slice(1).join(' ');
    }

    const presenceData = {
      status,
      activities: []
    };

    if (activityMessage) {
      presenceData.activities.push({
        name: activityMessage,
        type: typeCode
      });
    }

    try {
      await message.client.user.setPresence(presenceData);
      fs.writeFileSync(statusFile, JSON.stringify(presenceData, null, 2), 'utf8');
      const actLabel = Object.keys(activityTypes).find(k => activityTypes[k] === typeCode) || 'playing';
      message.reply(`✅ Status: **${status}**, Activity: **${actLabel} ${activityMessage}**`);
    } catch (error) {
      console.error(error);
      message.reply('❌ Failed to update status.');
    }
  },
};