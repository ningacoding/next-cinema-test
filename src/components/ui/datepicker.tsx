import DatePicker, {registerLocale} from 'react-datepicker';
import {useState} from 'react';
import {getDate, getMonth, getYear} from 'date-fns';
import moment from 'moment';
// @ts-ignore
import _range from 'lodash.range';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import es from 'date-fns/locale/es';

// @ts-ignore
registerLocale('es', es);

export default function Datepicker({
                                     onChanged,
                                     center,
                                     value,
                                     maxDate,
                                     minDate,
                                     hasError,
                                     format,
                                     placeholder,
                                   }: {

  onChanged?: any,
  center?: boolean,
  value?: any,
  maxDate?: any,
  minDate?: any,
  hasError?: boolean,
  format?: string,
  placeholder?: string,
}) {


  const [selectedDate, setSelectedDate] = useState(value);

  const onChange = (date: any) => {
    setSelectedDate(date);
    if (typeof onChanged === 'function') {
      onChanged(date);
    }
  };

  const endYears = moment();
  const years = _range(2024, endYears.year() + 2);

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  /**
   * Docs for DaetPicker: https://reactdatepicker.com/
   */
  return <DatePicker
    className={`focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm ${hasError ? 'border-blue-500' : 'border-gray-300'} rounded-md`}
    calendarClassName={center ? 'datepicker-center' : undefined}
    allowSameDay
    selected={selectedDate}
    onChange={onChange}
    placeholderText={placeholder}
    onKeyDown={(e) => {
      e.preventDefault();
    }}
    locale="es"
    maxDate={maxDate}
    minDate={minDate}
    dateFormat={format}
    renderDayContents={(day, date) => <span className={''}>
            {getDate(date)}
        </span>}
    renderCustomHeader={({
                           date,
                           changeYear,
                           changeMonth,
                           decreaseMonth,
                           increaseMonth,
                           prevMonthButtonDisabled,
                           nextMonthButtonDisabled,
                         }) => (
      <div className={'flex p-1 items-center justify-items-center content-center justify-center'}>
        <button onClick={decreaseMonth}
                type={'button'}
                disabled={prevMonthButtonDisabled}
                className={`rounded-md p-1 text-white ${prevMonthButtonDisabled ? 'bg-gray-500' : 'bg-orange-700'} text-xl inline`}>
          <MdChevronLeft/>
        </button>
        <select className={'py-0.5 rounded-md border-gray-500 ml-1'}
                value={getYear(date)}
                onChange={({target: {value}}) => changeYear(Number(value))}
        >
          {years.map((option: any) => (
            <option key={option}
                    value={option}>
              {option}
            </option>
          ))}
        </select>

        <select className={'py-0.5 rounded-md border-gray-500 mx-1'}
                value={months[getMonth(date)]}
                onChange={({target: {value}}) =>
                  changeMonth(months.indexOf(value))
                }
        >
          {months.map((option) => (
            <option key={option}
                    value={option}>
              {option}
            </option>
          ))}
        </select>

        <button onClick={increaseMonth}
                type={'button'}
                disabled={nextMonthButtonDisabled}
                className={`rounded-md p-1 text-white ${nextMonthButtonDisabled ? 'bg-gray-500' : 'bg-orange-700'} text-xl inline`}>
          <MdChevronRight/>
        </button>
      </div>
    )}
  />;

}
