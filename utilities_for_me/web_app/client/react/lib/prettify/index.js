const JSON_TYPE = "json"
const HTML_TYPE = "html"
const JS_TYPE = "js"
const CSS_TYPE = "css"

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

const prettify = (contents, type) => {
   let result
   switch(type){
      case JSON_TYPE:
         result = prettifyJSON(contents)
      default:
         result = `unsupported content type ${type}`
   }

  return result
}

module.exports = {
  prettify
}
