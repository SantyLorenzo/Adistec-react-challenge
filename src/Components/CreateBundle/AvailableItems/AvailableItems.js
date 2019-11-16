import React from 'react';
import styled from 'styled-components';
import Item from '../../Item';

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const ItemsContainer = styled.div`
  padding: 20px 30px;
`;

const SectionTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 0;
  margin: 20px 0 0 30px;
`;

const AvailableItems = ({ listOfAvailableItems }) => (
  <Container>
    <SectionTitle>Available Items</SectionTitle>
    <ItemsContainer>
      {listOfAvailableItems.map((item, i) => (
        <Item item={item} buttonType="none" buttonText="Add to Bundle" />
      ))}
    </ItemsContainer>
  </Container>
);

export default AvailableItems;
