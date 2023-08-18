
const {writeFileSync} = require("fs");

module.exports = (msg) => {
    const date = new Date();
    const formatted_data = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}::\
${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    const data = `${formatted_data} ${msg}\n`;

    writeFileSync("./sql.log", data, {flag: "a"});
};

