export const apiDomainAccountDev = 'http://localhost:10005/api'
export const apiDomainAccountProd = 'https://api.pm.cloudmill.ru'
export const apiDomain = import.meta.env.NODE_ENV === 'development' ? `${apiDomainAccountDev}` : `${apiDomainAccountProd}`
// export const apiDomain = `${apiDomainAccountProd}`
// export const apiDomainFile = `${apiDomainAccount}`
