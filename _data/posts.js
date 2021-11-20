const { query } = require("../query");

module.exports = async function () {
    const today = new Date().toISOString();
    const data = await query(`{
        posts(where: {publishDate_lte: "${today}"}, orderBy: publishDate_DESC) {
            title,
            publishDate,
            excerpt,
            featuredImageAltText,
            content,
            slug,
        }
    }`);
    return { data: data.data.posts };
}
