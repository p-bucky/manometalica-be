import Sequelize from "sequelize";

let sequelize;

export async function setupSequelize() {
  sequelize = new Sequelize(process.env.DB_POSTGRES, {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    schema: "manodb",
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  return sequelize;
}
