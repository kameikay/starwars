import styled from 'styled-components';

export const Container = styled.div`
  width: 15rem;
  position: relative;
  transition: all 0.3s ease-in;
  border-radius: 0.5rem;
  z-index: 2;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 1rem;
    right: 1rem;

    border: none;
    background: transparent;
    z-index: 9;

    svg {
      color: ${({ theme }) => theme.colors.warning.main};
    }

    &:hover {
      svg {
        color: ${({ theme }) => theme.colors.warning.light};
      }
    }
  }

  &:hover {
    .card-name {
      a {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: ${({ theme }) => theme.colors.primary.main};
        }
      }
    }
  }

  img {
    width: 100%;
    border-radius: 0.5rem;
  }

  .card-name {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      background-color: ${({ theme }) => theme.colors.light[900]};
      color: ${({ theme }) => theme.colors.dark[900]};
      height: 3rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-in;

      &:hover {
        background-color: ${({ theme }) => theme.colors.light[500]};
      }
    }
  }
`;
