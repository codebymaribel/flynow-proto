import postgres from "postgres";

let sql: ReturnType<typeof postgres> = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export function getDb() {
  if (!sql) {
    const isProduction = process.env.NODE_ENV === "production";

    sql = postgres(process.env.POSTGRES_URL!, {
      ssl: isProduction ? "require" : false,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }

  return sql;
}
