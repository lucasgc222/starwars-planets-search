type Props = {
  buttonText: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  type?: 'button' | 'submit',
  moreClasses?: string,
  disabled?:boolean,
  dataTestId?: string,
};

function Button({ buttonText, onClick = () => {}, type = 'button',
  moreClasses = '', disabled = false, dataTestId = '' }: Props) {
  return (
    <button
      className={ `button ${moreClasses}` }
      type={ type }
      onClick={ onClick }
      disabled={ disabled }
      data-testid={ dataTestId }
    >
      { buttonText }
    </button>
  );
}

export default Button;
