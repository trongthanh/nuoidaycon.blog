module.exports = {
  tags: ['posts'],
  layout: 'layouts/post.njk',
  eleventyComputed: {
    date: (data) => {
      // Use date_published if date is not set
      if (!data.date && data.date_published) {
        return new Date(data.date_published);
      }
      return data.date;
    },
    permalink: (data) => {
      // Skip drafts in production builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false;
      }
      // If a post specifies its own permalink in frontmatter, use that instead
      if (data.permalink) {
        return data.permalink;
      }
      // Otherwise use the default pattern without the blog/ prefix
      return `${data.page.fileSlug}/index.html`;
    },
    eleventyExcludeFromCollections: (data) => {
      // Exclude drafts from collections in production builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return true;
      }
      return data.eleventyExcludeFromCollections;
    },
  },
};
