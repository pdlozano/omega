const {marked} = require('marked');

class Image {
    constructor(uri, alt) {
        this.uri = this.url_format(uri)
        this.alt = alt;
        this.html = this.to_text();
    }

    url_format(item) {
        if (item.slice(0, 4) === "http") {
            return (_width, _extension, _original) => item;
        }

        return (width, extension, original) => {
            const base = "https://res.cloudinary.com/dwnozpucr/image/upload/q_auto,c_scale";
            const w = original ? "auto" : width;
            return `${base},w_${w}/f_auto/${item}.${extension}`;
        }
    }

    source(max_width, source, image_type) {
        return `<source media='(max-width:${max_width}px)' srcset='${source}' type='${image_type}' />`;
    }

    to_text() {
        const original = this.uri(0, 'jpeg', true);
        return [
            "<figure style='margin: 0'>",
            "<picture>",
            this.source(1920, this.uri(1920, "webp"), "image/webp"),
            this.source(1366, this.uri(1366, "webp"), "image/webp"),
            this.source(1280, this.uri(1280, "webp"), "image/webp"),
            this.source(1024, this.uri(1024, "webp"), "image/webp"),
            this.source(736, this.uri(736, "webp"), "image/webp"),
            this.source(414, this.uri(414, "webp"), "image/webp"),
            this.source(375, this.uri(375, "webp"), "image/webp"),
            this.source(320, this.uri(320, "webp"), "image/webp"),
            this.source(1920, this.uri(1920, "jpeg"), "image/jpeg"),
            this.source(1366, this.uri(1366, "jpeg"), "image/jpeg"),
            this.source(1280, this.uri(1280, "jpeg"), "image/jpeg"),
            this.source(1024, this.uri(1024, "jpeg"), "image/jpeg"),
            this.source(736, this.uri(736, "jpeg"), "image/jpeg"),
            this.source(414, this.uri(414, "jpeg"), "image/jpeg"),
            this.source(375, this.uri(375, "jpeg"), "image/jpeg"),
            this.source(320, this.uri(320, "jpeg"), "image/jpeg"),
            `<img src='${original}' alt='${this.alt}' />`,
            "</picture>",
            "<figcaption>",
            this.alt,
            "</figcaption>",
            "</figure>",
        ].join("");
    }
}

const imageRenderer = {
    image(href, _title, text) {
        return new Image(href, text).to_text();
    }
};
marked.use({renderer: imageRenderer});

class Page {
    constructor(data) {
        this.title = data.title;
        this.content = marked.parse(data.content);
        this.slug = data.slug;
        this.date = new Date();
    }
}

class Post extends Page {
    constructor(data) {
        super(data);
        this.date = this.formatDate(data.publishDate);
        this.excerpt = data.excerpt;
        this.image = new Image(`${data.slug}.1`, data.featuredImageAltText);
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
        const month = months[date.getMonth()];
        return `${date.getFullYear()} ${month} ${date.getDate()}`;
    }
}

module.exports = {
    Page,
    Image,
    Post
}
