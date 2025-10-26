import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });



const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from("users").insert([{ name, email }]);
  
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});