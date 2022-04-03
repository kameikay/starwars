import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  img {
    width: 80px;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.3s ease-in;

      &:hover {
        color: ${({ theme }) => theme.colors.primary.light};
      }

      svg {
        margin-right: 0.5rem;
      }
    }

    a + a {
      margin-left: 1.5rem;
    }
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    nav {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center !important;

      a + a {
        margin-left: 0 !important;
      }
    }
  }
`;
