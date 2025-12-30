export default function getDBSetting(){
    const env = process.env.NODE_ENV;

    if(env == 'development') {
        return {
            host: process.env.dev_host,
            port: process.env.dev_port,
            user: process.env.dev_user,
            database: process.env.dev_db
        }
    }else{
        return {
            host: process.env.pro_host,
            port: process.env.pro_port,
            user: process.env.pro_user,
            database: process.env.pro_db
        }
    }
}