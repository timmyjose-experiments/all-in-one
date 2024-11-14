const { withGradleProperties } = require('expo/config-plugins')

/// Given an array of properties of the form:
/// {
///   "configKey": "<key value>"
/// . "configValue": <any value here>
///}
/// adds all these properties to `android/gradle.properties`
const addCustomPropertyToGradleProperties = (config, customConfig ) => {
  return withGradleProperties(config, (config) => {
    customConfig.forEach(({ configKey, configValue }) => {
      console.log(`Adding key = "${configKey}" with value = "${configValue}" to android/gradle.properties`)
      config.modResults.push({
        type: 'property',
        key: configKey,
        value: configValue.toString()
      })
    })
    return config
  })
}

module.exports = function withAndroidGradleProperties(config, customConfig) {
  return addCustomPropertyToGradleProperties(config, customConfig)
}
