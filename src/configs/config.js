require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    PROVIDER: process.env.PROVIDER,
    FOLDER: process.env.FOLDER,
    GC_PATH: process.env.GC_PATH,
    GC_KEY: process.env.GC_KEY
};