import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, EraserIcon } from "lucide-react"
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";

export const AILogo = () => (
  <div className="w-10 h-10 md:w-12 md:h-12 relative">
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <div className="w-2 h-2 rounded-full bg-green-500 absolute -bottom-0.5 -right-0.5"></div>
  </div>
);

export default function ChatHeader({ clearMessages }: { clearMessages: () => void }) {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  // Load theme preference on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div className="z-10 flex justify-center items-center fixed top-0 w-full p-4 bg-background text-foreground shadow-md transition-colors duration-300">
      {/* Desktop View (Visible at md: 768px and above) */}
      <div className="hidden md:flex w-full justify-center items-center">
        <div className="flex items-center gap-2">
          <AILogo />
          <p className="text-lg font-medium">{CHAT_HEADER}</p>
        </div>
        </div>
        <div className="flex-0 w-[100px] flex justify-end items-center gap-3">
          <Button
            onClick={toggleDarkMode}
            className="shadow-sm p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
            variant="outline"
            size="icon"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-800" />
            )}
          </Button>
          <Button
            onClick={clearMessages}
            className="shadow-sm p-2 rounded-full transition-colors"
            variant="outline"
            size="icon"
          >
            <EraserIcon className="w-5 h-5" />
          </Button>
      </div>

      {/* Mobile View (Visible below md: 768px) */}
      <div className="flex md:hidden w-full justify-between items-center">
        <AILogo />
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleDarkMode}
            className="shadow-sm p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
            variant="outline"
            size="icon"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-800" />
            )}
          </Button>
          <Button
            onClick={clearMessages}
            className="shadow-sm p-2 rounded-full transition-colors"
            variant="outline"
            size="icon"
          >
            <EraserIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
