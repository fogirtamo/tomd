import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: 35,
    minHeight: 35,
    width: 139,
    border: `2px solid ${state.isFocused || state.isSelected ? 'rgba(35, 35, 35, 1.00)' : 'rgba(41, 41, 41, 1.00)'}`,
    backgroundColor: 'rgba(12, 12, 12, 1.00)',
    color: 'rgba(136, 136, 136, 1.00)',
    fontFamily: 'Verdana, Geneva, sans-serif',
    fontSize: '14px',
    cursor: 'pointer',
    marginLeft: '10px',
    padding: '0px 5px',
    outline: 'none',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    ':hover': {
      borderColor: 'rgba(41, 41, 41, 1.00)',
      transition: 'border-color 0.2s ease-in-out',
    },
    ':focus': {
      borderColor: 'rgba(41, 41, 41, 1.00)',
    },
  }),
  input: (provided) => ({
    ...provided,
    cursor: 'pointer', // Убираем курсор в поле ввода
    caretColor: 'transparent', // Убираем мигающий курсор
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(136, 136, 136, 1.00)',
    fontFamily: 'Verdana, Geneva, sans-serif',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'rgba(136, 136, 136, 1.00)',
    padding: 0, // Убираем отступы
    ':hover': {
      color: 'rgba(136, 136, 136, 1.00)',  // Убираем изменение цвета стрелки при наведении
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none', // Убираем разделитель между индикатором и полем
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid rgba(35, 35, 35, 1.00)',
    backgroundColor: 'rgba(12, 12, 12, 1.00)', // Цвет фона выпадающего списка
    color: 'rgba(136, 136, 136, 1.00)', // Цвет текста в меню
    boxShadow: 'none', // Убираем тень
    borderRadius: 0, // Убираем радиус углов
    overflow: 'hidden',
    margin: '0 0 0 10px',
    maxHeight: 'none',
    width: 139
  }),
  menuList: (provided) => ({
    ...provided,
    overflow: 'hidden',  // Убираем прокрутку на списке
    padding: 0
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'rgba(136, 136, 136, 1.00)',
    backgroundColor: state.isFocused ? 'rgba(41, 41, 41, 1.00)' : 'rgba(12, 12, 12, 1.00)',
    fontFamily: 'Verdana, Geneva, sans-serif',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    width: 139,
    alignItems: 'center', // Центрируем элементы опций по вертикали
    ':hover': {
      backgroundColor: 'rgba(41, 41, 41, 1.00)',
      color: 'rgba(136, 136, 136, 1.00)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'rgba(136, 136, 136, 1.00)', // Цвет значения
    display: 'flex',
    alignItems: 'center', // Центрируем значение по вертикали
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(41, 41, 41, 1.00)', // Цвет фона для выбранных элементов
    color: 'rgba(136, 136, 136, 1.00)', // Цвет текста
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'rgba(136, 136, 136, 1.00)', // Цвет текста в метке выбранного элемента
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'rgba(136, 136, 136, 1.00)', // Цвет крестика для удаления
    ':hover': {
      backgroundColor: 'transparent', // Убираем фон при наведении на крестик
      color: 'rgba(255, 0, 0, 1.00)', // Цвет крестика при наведении
    },
  }),
};

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <Select
      options={options}
      value={value}
      defaultValue={defaultValue}
      styles={customStyles}
      placeholder={defaultValue}
      onChange={onChange}
    />
  );
};

export default MySelect;