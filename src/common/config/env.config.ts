export const envConfig = () => ({
    mongodb: process.env.MONGODB,
    port: +process.env.PORT,
    default_pagination_limit: +process.env.DEFAULT_PAGINATION_LIMIT,
});