import React from "react";
import { ListItem, OrderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function ChatBotFeedback() {
  return (
    <div className="chatbotfeedback px-5">
      <h1 className="text-xl text-[#8c4e1d] text-center">
        Steps To Fill A Feedback
      </h1>
      <div className="steps">
        <OrderedList>
          <ListItem>
            Navigate to{" "}
            <Link to="/myVisits" className=" text-blue-800">
              My Visits{" "}
            </Link>{" "}
            Section
          </ListItem>
          <ListItem>Find you Police Station</ListItem>
          <ListItem>Click On "Add Feedback"</ListItem>
          <ListItem>Fill the required form as per your experience</ListItem>
        </OrderedList>
      </div>
    </div>
  );
}

export default ChatBotFeedback;
