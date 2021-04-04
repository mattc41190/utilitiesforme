const { getMinutesOnly, getSecondsOnly, translateFromSeconds } = require('./index')

test('getMinutesOnly returns expected minutes from number of seconds', () => {
  const tenMinutesInSeconds = 600
  const expected = 10
  expect(getMinutesOnly(tenMinutesInSeconds)).toEqual(expected)
})

test('getSecondsOnly returns expected seconds remaining from number of seconds greater than 60', () => {
  const tenAndAHalfMinutesInSeconds = 630
  const expectedRemainingSeconds = 30
  expect(getSecondsOnly(tenAndAHalfMinutesInSeconds)).toEqual(expectedRemainingSeconds)
})

test('translateFromSeconds formats a large number of seconds into something readable in minutes:seconds format', () => {
  const ThirtyAndAHalfMinutesInSeconds = 1830
  const expectedResult = '30:30'
  expect(translateFromSeconds(ThirtyAndAHalfMinutesInSeconds)).toEqual(expectedResult)
})
