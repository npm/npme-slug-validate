# npme-slug-validate

Validates if a text string is a valid npmE slug name.

## Format

Requirements for a valid npmE slug name attempt to follow the recommendation for a domain name label as outlined in Appendix 1 of RFC 883. The requirements are as follows:

- minimum of 3 characters in length
- maximum of 63 characters in length
- contains only alphanumeric ASCII characters or a hyphen ('-')
- only contains lower-case characters
- begins with an alpha character
- ends with an alphanumeric character

## Examples

### Valid Slugs
- `down`
- `what-4`
- `up-2-no-good`

### Invalid Slugs
- `up`
- `low-`
- `-away`
- `1-neat-trick`

## Usage

```
const {validate: validateSlug} = require('npme-slug-validate')

function validateEnterpriseSlug (eSlug) {
  const err = validateSlug(eSlug)

  return err ? Promise.reject(err) : Promise.resolve(eSlug)
}
```

