import express from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from("users").insert([{ name, email }]);
  
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});