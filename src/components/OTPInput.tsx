
import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
}

const OTPInput = ({ length, value, onChange }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // If value is provided externally, update the internal state
    if (value) {
      const valueArray = value.split('').slice(0, length);
      setOtp(valueArray.concat(Array(length - valueArray.length).fill('')));
    }
  }, [value, length]);

  useEffect(() => {
    // Update the external value when internal state changes
    onChange(otp.join(''));
  }, [otp, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, length);
    
    const newOtp = [...otp];
    pasteData.split('').forEach((char, i) => {
      if (i < length) {
        newOtp[i] = char;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one if all are filled
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 mt-2">
      {Array(length).fill(null).map((_, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="w-12 h-12 text-center text-xl font-medium border rounded focus:border-ir-blue focus:ring-ir-blue bg-gray-800 border-gray-700 text-white"
        />
      ))}
    </div>
  );
};

export default OTPInput;
