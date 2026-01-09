module.exports = (eleventyConfig) => {
	let logged = false
	eleventyConfig.on('eleventy.before', ({ runMode }) => {
		let text = 'Excluding'
		// Only show drafts in serve/watch modes
		if (runMode === 'serve' || runMode === 'watch') {
			process.env.BUILD_DRAFTS = true
			text = 'Including'
		}

		// Only log once.
		if (!logged) {
			console.log(`[11ty/eleventy-base-blog] ${text} drafts.`)
		}

		logged = true
	})
}
