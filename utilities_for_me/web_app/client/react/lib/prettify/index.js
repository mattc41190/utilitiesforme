import { html, js, css } from 'js-beautify'

const JSON_TYPE = 'json'
const HTML_TYPE = 'html'
const JS_TYPE = 'js'
const CSS_TYPE = 'css'

const prettifyJSON = (contents) => {
  let obj
  try {
    obj = JSON.parse(contents)
  } catch (error) {
    return 'data could not be parsed'
  }
  const result = JSON.stringify(obj, null, 2)
  return result
}

const prettifyHTML = (contents) => {
  const result = html(contents)
  return result
}

const prettifyJS = (contents) => {
  const result = js(contents)
  return result
}

const prettifyCSS = (contents) => {
  const result = css(contents)
  return result
}

export const prettifyContent = (contents, type) => {
  let result
  switch (type) {
    case JSON_TYPE:
      result = prettifyJSON(contents)
      break
    case HTML_TYPE:
      result = prettifyHTML(contents)
      break
    case JS_TYPE:
      result = prettifyJS(contents)
      break
    case CSS_TYPE:
      result = prettifyCSS(contents)
      break
    default:
      result = `unsupported content type ${type}`
  }

  return result
}

/*
<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>
{ "name": "Matthew", "age": 30 }
const hello = () => {console.log("hello")}
p {color: red;text-align: center;}
*/
