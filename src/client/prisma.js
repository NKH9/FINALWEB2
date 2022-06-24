const { PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");


const prisma = new PrismaClient();

prisma.$use(async function(params,next) {
    if (params.action === "create" && params.model === "User") {
        const user = params.args.data;
        const password = bcrypt.hashSync(user.password,10);
        user.password = password;
        params.args.data = user;
    }

    return next(params);
});

module.exports = prisma;
