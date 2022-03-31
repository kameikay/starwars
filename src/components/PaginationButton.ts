import styled, { css } from 'styled-components';

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

  svg {
    text-align: center;
  }

  ${({ isActive }) => isActive
    && css`
      background-color: ${({ theme }) => theme.colors.primary.main};
      border-radius: 50%;
    `}
`;

PaginationButton.defaultProps = {
  isActive: false,
};
