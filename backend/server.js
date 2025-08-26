"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, express_fileupload_1.default)());
app.post("/convert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || !req.files.file)
        return res.status(400).send("No file uploaded.");
    const file = req.files.file;
    const tempInput = path_1.default.join(__dirname, "temp", file.name);
    const tempOutput = tempInput.replace(/\.docx$/i, ".pdf");
    yield file.mv(tempInput);
    const python = (0, child_process_1.spawn)("python", [path_1.default.join(__dirname, "converters", "docx_to_pdf.py"), tempInput, tempOutput]);
    python.on("close", (code) => {
        if (code !== 0 || !fs_1.default.existsSync(tempOutput)) {
            fs_1.default.unlinkSync(tempInput);
            return res.status(500).send("Conversion failed");
        }
        res.download(tempOutput, (err) => {
            fs_1.default.unlinkSync(tempInput);
            fs_1.default.unlinkSync(tempOutput);
        });
    });
}));
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
