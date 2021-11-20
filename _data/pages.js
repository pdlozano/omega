const {query} = require("../query");

class Page {
    constructor(data) {
        this.title = data.title;
        this.content = data.content;
        this.slug = data.slug;
        this.date = new Date();
    }
}

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
