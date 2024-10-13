'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  showToggle?: boolean;
  options?: string[];
}

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  additionalContent?: React.ReactNode;
  showBackButton?: boolean;
  showToggle?: boolean;
  options?: string[];
}

const Layout: React.FC<LayoutProps> = ({ children, title, additionalContent, showBackButton = true, showToggle = false, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <header className="sticky top-0 bg-black/80 backdrop-blur-sm z-10 p-4">
        <div className="flex justify-between items-start">
          {showBackButton ? (
            <button onClick={handleBackClick} className="text-white">
              <FaArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-5" />
          )}
          <div className="flex flex-col items-center flex-grow">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="h-5 mt-1 text-xs text-gray-500">
              {additionalContent}
            </div>
          </div>
          {showToggle ? (
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <FaChevronDown size={20} />
            </button>
          ) : (
            <BsThreeDots size={20} />
          )}
        </div>
        <AnimatePresence>
          {isOpen && showToggle && options.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-md shadow-lg"
            >
              {options.map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={() => {
                    console.log('Selected:', option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main className="flex-1 relative">
        <div className="absolute inset-x-0 top-0 bottom-0 bg-[#101010] rounded-t-[2rem] overflow-y-auto hide-scrollbar pb-16">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;