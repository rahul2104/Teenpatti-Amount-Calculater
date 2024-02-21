module.exports = {
  output: 'export',
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    // Will only be available on the server side
    BASE_PATH: process.env.BASE_PATH,
    AUTHORISATION: process.env.AUTHORISATION
  },
  publicRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    BASE_PATH: process.env.BASE_PATH,
    AUTHORISATION: process.env.AUTHORISATION
  }
}
