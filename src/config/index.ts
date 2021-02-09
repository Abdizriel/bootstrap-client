import environment from './environment'

export const supportedLocales = ['en-US', 'pl']

export default {
  env: environment.env,
  graphqlUrl: environment.graphqlUrl,
  commitHash: environment.commitHash,
  version: environment.version,
}
