interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <select
      aria-label="Filter by category"
      className="border p-2 rounded-lg
transition-all duration-200
focus:ring-2 focus:ring-black/20 focus:outline-none
hover:shadow-sm"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">All</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
