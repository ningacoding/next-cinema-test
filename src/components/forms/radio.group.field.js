import FieldErrors from './field.errors';
import {RadioGroup} from '@headlessui/react';

export const roles = [{
  id: 1,
  name: 'Administrador',
  description: 'Usuario avanzado.',
}, {
  id: 2,
  name: 'Común',
  description: 'Usuario estándar',
}];
export default function RadioGroupField({
                                          field: {name, onBlur, value},
                                          form: {errors, touched, setFieldTouched, setFieldValue},
                                          onChange,
                                        }) {

  const hasError = errors[name] && touched[name];
  return (
    <div className="w-full py-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={value}
                    onChange={(valueChanged) => {
                      setFieldValue(name, valueChanged);
                      if (typeof onChange === 'function') {
                        onChange(valueChanged);
                      }
                    }}>
          <div className="space-y-2 flex flex-row">
            {roles.map((role) => (
              <RadioGroup.Option
                key={role.name}
                value={role.id}
                className={({active, checked}) =>
                  `${
                    active
                      ? ''
                      : ''
                  }
                  ${checked ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-green-300 bg-green-100' : 'bg-white hover:bg-gray-50 ring-2 ring-white/60 ring-offset-2 ring-offset-gray-100'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none mx-4`
                }
              >
                {({active, checked}) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-green-600' : 'text-gray-900'
                            }`}
                          >
                            {role.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-green-500' : 'text-gray-400'
                            }`}
                          >
                            <span>
                              {role.description}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      {!!hasError && <FieldErrors styles={'mt-2'}
                                  textStyle={'text-sm'}
                                  errors={errors}
                                  name={name}
                                  simple/>}
    </div>
  );
}
