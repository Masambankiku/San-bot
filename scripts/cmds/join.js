const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "join",
    version: "2.0",
    author: "Blåzė Nøvã",
    countDown: 5,
    role: 2,
    shortDescription: "Join the group that bot is in",
    longDescription: "",
    category: "user",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const groupList = await api.getThreadList(10, null, ['INBOX']);

      const filteredList = groupList.filter(group => group.threadName !== null);

      if (filteredList.length === 0) {
        api.sendMessage('No group chats found.', event.threadID);
      } else {
        const formattedList = filteredList.map((group, index) =>
          `│${index + 1}. ${group.threadName}\n│𝐓𝐈𝐃: ${group.threadID}`
        );
        const message = `╭─╮\n│𝐋𝐢𝐬𝐭 𝐨𝐟 𝐠𝐫𝐨𝐮𝐩 𝐜𝐡𝐚𝐭𝐬:\n${formattedList.map(line => `${line}`).join("\n")}\n╰───────────ꔪ`;

        const sentMessage = await api.sendMessage(message, event.threadID);
        global.GoatBot.onReply.set(sentMessage.messageID, {
          commandName: 'join',
          messageID: sentMessage.messageID,
          author: event.senderID,
        });
      }
    } catch (error) {
      console.error("Error listing group chats", error);
    }
  },

  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName } = Reply;

    if (event.senderID !== author) {
      return;
    }

    const groupIndex = parseInt(args[0], 10);

    if (isNaN(groupIndex) || groupIndex <= 0) {
      api.sendMessage('Invalid input.\nPlease provide a valid number.', event.threadID, event.messageID);
      return;
    }

    try {
      const groupList = await api.getThreadList(10, null, ['INBOX']);
      const filteredList = groupList.filter(group => group.threadName !== null);

      if (groupIndex > filteredList.length) {
        api.sendMessage('Invalid group number.\nPlease choose a number within the range.', event.threadID, event.messageID);
        return;
      }

      const selectedGroup = filteredList[groupIndex - 1];
      const groupID = selectedGroup.threadID;

      await api.addUserToGroup(event.senderID, groupID);
      api.sendMessage(`✅ │𝗕𝗼𝘀𝘀 𝗷𝗲 𝘁'𝗮𝗶 𝗱𝗲́𝗷𝗮̀ 𝗮𝗷𝗼𝘂𝘁𝗲𝗿 𝗱𝗮𝗻𝘀 𝗹𝗲 𝗴𝗿𝗼𝘂𝗽𝗲\n══════════════════\n: ${selectedGroup.threadName} \n══════════════════\n 𝗮𝘃𝗲𝗰 𝘀𝘂𝗰𝗰𝗲̀𝘀𝘀 🟢`, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error joining group chat", error);
      api.sendMessage('❌ 𝗝𝗲 𝗻'𝗮𝗶 𝗽𝗮𝘀 𝗿𝗲́𝘂𝘀𝘀𝗶𝘁 𝗮̀ 𝘁'𝗮𝗷𝗼𝘂𝘁𝗲𝗿 𝗱𝗮𝗻𝘀 𝗹𝗲 𝗴𝗿𝗼𝘂𝗽𝗲 .', event.threadID, event.messageID);
    } finally {
      global.GoatBot.onReply.delete(event.messageID);
    }
  },
};
