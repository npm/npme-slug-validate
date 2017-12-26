require('mocha')

const {expect, should} = require('chai')
should()

const {reasons, validate} = require('../lib/validate')

const assertInvalid = text => value => value.should.be.instanceOf(Error, text)
const assertBadType = value => assertInvalid(reasons.string)(value)
const assertTooShort = value => assertInvalid(reasons.length)(value)
const assertTooLong = value => assertInvalid(reasons.length)(value)
const assertBadChars = value => assertInvalid(reasons.chars)(value)
const assertValid = value => expect(value).to.be.null

describe('npme-slug-validate', () => {
  it('should require a string', () => {
    assertValid(validate('npme'))

    assertBadType(validate())
    assertBadType(validate(null))
    assertBadType(validate(true))
    assertBadType(validate(0))
    assertBadType(validate({slug: 'bob'}))
  })

  it('should require a slug of at least 3 characters', () => {
    assertValid(validate('npm'))

    assertTooShort(validate(''))
    assertTooShort(validate('n'))
    assertTooShort(validate('np'))
  })

  it('should require a slug shorter than 63 characters', () => {
    assertValid(validate('npm'.repeat(21)))

    assertTooLong(validate('npme'.repeat(16)))
  })

  it('should only contain lowercase characters', () => {
    assertValid(validate('charlie'))

    assertBadChars(validate('Charlie'))
  })

  it('should required a slug to begin with an alhpa character', () => {
    assertValid(validate('gzip'))

    assertBadChars(validate('7zip'))
    assertBadChars(validate('123'))
    assertBadChars(validate('-abc'))
    assertBadChars(validate('-123'))
  })

  it('should required a slug to end with a alphanumeric character', () => {
    assertValid(validate('dayz'))
    assertValid(validate('day1'))

    assertBadChars(validate('day-'))
  })

  it('should required a slug contain only alphanumeric or hyphen', () => {
    assertValid(validate('a-z'))
    assertValid(validate('a--z'))
    assertValid(validate('a-d-z'))

    assertBadChars(validate('d@y'))
    assertBadChars(validate('a:z'))
    assertBadChars(validate('a_z'))
  })
})
