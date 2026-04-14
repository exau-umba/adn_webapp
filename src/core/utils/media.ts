import QRCode from "qrcode";

export async function loadImageDataUrl(src: string): Promise<string> {
  const response = await fetch(src);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateAgentQrDataUrl(payload: {
  agentId: string;
  name: string;
  phone: string;
  city: string;
  company: string;
}): Promise<string> {
  return await QRCode.toDataURL(JSON.stringify(payload), { margin: 1, width: 180 });
}
