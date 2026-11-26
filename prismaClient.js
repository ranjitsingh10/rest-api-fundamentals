
require("dotenv").config();

const { PrismaPg } = require("@prisma/adapter-pg");

const { PrismaClient } = require("./generated/prisma/client.cts");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

module.exports = prisma;
