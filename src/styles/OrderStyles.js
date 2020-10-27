import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  fieldset {
    display: grid;
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    gap: 1rem;
    align-content: start;

    &.order,
    &.menu {
      grid-column: span 1;
    }
  }

  .tryharder {
    display: none;
  }

  @media (max-width: 990px) {
    fieldset {
      &.menu,
      &.order {
        grid-column: span 2;
      }
    }
  }
`;

export default OrderStyles;
