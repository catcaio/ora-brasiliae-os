import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function main() {
  console.log("--- Jules Daily WIN Audit Pipeline ---");
  
  const today = new Date().toISOString().split("T")[0];
  const snapshotPath = path.resolve(`data/market-lab/${today}-win-snapshot.json`);
  const examplePath = path.resolve("data/market-lab/example-win-snapshot.json");

  if (!fs.existsSync(snapshotPath)) {
    console.warn(`[WARNING] Snapshot for today (${today}) not found at ${snapshotPath}.`);
    console.log(`[INFO] Generating absence report...`);
    
    const reportDir = path.resolve("reports/market-lab");
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    const reportPath = path.join(reportDir, `${today}-win-report.md`);
    const report = `
# Relatório Diário Market Lab - WIN

**Data:** ${today}
**Contrato:** N/A
**Qualidade dos Dados:** INSUFFICIENT

## Diagnóstico
- **Status:** AUSENTE
- **Mensagem:** Nenhum snapshot foi encontrado para a data de hoje. Os dados não foram inseridos pelo operador.

---
> [!WARNING]
> **Ausência de Dados:** Este relatório indica uma falha na coleta manual ou depósito do snapshot do dia. Nenhuma análise ou auditoria profunda pôde ser realizada.

---
**Geração:** Jules CLI (Auditoria Operacional)
`;
    fs.writeFileSync(reportPath, report.trim());
    console.log(`Report generated successfully at ${reportPath}`);
    console.log(`[SUCCESS] Audit completed for ${today} (Absence recorded).`);
    process.exit(0);
  }

  const targetPath = snapshotPath;

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
