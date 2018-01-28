import * as React from 'react';

import * as Styles from './Input.scss';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const Input = ({ value, onChange, label }: InputProps) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.label}>{label}</div>
      <input
        className={Styles.input}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
