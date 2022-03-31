import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface IPaginationButtonProps {
  isActive?: boolean;
}

export const PaginationButton = styled.button<IPaginationButtonProps>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => transparentize(0.8, theme.colors.dark[100])};
  color: ${({ theme }) => theme.colors.light[900]};

  &[disabled] {
    background-color: ${({ theme }) => transparentize(0.2, theme.colors.light[100])};
    cursor: not-allowed;
  }
  svg {
    text-align: center;
  }

  ${({ isActive }) => isActive
    && css`
      background-color: ${({ theme }) => theme.colors.primary.main};
      border-radius: 50%;
      font-weight: bold;
    `}
`;

PaginationButton.defaultProps = {
  isActive: false,
};
