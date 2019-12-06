/* eslint-disable */
module.exports = () => {
  const fs = require('fs')
  const files = fs.readdirSync('./handlers')
  const yaml = require('yamljs')

  const merged = files
    .map(f => fs.readFileSync(`./handlers/${f}`, 'utf8'))
    .map(raw => yaml.parse(raw))
    .reduce((result, handler) => Object.assign(result, handler), {})

  return merged
}
