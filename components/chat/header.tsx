import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, EraserIcon } from "lucide-react"
import Image from "next/image";
import { CHAT_HEADER, CLEAR_BUTTON_TEXT } from "@/configuration/ui";
import { AI_NAME } from "@/configuration/identity";

export const AILogo = () => (
  <div className="w-12 h-12 relative">
    <Image src="/ai-logo.png" alt={AI_NAME} width={48} height={48} />
    <div className="w-2 h-2 rounded-full bg-green-500 absolute -bottom-0.5 -right-0.5"></div>
  </div>
);

export default function ChatHeader({
  clearMessages,
}: {
  clearMessages: () => void;
}) {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark")
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
    <div className="z-10 flex justify-center items-center fixed top-0 w-full p-5 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex w-full">
        <div className="flex-0 w-[100px]"></div>
        <div className="flex-1 flex justify-center items-center gap-2 text-gray-900 dark:text-white">
          <AILogo />
          <p>{CHAT_HEADER}</p>
        </div>
        <div className="flex-0 w-[100px] flex justify-end items-center gap-3">
          {/* Dark Mode Toggle Button */}
          <Button
            onClick={toggleDarkMode}
            className="shadow-sm p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            variant="outline"
            size="sm"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-800" />
            )}
          </Button>

          {/* Clear Messages Button */}
          <Button
            onClick={clearMessages}
            className="gap-2 shadow-sm"
            variant="outline"
            size="sm"
          >
            <EraserIcon className="w-4 h-4" />
            <span>{CLEAR_BUTTON_TEXT}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
