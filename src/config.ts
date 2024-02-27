const url: { [key in string]: string } = {
  dev: 'https://faerun-api.ljbdev.site/faerun-console/',
  cqa: 'https://faerun-api.ljbcqa.site/faerun-console/',
  uat: 'https://faerun-api.ljbcqa.site/faerun-console/',
  preprod: 'https://faerun-api.ljbprod.site/faerun-console/',
  prod: 'https://baldur-sport-api.888mnb43.com/faerun-console/'
}

const platformMap: { [key in string]: string } = {
  dev: 'luxon',
  cqa: '1056',
  prod: '222'
}

const appENV = import.meta.env.VITE_APP_ENV || 'dev'

console.log('process env', import.meta.env, process.env.app_version)

const config = {
  apiUrl: url[appENV] ?? url.dev,
  env: appENV,
  platform: platformMap[appENV] ?? platformMap.dev
}

export default config
