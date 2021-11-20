const { query } = require("../query");

class Post {
    constructor(data) {
        this.title = data.title;
        this.publish_date = this.formatDate(data.publishDate);
        this.excerpt = data.excerpt;
        this.image = {
            uri: `${data.slug}.1`,
            alt: data.featuredImageAltText,
        };
        this.content = data.content;
        this.slug = data.slug;
    }

    formatDate(isoFormat) {
        const date = new Date(isoFormat);
        const months = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec",
        ];
        const month = months[date.getMonth() - 1];
        return `${date.getFullYear()} ${month} ${date.getDate()}`;
    }
}


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
