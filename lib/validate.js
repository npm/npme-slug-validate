const reasons = {
  string: 'slug must be a string',
  length: 'slug must be between 3 and 63 characters in length',
  chars: `slug must be lowercase, start with an alpha character, end with an alphanumeric character, and contain only alphanumeric characters or a hyphen ('-')`
}

function validateSlug (slug) {
  if (typeof slug !== 'string') {
    return new Error(reasons.string)
  }
  if (slug.length < 3 || slug.length > 63) {
    return new Error(reasons.length)
  }
  if (!slug.match(/^[a-z][a-z0-9-]+[a-z0-9]$/)) {
    return new Error(reasons.chars)
  }
  return null
}

module.exports = {
  reasons,
  validate: validateSlug
}
