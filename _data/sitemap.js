const pages = require("./pages");
const posts = require("./posts");

module.exports = async function() {
    const pageData = await pages();
    const postData = await posts();
    const allData = [{ slug: "" }, ...pageData.data, ...postData.data]
    const date_gen = new Date().toISOString();
    return {
        data: allData.map((datum) => ({
            slug: datum.slug,
            date_gen: date_gen,
        })),
    };
}
