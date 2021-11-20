module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('css')
    return {
        passthroughFileCopy: true,
        dir: {
            includes: "_includes",
            layouts: "_layouts"
        }
    }
};
