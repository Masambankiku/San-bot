 const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100080355760429","100080355760429"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("𝗗é𝘀𝗼𝗹é 𝗦𝗮𝘂𝗳 𝗹𝗲 𝗕𝗼𝘀𝘀\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n  blåzė Nøvã \n  ●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n  𝗽𝗲𝘂𝘁 𝘂𝘁𝗶𝗹𝗶𝘀𝗲𝗿 𝗰𝗲𝘁𝘁𝗲 𝗖𝗠𝗗💀⁉", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝐟𝐢𝐜𝐡𝐢𝐞𝐫 𝐧𝐚𝐦𝐞 ✨", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`𝐝𝐞𝐬𝐬𝐨𝐥𝐞́ 𝐛𝐨𝐬𝐬 𝐣'𝐚𝐢 𝐩𝐚𝐬 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝 𝐞𝐧 𝐦𝐚 𝐩𝐨𝐬𝐬𝐞𝐬𝐬𝐢𝐨𝐧  [❌]: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
