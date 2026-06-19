import { FieldLengthCounter } from './FieldLengthCounter';

export const FieldControl = ({ children, value, min, max }) => (
  <div className="relative">
    {children}
    <FieldLengthCounter
      value={value}
      min={min}
      max={max}
      className="pointer-events-none absolute bottom-2.5 right-3"
    />
  </div>
);
