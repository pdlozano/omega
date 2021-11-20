const { query } = require("../query");
const { Post } = require("../helpers");


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
    return {
        data: data.data.posts.map(post => new Post(post)),
        latest: data.data.posts.slice(0, 3),
    };
}
