import React from 'react';
import TextField from '../../../theme/components/ui/TextField';
const TextFieldExtended = (props) => {
  const _onChange = event => {
    props.onChange(props.id, event.target.value)
  }
  return (
    <TextField
      {...props}
      onChange={_onChange}
    />
  )
}

export default TextFieldExtended