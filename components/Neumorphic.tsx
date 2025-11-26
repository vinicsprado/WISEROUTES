
import React from 'react';

// Common classes for Neumorphism
const OUTER_SHADOW = 'shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]';
const INNER_SHADOW = 'shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]';
const TEXT_COLOR = 'text-black';
const BG_COLOR = 'bg-[#e0e0e0]';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NeumorphicCard: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`${BG_COLOR} ${TEXT_COLOR} rounded-2xl ${OUTER_SHADOW} p-6 ${className} transition-all duration-300`}
    >
      {children}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const NeumorphicButton: React.FC<ButtonProps> = ({ children, className = '', active, ...props }) => {
  return (
    <button
      className={`
        ${BG_COLOR} ${TEXT_COLOR} font-semibold py-3 px-6 rounded-xl transition-all duration-200
        ${active ? INNER_SHADOW : OUTER_SHADOW}
        active:${INNER_SHADOW}
        hover:translate-y-[-1px]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const NeumorphicInput: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-xs font-bold uppercase tracking-wider ml-1">{label}</label>}
      <input
        className={`
          ${BG_COLOR} ${TEXT_COLOR} rounded-xl px-4 py-3 outline-none transition-all
          ${INNER_SHADOW}
          placeholder-gray-500
          focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export const NeumorphicSelect: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-xs font-bold uppercase tracking-wider ml-1">{label}</label>}
      <div className="relative">
        <select
          className={`
            ${BG_COLOR} ${TEXT_COLOR} rounded-xl px-4 py-3 outline-none transition-all w-full appearance-none
            ${INNER_SHADOW}
            focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50
            ${className}
          `}
          {...props}
        >
          <option value="" disabled>Selecione...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <svg className="w-4 h-4 fill-current text-gray-600" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
