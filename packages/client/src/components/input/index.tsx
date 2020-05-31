import React, { InputHTMLAttributes } from 'react';
import {
  DefaultStyledInput,
  DefaultStyledLabel,
  StyledInputError,
} from './styles';
import { FlexContainer } from '../flex-container';

export interface InputProps
  extends Omit<InputHTMLAttributes<any>, 'style' | 'children'> {
  padding?: string;
  margin?: string;
  label: string;
  error?: string;
}

export const ErrorIcon: React.FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <path d='M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-1.402 16.945l-3.554-3.521-3.518 3.568-1.418-1.418 3.507-3.566-3.586-3.472 1.418-1.417 3.581 3.458 3.539-3.583 1.431 1.431-3.535 3.568 3.566 3.522-1.431 1.43z' />
  </svg>
);

export const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  margin,
  ...props
}) => {
  return (
    <FlexContainer flexDirection='column' padding={margin} position='relative'>
      <FlexContainer
        alignItems='center'
        justifyContent='space-between'
        marginBottom='0.5rem'
      >
        <DefaultStyledLabel htmlFor={id}>{label}</DefaultStyledLabel>
        {error && (
          <StyledInputError>
            <ErrorIcon />
            <strong>{error}</strong>
          </StyledInputError>
        )}
      </FlexContainer>
      <DefaultStyledInput error={error} id={id} {...props} />
    </FlexContainer>
  );
};
