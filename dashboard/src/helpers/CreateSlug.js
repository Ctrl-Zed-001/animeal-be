const slugCreator = (text) => {
    let slug = text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    return slug
}

module.exports = slugCreator