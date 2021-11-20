const { query } = require("../query");
const { Page } = require("../helpers");

module.exports = async function () {
    const data = await query(`{
        pages {
            title,
            content,
            slug,
        }
    }`);
    return {
        data: data.data.pages.map((item) => new Page(item)),
    };
}
