import { jsPDF } from "jspdf";
import { loadImageDataUrl } from "./media.ts";

export interface AgentPdfData {
  id: string;
  name: string;
  role: string;
  status: string;
  score: string;
  service: string;
  phone: string;
  city: string;
  experience: string;
  photo: string;
}

interface ExportAgentPdfOptions {
  agent: AgentPdfData;
  qrDataUrl?: string;
}

export async function exportAgentProfilePdf({ agent, qrDataUrl = "" }: ExportAgentPdfOptions) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const primary = [1, 0, 59];
  const secondary = [8, 4, 122];

  doc.setFillColor(primary[0], primary[1], primary[2]);
  doc.rect(0, 0, 210, 34, "F");
  doc.setFillColor(secondary[0], secondary[1], secondary[2]);
  doc.rect(0, 30, 210, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("ADN PRO SERVICE", 14, 16);
  doc.setFontSize(11);
  doc.text("FICHE D'IDENTIFICATION AGENT", 14, 24);

  try {
    const logoDataUrl = await loadImageDataUrl("/logos/and_pro_service_multiservice_cercle.png");
    if (logoDataUrl) {
      doc.addImage(String(logoDataUrl), "PNG", 175, 6, 24, 24);
    }
  } catch {
    // Le PDF reste fonctionnel meme sans logo.
  }

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(142, 108, 54, 54, 3, 3, "F");
  try {
    const agentPhotoDataUrl = await loadImageDataUrl(agent.photo);
    if (agentPhotoDataUrl) {
      doc.addImage(String(agentPhotoDataUrl), "JPEG", 147, 113, 44, 44);
    }
  } catch {
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.text("Photo indisponible", 154, 138);
  }
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text("Photo agent", 160, 160);

  doc.setTextColor(primary[0], primary[1], primary[2]);
  doc.setFontSize(14);
  doc.text(agent.name, 14, 46);

  doc.setDrawColor(220, 224, 230);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 50, 122, 78, 3, 3, "FD");

  doc.setFontSize(11);
  let y = 58;
  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(value), 55, y, { maxWidth: 76 });
    y += 8;
  };

  row("ID Agent", agent.id);
  row("Role", agent.role);
  row("Statut", agent.status);
  row("Score", agent.score);
  row("Service", agent.service);
  row("Telephone", agent.phone);
  row("Ville", agent.city);
  row("Pays", "RDC (Congo-Kinshasa)");
  row("Experience", agent.experience);

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(142, 50, 54, 54, 3, 3, "F");
  if (qrDataUrl) {
    doc.addImage(qrDataUrl, "PNG", 147, 55, 44, 44);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("QR code unique agent", 153, 102);
  }

  doc.setDrawColor(220, 220, 220);
  doc.line(14, 136, 196, 136);
  doc.setTextColor(primary[0], primary[1], primary[2]);
  doc.setFontSize(10);
  doc.text("Signature responsable", 14, 176);
  doc.setDrawColor(170, 170, 170);
  doc.line(14, 196, 88, 196);

  doc.text("Signature agent", 122, 176);
  doc.line(122, 196, 196, 196);

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("Document genere automatiquement depuis ADN PRO SERVICE", 14, 282);

  doc.save(`fiche-agent-${agent.id}.pdf`);
}
