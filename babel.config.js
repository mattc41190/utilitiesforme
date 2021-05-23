// Notes on Babel Config:
// @babel/preset-env is responsible for making javascript browser compatible
// @babel/preset-react is responsible for transpiling JSX to javascript
// runtime: "automatic" -- Means you don't need to import default React export
// -- shrug seems like more magic to me

module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]]
}
