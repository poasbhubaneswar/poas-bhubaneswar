import path from "node:path";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Fall back to the bundled SQLite database (prisma/dev.db) when DATABASE_URL
// is not configured, e.g. on Netlify builds and serverless functions. An
// absolute path is used so it resolves the same way at build and run time.
const datasourceUrl =
  process.env.DATABASE_URL ||
  `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
