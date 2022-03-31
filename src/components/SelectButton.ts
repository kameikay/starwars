import styled, { css } from 'styled-components';

interface ISelectButtonProps {
  isSelected: boolean;
}

export const SelectButton = styled.button<ISelectButtonProps>`
  background: transparent;
  color: ${({ theme }) => theme.colors.light[900]};
  border: none;

  ${({ theme, isSelected }) => isSelected
    && css`
      border-bottom: 2px solid ${theme.colors.primary.main};
    `}
`;
