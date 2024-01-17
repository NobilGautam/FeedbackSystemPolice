import { Button, Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react";
import { decrypt } from "n-krypta";
import React from "react";

const IndFeedback = ({ item }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      className="mb-4"
    >
      <Stack>
        <CardBody>
          <Heading size="md">{item.name}</Heading>
          <Text py="2">
            <span className=" font-semibold">Regarding: {item.purpose}</span>
            <br/>
            {decrypt(item.feedback,toString(process.env.REACT_APP_SECRET_KEY))}
          </Text>
          <Button className="customButton">
            Comment
          </Button>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default IndFeedback;
