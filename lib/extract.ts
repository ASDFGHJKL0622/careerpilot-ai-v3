import pdf from "pdf-parse"; import mammoth from "mammoth";
export async function extractFile(file:File){const buf=Buffer.from(await file.arrayBuffer()); const name=file.name.toLowerCase();
 if(name.endsWith(".pdf")) return (await pdf(buf)).text;
 if(name.endsWith(".docx")) return (await mammoth.extractRawText({buffer:buf})).value;
 return buf.toString("utf8");
}