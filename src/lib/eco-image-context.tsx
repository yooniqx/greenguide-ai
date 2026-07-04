import { createContext, useContext, useState, type ReactNode } from "react";

export type EcoImage = {
  dataUrl: string;
  name: string;
  type: string;
  sizeKb: number;
};

type Ctx = {
  image: EcoImage | null;
  setImage: (img: EcoImage | null) => void;
};

const EcoImageContext = createContext<Ctx | null>(null);

export function EcoImageProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<EcoImage | null>(null);
  return (
    <EcoImageContext.Provider value={{ image, setImage }}>
      {children}
    </EcoImageContext.Provider>
  );
}

export function useEcoImage() {
  const ctx = useContext(EcoImageContext);
  if (!ctx) throw new Error("useEcoImage must be used within EcoImageProvider");
  return ctx;
}
