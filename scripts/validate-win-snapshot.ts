import fs from "fs";
import path from "path";
import { validateWinSnapshot } from "../src/lib/validate-win-snapshot";

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: tsx scripts/validate-win-snapshot.ts <path-to-snapshot.json>");
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found at ${absolutePath}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(absolutePath, "utf-8");
    const snapshot = JSON.parse(content);
    const result = validateWinSnapshot(snapshot);

    console.log("Validation Result:");
    console.log(JSON.stringify(result, null, 2));

    if (!result.isValid) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Error reading or parsing snapshot:", error);
    process.exit(1);
  }
}

main();
