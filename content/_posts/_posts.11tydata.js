module.exports = {
  tags: ['posts'],
  layout: 'layouts/post.njk',
  eleventyComputed: {
    permalink: (data) => {
      // If a post specifies its own permalink in frontmatter, use that instead
      if (data.permalink) {
        return data.permalink;
      }
      // Otherwise use the default pattern without the blog/ prefix
      return `${data.page.fileSlug}/index.html`;
    },
  },
};
