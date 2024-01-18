import React from "react";
import { helplines } from "./helpline";

function ChatBotHelpLines() {
  return (
    <div className="chatbothelplines px-3">
      <h1 className="text-center text-xl text-[#8c4e1d]">
        Rajasthan Police HelpLines
      </h1>
      {helplines.map((item, index) => {
        return (
          <div key={index} className="py-2">
            <h2 className="text-[#8C4E1D] font-sans font-bold text-md">
              {item.name}:&nbsp;
              <>
                <a
                  href={"tel:" + item.number}
                  className="text-blue-500 underline"
                >
                  {item.number}
                </a>
              </>
              {item.number2 && (
                <>
                  {" "}
                  /{" "}
                  <a
                    href={"tel:" + item.number}
                    className="text-blue-500 underline"
                  >
                    {item.number}
                  </a>
                </>
              )}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBotHelpLines;
