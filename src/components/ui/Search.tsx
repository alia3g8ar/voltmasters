import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const Search = ({
  onSearch,
  placeholder = "جستجو...",
  className = "",
}: SearchProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={false}
        animate={{
          boxShadow: isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
        }}
        className="relative flex items-center bg-white rounded-lg overflow-hidden"
      >
        <div className="absolute right-3 text-gray-400">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pr-10 pl-4 py-2 focus:outline-none"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute left-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4"
          >
            <div className="text-sm text-gray-500">
              برای جستجوی دقیق‌تر، نام محصول یا دسته‌بندی را وارد کنید
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
