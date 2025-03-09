export default function Select({ options, value, onChange }) {
  return (
    <select
      className="select md:w-72 w-36 m-4"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
          disabled={option.value === ""}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
