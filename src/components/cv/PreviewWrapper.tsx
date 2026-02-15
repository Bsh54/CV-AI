import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PreviewWrapperProps {
  children: React.ReactNode;
}

export default function PreviewWrapper({ children }: PreviewWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const cvWidth = 794; // A4 width in px at 96 DPI
      const padding = 64;
      const availableWidth = containerWidth - padding;

      if (availableWidth < cvWidth) {
        setScale(availableWidth / cvWidth);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="cv-preview"
      ref={containerRef}
      className="w-full flex items-start justify-center p-4 min-h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: scale }}
        transition={{ duration: 0.5 }}
        style={{
          transformOrigin: "top center",
          width: "794px",
          minHeight: "1123px",
        }}
        className="bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden print:shadow-none print:transform-none origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}
