module.exports = {
  basePath: process.env.BASE_PATH,
  output: 'export',
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    // Will only be available on the server side
    BASE_PATH_API: process.env.BASE_PATH_API,
    AUTHORISATION: process.env.AUTHORISATION,
  },
  publicRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    BASE_PATH_API: process.env.BASE_PATH_API,
    AUTHORISATION: process.env.AUTHORISATION,
    BASE_PATH: process.env.BASE_PATH,
  }
}
