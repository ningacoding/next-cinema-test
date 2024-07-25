export default function Button({
                                 label,
                                 onClick,
                                 icon,
                                 inline,
                                 disabled,
                                 danger,
                                 type,
                               }: {
  label?: string,
  onClick?: any,
  icon?: any,
  inline?: boolean,
  disabled?: boolean,
  danger?: string,
  type?: 'submit' | 'reset' | 'button',
}) {
  const Icon: any = !!icon ? icon : undefined;
  let theme = 'bg-blue-700 hover:bg-blue-600 focus:ring-blue-500';
  if (danger) {
    theme = 'bg-red-600 hover:bg-red-500 focus:ring-red-500';
  }
  return <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`group relative ${!!inline ? !!icon ? 'pl-10' : '' : 'w-full flex'} ${!!disabled ? 'opacity-50' : ''} justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme} focus:outline-none focus:ring-2 focus:ring-offset-2 `}>
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {!!icon && <Icon className="h-5 w-5 text-white"
                             aria-hidden="true"/>}
        </span>
    {label}
  </button>;
}
