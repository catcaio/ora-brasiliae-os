import fs from "fs";
import path from "path";
import { validateWinSnapshot } from "../src/lib/validate-win-snapshot";
import { WinDailySnapshot } from "../src/lib/market-data-types";

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: tsx scripts/generate-market-lab-report.ts <path-to-snapshot.json>");
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found at ${absolutePath}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(absolutePath, "utf-8");
    const snapshot: WinDailySnapshot = JSON.parse(content);
    const result = validateWinSnapshot(snapshot);

    const report = `
# Relatório Diário Market Lab - WIN

**Data:** ${snapshot.date}
**Contrato:** ${snapshot.contract}
**Qualidade dos Dados:** ${result.quality.toUpperCase()}

## Resumo dos Dados
- **Abertura:** ${snapshot.opening ?? "N/A"}
- **Máxima:** ${snapshot.high ?? "N/A"}
- **Mínima:** ${snapshot.low ?? "N/A"}
- **Fechamento:** ${snapshot.close ?? "N/A"}
- **Volume:** ${snapshot.volume ?? "N/A"}
- **VWAP:** ${snapshot.vwap ?? "N/A"}

## Diagnóstico
- **Status:** ${result.isValid ? "VÁLIDO" : "INVÁLIDO"}
- **Campos Ausentes:** ${result.missingFields.length > 0 ? result.missingFields.join(", ") : "Nenhum"}
- **Inconsistências:** ${result.errors.length > 0 ? result.errors.join("; ") : "Nenhuma detectada"}

---
> [!NOTE]
> **Sandbox Educacional:** Este relatório é gerado para fins de estudo e auditoria operacional. 
> Nenhuma recomendação de trade é feita ou deve ser inferida.

---
**Geração:** Jules CLI (Auditoria Operacional)
`;

    const reportDir = path.resolve("reports/market-lab");
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const reportPath = path.join(reportDir, `${snapshot.date}-win-report.md`);
    fs.writeFileSync(reportPath, report.trim());

    console.log(`Report generated successfully at ${reportPath}`);
  } catch (error) {
    console.error("Error generating report:", error);
    process.exit(1);
  }
}

main();
