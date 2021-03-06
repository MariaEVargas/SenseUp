module.exports = {
    type: "sqlite",
    database: "./src/database/database.sqlite",
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/database/models/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations"
    }
}
