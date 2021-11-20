const { query } = require("../query");

module.exports = async function () {
    const data = await query(`{
        pages {
            title,
            content,
            slug,
        }
    }`);
    return { data: data.data.pages };
}
