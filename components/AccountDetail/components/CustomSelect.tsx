import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import { Grid } from '@material-ui/core';
type OptionSelection = {
  value: any;
  label: string;
  disabled: boolean;
};
class CustomSelectProp {
  options: OptionSelection[];
  value: any;
  setValue: any;
  placeholder: string;
  noResultsText: string;
  clearable: boolean;
  style: any;
}

function CustomSelect(props: CustomSelectProp) {
  const { options, value, setValue, placeholder, noResultsText, clearable, style } = props;
  function renderOption({ focusedOption, focusOption, key, labelKey, option, selectValue, style, valueArray }) {
    const className = ['VirtualizedSelectOption'];

    if (option === focusedOption) {
      className.push('VirtualizedSelectFocusedOption');
    }

    if (option.disabled) {
      className.push('VirtualizedSelectDisabledOption');
    }

    if (valueArray && valueArray.indexOf(option) >= 0) {
      className.push('VirtualizedSelectSelectedOption');
    }

    if (option.className) {
      className.push(option.className);
    }

    const events = option.disabled
      ? {}
      : {
          onClick: () => selectValue(option),
          onMouseEnter: () => focusOption(option),
        };

    if (option.disabled) {
      return (
        <div className={className.join(' ')} key={key} style={style} title={option.title} {...events}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span className='Select-loading' style={{ marginRight: '0.5em' }} />
            <span>{option[labelKey]}</span>
          </div>
        </div>
      );
    }

    return (
      <div className={className.join(' ')} key={key} style={style} title={option.title} {...events}>
        {option[labelKey]}
      </div>
    );
  }

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Grid>
      <VirtualizedSelect
        value={value}
        options={options}
        clearable={clearable}
        variant='contained'
        style={style}
        optionRenderer={renderOption}
        onChange={handleChange}
        placeholder={placeholder}
        noResultsText={noResultsText}
        pageSize={20}
      />
    </Grid>
  );
}
export default CustomSelect;
