export default {
    jwt : {
        secret : process.env.APP_SECRET || 'default',
        expireIn : '1d'
    }
}
