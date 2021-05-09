const prettify = require('./index')

const expectedJSON =
`{
  "key": "val"
}`

const expectedHTML =
`<p>hello</p>
<p>world</p>`

const expectedJS =
`let fn = () => {
    fakeFunc()
}`

const expectedCSS = `p {
    color: red;
}`

test('prettify JSON', () => {
  expect(prettify.prettifyContent('{"key": "val"}', 'json')).toEqual(expectedJSON)
})

test('prettify HTML', () => {
  expect(prettify.prettifyContent('<p>hello</p><p>world</p>', 'html')).toEqual(expectedHTML)
})

test('prettify JS', () => {
  expect(prettify.prettifyContent('let fn = () => { fakeFunc() }', 'js')).toEqual(expectedJS)
})

test('prettify CSS', () => {
  expect(prettify.prettifyContent('p {color: red;}', 'css')).toEqual(expectedCSS)
})
