import express from "express";
import fileUpload from "express-fileupload";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(fileUpload());

app.post("/convert", async (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).send("No file uploaded.");

  const file = req.files.file as any;
  const tempInput = path.join(__dirname, "temp", file.name);
  const tempOutput = tempInput.replace(/\.docx$/i, ".pdf");

  await file.mv(tempInput);

  const python = spawn("python", [path.join(__dirname, "converters", "docx_to_pdf.py"), tempInput, tempOutput]);

  python.on("close", (code) => {
    if (code !== 0 || !fs.existsSync(tempOutput)) {
      fs.unlinkSync(tempInput);
      return res.status(500).send("Conversion failed");
    }
    res.download(tempOutput, (err) => {
      fs.unlinkSync(tempInput);
      fs.unlinkSync(tempOutput);
    });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
