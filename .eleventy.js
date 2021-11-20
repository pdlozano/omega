module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('robots.txt')
    return {
        passthroughFileCopy: true,
        dir: {
            includes: "_includes",
            layouts: "_layouts"
        }
    }
};
