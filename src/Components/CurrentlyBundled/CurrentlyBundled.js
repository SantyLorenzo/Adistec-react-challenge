import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import numeral from "numeral";
import BundledItem from "./BundledItemContainer";

const Container = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const ItemsContainer = styled.div`
  padding: 20px 20px 0 10px;
`;

const SectionTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 20px;
`;

const Price = styled.p`
  font-size: 23px;
  font-weight: 500;
  margin: 0 10px 10px 10px;
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  margin: 20px 10px;
`;

const CurrentlyBundled = ({
  listOfCurrentlyBundledItems,
  deleteCurrentlyBundledItem,
  createRealeasedBundled
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [bundleName, setBundleName] = useState("");

  const handleMultipleItems = value => {
    setTotalPrice(totalPrice + value);
  };

  const getPrice = () => {
    const subItems = [];
    const items = Object.keys(listOfCurrentlyBundledItems).map(key => {
      if (listOfCurrentlyBundledItems[key].children) {
        Object.keys(listOfCurrentlyBundledItems[key].children).map(item => {
          const children = [listOfCurrentlyBundledItems[key].children[item]];
          Array.prototype.push.apply(subItems, children);
        });
      }
      return listOfCurrentlyBundledItems[key];
    });
    Array.prototype.push.apply(items, subItems);
    const total = items.reduce(
      (acc, item) => acc + parseInt(item.price * item.quantity, 10),
      0
    );
    return total;
  };

  return (
    <Container>
      <SectionTitle>Currently Bundled</SectionTitle>
      <ItemsContainer>
        {Object.keys(listOfCurrentlyBundledItems).map((key, i) => (
          <BundledItem
            onClick={deleteCurrentlyBundledItem}
            item={listOfCurrentlyBundledItems[key]}
            handleMultipleItems={handleMultipleItems}
            index={i}
          />
        ))}
      </ItemsContainer>
      {listOfCurrentlyBundledItems.length > 0 ||
        (Object.entries(listOfCurrentlyBundledItems).length !== 0 && (
          <>
            <Price>{numeral(getPrice()).format("$0,0.00")}</Price>
            <Input
              value={bundleName}
              style={{ width: "70%", margin: "10px 10px" }}
              placeholder="Bundle Name"
              onChange={e => setBundleName(e.target.value)}
            />
            <SubmitButton
              type="primary"
              onClick={() =>
                createRealeasedBundled(
                  bundleName,
                  listOfCurrentlyBundledItems,
                  getPrice()
                )
              }
            >
              Accept Bundle
            </SubmitButton>
          </>
        ))}
    </Container>
  );
};

export default CurrentlyBundled;
