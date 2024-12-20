import React from "react";

// Define prop types for the component
interface InputWithIconProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon is a React component that accepts SVG props
  error?: string; // Optional error message
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  Icon,
  error,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {/* Icon wrapper */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        {/* Input field with dynamic classes 
        
        
        
        block w-full pl-10 pr-3 py-2.5 border
        placeholder-gray-400 focus:outline-none 
        sm:text-sm transition-colors duration-200 shadow-sm focus:ring-2 focus:outline-none



        border-red-500 focus:ring-red-500 focus:border-red-500


        border-gray-300 focus:ring-colorP03 focus:border-colorP03
        */}
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={type}
          required
          value={value}
          onChange={onChange}
          className={`${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-colorP03 focus:border-colorP03"
          } block w-full pl-10 pr-3 py-2.5 border
            placeholder-gray-400 focus:outline-none 
            sm:text-sm transition-colors duration-200 shadow-sm focus:ring-2 `}
          placeholder={placeholder}
        />
        {/* Error message */}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default InputWithIcon;
