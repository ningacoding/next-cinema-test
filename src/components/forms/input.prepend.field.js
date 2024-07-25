import FieldErrors from './field.errors';

export default function InputPrependField({
                                              field: {name, value},
                                              form: {errors, touched, setFieldTouched, setFieldValue},
                                              label,
                                              type,
                                              autoComplete,
                                              disabled = false,
                                              placeholder = undefined,
                                              loading = false,
                                              onChange,
                                              center,
                                              required,
                                          }) {
    const hasError = errors[name] && touched[name]
    return <div className={`p-1 mb-1 ${!!center ? '' : ''}`}>
        <div>
            <div className="mt-1 flex rounded-md shadow-sm grid grid-cols-6 sm:grid-cols-4">
                <div
                    className={`col-span-2 sm:col-span-1 inline-flex justify-end items-center px-3 rounded-l-md border border-r-0 ${hasError ? 'bg-blue-100 border-blue-500 text-blue-600' : 'bg-gray-50 border-gray-300 text-gray-500'}  text-sm`}>
                    {label}
                </div>
                <input
                    required={required}
                    autoComplete={autoComplete}
                    onChange={(event) => {
                        setFieldValue(name, event.target.value);
                        onChange(event.target.value);
                    }}
                    value={value}
                    onBlur={() => {
                        setFieldTouched(name);
                    }}
                    type={type}
                    name={name}
                    className={`col-span-4 sm:col-span-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm ${hasError ? 'border-blue-500' : 'border-gray-300'}`}
                    placeholder={placeholder}
                />
            </div>
        </div>
        {!!hasError && <FieldErrors styles={'mt-2'} errors={errors} name={name} simple/>}
    </div>;
}
