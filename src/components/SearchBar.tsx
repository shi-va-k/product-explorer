interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      aria-label="Search products"
      className="border p-2 rounded-lg w-[50%]
transition-all duration-200
focus:ring-2 focus:ring-black/20 focus:outline-none
hover:shadow-sm focus:scale-[1.02]
"

      placeholder="Search products..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
