const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Add support for path aliases
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
}

// Ensure proper file extensions are resolved
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx']

module.exports = config
