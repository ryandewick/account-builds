import { Request, Response } from "express";

import express from "express";
import cors from "cors";
import dbPool from "./db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("🎉 Backend is running!");
});

// GET all builds
app.get("/api/builds", async (req: Request, res: Response) => {
  try {
    console.log("Attempting to fetch builds...");
    const result = await dbPool.query("SELECT * FROM account_builds");
    console.log("Builds:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching builds:", error);
    res.status(500).json({ error: "Failed to fetch builds" });
  }
});

// GET steps for a specific build
app.get("/api/builds/:id/steps", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await dbPool.query(
      `SELECT 
         bs.id,
         bs.build_id,
         bs.step_number,
         bs.title,
         bs.description,
         bs.requirements,
         bs.notes,
         bs.external_link,
         ab.name AS build_name
       FROM build_steps bs
       JOIN account_builds ab ON bs.build_id = ab.id
       WHERE bs.build_id = $1
       ORDER BY bs.step_number`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(`Error fetching steps for build ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to fetch build steps" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
