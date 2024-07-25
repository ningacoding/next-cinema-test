export default function Input({value = '', onChange}: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <input
        value={value}
        type="text"
        name="price"
        id="price"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Buscar por nombre de producto y/o SKU"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
