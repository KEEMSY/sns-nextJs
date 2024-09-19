import React, { useState, useEffect, useCallback } from 'react';
import { FaGoogle, FaComment } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleEscKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [handleEscKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClose}>
      <div className="bg-[#1a1a1a] rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? '회원가입' : '로그인'}
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>
    </div>
  );
};

export default SignUpModal;