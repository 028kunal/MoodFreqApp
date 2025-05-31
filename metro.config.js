const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable package exports to fix the Node standard library module error
config.resolver.unstable_enablePackageExports = false;

module.exports = config;