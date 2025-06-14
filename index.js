require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.commands = new Map();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
}

// Path to status JSON file
const statusFile = path.join(__dirname, 'status.json');

// Load and apply saved status on startup
async function applySavedStatus() {
  if (!fs.existsSync(statusFile)) return;

  try {
    const presenceData = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
    if (presenceData && presenceData.status) {
      await client.user.setPresence(presenceData);
      console.log('✅ Applied saved status on startup.');
    }
  } catch (err) {
    console.error('❌ Failed to apply saved status:', err);
  }
}

const prefix = '!';

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
  await applySavedStatus();
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('❌ There was an error executing that command.');
  }
});

client.login(process.env.DISCORD_TOKEN);
