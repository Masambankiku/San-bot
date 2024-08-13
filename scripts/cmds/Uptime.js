module.exports = {
  config: {
    name: "upt",
    aliases: ["upt", "up"],
    version: "1.0",
    author: "Ronald",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "System",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString =`[🗓] = ${days} jours\n│ \n [🧘🏽‍♂] = ${hours} heures\n│  \n [⏳] = ${minutes} minutes\n│  \n [⏱] = ${seconds} secondes`;
    api.sendMessage(`╔════Durée════╗\n ${uptimeString}  \n╚════════════╝`, event.threadID);
  }
};
