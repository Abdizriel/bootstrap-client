function getEnv(name: string) {
  // eslint-disable-next-line prefer-destructuring
  const env = process.env
  const ENV = env.REACT_APP_ENV

  const envKey = `${name}_${ENV}`
  return envKey in env ? env[envKey] : env[name]
}

export default {
  env: process.env.REACT_APP_ENV,
  graphqlUrl: getEnv('REACT_APP_GRAPHQL_URL'),
  commitHash: getEnv('REACT_APP_COMMIT_HASH'),
  version: getEnv('REACT_APP_VERSION'),
}
