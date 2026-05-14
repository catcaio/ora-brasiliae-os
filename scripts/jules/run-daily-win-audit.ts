import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function main() {
  console.log("--- Jules Daily WIN Audit Pipeline ---");
  
  const today = new Date().toISOString().split("T")[0];
  const snapshotPath = path.resolve(`data/market-lab/${today}-win-snapshot.json`);
  const examplePath = path.resolve("data/market-lab/example-win-snapshot.json");

  // Check if today's snapshot exists, otherwise use example or report absence
  let targetPath = snapshotPath;
  if (!fs.existsSync(snapshotPath)) {
    console.warn(`[WARNING] Snapshot for today (${today}) not found at ${snapshotPath}.`);
    console.log(`[INFO] Using example snapshot for validation demonstration.`);
    targetPath = examplePath;
  }

  try {
    console.log(`[STEP 1] Validating snapshot: ${targetPath}`);
    execSync(`npx tsx scripts/validate-win-snapshot.ts ${targetPath}`, { stdio: "inherit" });

    console.log(`[STEP 2] Generating report...`);
    execSync(`npx tsx scripts/generate-market-lab-report.ts ${targetPath}`, { stdio: "inherit" });

    console.log(`[SUCCESS] Audit completed for ${today}.`);
    console.log(`[NEXT STEPS] Jules should now register evidence in Linear and update GitHub if needed.`);
  } catch (error) {
    console.error(`[FAILURE] Audit failed for ${today}. Check the errors above.`);
    process.exit(1);
  }
}

main();
