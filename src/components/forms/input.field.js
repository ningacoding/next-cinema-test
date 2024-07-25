import FieldErrors from './field.errors';

export default function InputField({
                                       field: {name, onBlur, value},
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
                                       containerStyles,
                                   }) {
    const hasError = errors[name] && touched[name];
    return <div className={containerStyles || `col-span-6`}>

        <label htmlFor={name}
               className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm ${hasError ? 'border-blue-500' : 'border-gray-300'} rounded-md`}
            name={name}
            required={required}
            autoComplete={autoComplete}
            onChange={(event) => {
                setFieldValue(name, event.target.value);
                if (typeof onChange === 'function') {
                    onChange(event.target.value);
                }
            }}
            defaultValue={value}
            onBlur={() => {
                setFieldTouched(name);
            }}
            type={type || 'text'}
            placeholder={placeholder}
        />

        {!!hasError && <FieldErrors styles={'mt-2'}
                                    textStyle={'text-sm'}
                                    errors={errors}
                                    name={name}
                                    simple/>}
    </div>;
}
