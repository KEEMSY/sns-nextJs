'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FaGoogle, FaComment } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            ref={modalRef}
            className="bg-[#1a1a1a] w-full max-w-md rounded-xl overflow-hidden p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              {isSignUp ? '회원가입' : '로그인'}
            </h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                {isSignUp ? '가입하기' : '로그인'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-400">
                {isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
              </span>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-blue-400 hover:underline"
              >
                {isSignUp ? '로그인' : '회원가입'}
              </button>
            </div>
            <div className="mt-6">
              <p className="text-center text-gray-400 mb-4">간편 로그인</p>
              <div className="flex justify-center space-x-4">
                <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200">
                  <FaGoogle />
                </button>
                <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200">
                  <SiNaver />
                </button>
                <button className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-200">
                  <FaComment />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;
