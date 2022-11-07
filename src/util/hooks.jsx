import { useState, useEffect, useRef } from "react";

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

import { QrCodePix } from "qrcode-pix";

export function Pix(cpf, numbers, price) {
  const [qrCode, setQrCode] = useState("");
  const [pixCode, setPixCode] = useState("");
  var qrCodePix;
  
  if (cpf && numbers?.length && price && pixCode == "") {
    let message = `Rifa Da Amora Seu${numbers.length > 1 ? "s" : ""}
  Numero${numbers.length > 1 ? "s" : ""} 
  ${numbers.sort((a, b) => a - b).join(", ")}`;
    let transactionId =
      cpf.slice(0, 3) + "A" + numbers.sort((a, b) => a - b).join("n");
    qrCodePix = QrCodePix({
      version: "01",
      key: "03320312090", //or any PIX key
      name: "Nicole Mascarenhas",
      city: "Florianopolis",
      transactionId,
      message,
      value: numbers.length * price,
    });
    if (!pixCode) {
      setPixCode(qrCodePix.payload());
      qrCodePix.base64().then((base64) => {
        setQrCode(base64);
      });
    }
  }

  return [pixCode, qrCode];
}
