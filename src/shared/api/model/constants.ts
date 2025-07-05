export const apiDomainAccountDev = 'http://localhost:10005/api'
// export const apiDomainAccountProd = 'https://front-test.devmill.ru/api'
export const apiDomainAccountProd = 'https://big-grain-nest.vercel.app/api'
export const apiDomain = import.meta.env.DEV ? `${apiDomainAccountDev}` : `${apiDomainAccountProd}`
// export const apiDomain = `${apiDomainAccountProd}`
// export const apiDomainFile = `${apiDomainAccount}`
