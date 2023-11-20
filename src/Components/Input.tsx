type Props = {
  type: string,
  labelText?: string,
  value: string,
  name?: string,
  dataTestId?: string,
  id: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean,
};

function Input({ type,
  name = '', dataTestId = '',
  id, labelText = '', onChange = () => {}, value, required = false }: Props) {
  return (
    <>
      <label className="label" htmlFor={ id }>
        { labelText }
      </label>
      <input
        className="input"
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
        id={ id }
        required={ required }
        data-testid={ dataTestId }
      />
    </>
  );
}

export default Input;
