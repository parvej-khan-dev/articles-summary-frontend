const FormField = ({ labelName, name, value, handleChange }): any => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 "
        >
          {labelName}
        </label>
      </div>

      <input
        type="text"
        id={name}
        name={name}
        placeholder="paste your link"
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 "
      />
    </div>
  );
};

export default FormField;
