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
exports.ExtractFromPDF = void 0;
const catchAsyncError_1 = __importDefault(require("../middleware/catchAsyncError"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const pdfBasePath = "./";
exports.ExtractFromPDF = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdfPath = "pdf.pdf";
        if (!pdfPath || !fs_1.default.existsSync(path_1.default.join(pdfBasePath, pdfPath))) {
            return res
                .status(400)
                .json({ error: "Invalid or inaccessible PDF path" });
        }
        const dataBuffer = fs_1.default.readFileSync(path_1.default.join(pdfBasePath, pdfPath));
        const data = yield (0, pdf_parse_1.default)(dataBuffer);
        const extractedText = data.text;
        res.json({ extractedText });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
