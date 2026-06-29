import { Router } from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { eq } from "drizzle-orm";

const authRouter = Router();
const USERS_FILE = path.join(process.cwd(), "users.json");

interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

function loadUsersJson(): UserRecord[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    // Ignore and return empty
  }
  return [];
}

function saveUsersJson(users: UserRecord[]) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Lazy load DB client to prevent crash if process.env.DATABASE_URL is missing
let dbModule: any = null;
async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!dbModule) {
    try {
      dbModule = await import("@workspace/db");
    } catch (e) {
      console.error("Failed to load @workspace/db module:", e);
    }
  }
  return dbModule;
}

// REGISTER endpoint
authRouter.post("/register", async (req, res): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const dbLib = await getDb();

    if (dbLib && dbLib.db) {
      // Connects to PostgreSQL Database
      const existing = await dbLib.db
        .select()
        .from(dbLib.usersTable)
        .where(eq(dbLib.usersTable.email, normalizedEmail))
        .limit(1);

      if (existing.length > 0) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: hashPassword(password),
      };

      await dbLib.db.insert(dbLib.usersTable).values(newUser);

      return res.status(201).json({
        success: true,
        user: { name: newUser.name, email: newUser.email },
      });
    } else {
      // Local fallback file database (users.json)
      const users = loadUsersJson();
      if (users.some((u) => u.email === normalizedEmail)) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const newUser: UserRecord = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: hashPassword(password),
      };

      users.push(newUser);
      saveUsersJson(users);

      return res.status(201).json({
        success: true,
        user: { name: newUser.name, email: newUser.email },
      });
    }
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error during registration" });
  }
});

// LOGIN endpoint
authRouter.post("/login", async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const dbLib = await getDb();

    if (dbLib && dbLib.db) {
      // Connects to PostgreSQL Database
      const users = await dbLib.db
        .select()
        .from(dbLib.usersTable)
        .where(eq(dbLib.usersTable.email, normalizedEmail))
        .limit(1);

      const user = users[0];
      if (!user || user.passwordHash !== hashPassword(password)) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      return res.json({
        success: true,
        user: { name: user.name, email: user.email },
      });
    } else {
      // Local fallback file database (users.json)
      const users = loadUsersJson();
      const user = users.find((u) => u.email === normalizedEmail);

      if (!user || user.passwordHash !== hashPassword(password)) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      return res.json({
        success: true,
        user: { name: user.name, email: user.email },
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error during login" });
  }
});

export default authRouter;
