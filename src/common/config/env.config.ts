export const envConfig = () => ({
    mongodb: process.env.MONGODB,
    database_name: process.env.DATABASE_NAME,
    port: +process.env.PORT,
    default_pagination_limit: +process.env.DEFAULT_PAGINATION_LIMIT,
});