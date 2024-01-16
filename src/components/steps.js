import ChatBotFeedback from "./ChatBotFeedback";
import ChatBotHelpLines from "./ChatBotHelpLines"
import ChatBotNearest from "./ChatBotNearest";

export const steps = [
  {
    id: "0",
    message: "Welcome to Rajasthan Police.",
    trigger: "1",
  },
  {
    id: "1",
    message: "How may i help you today",
    trigger: "options",
  },
  {
    id: "options",
    options: [
      {
        value: 1,
        label: "File a Police Complaint",
        trigger: "policecomplaint",
      },
      { value: 2, label: "Fill a Feedback", trigger: "feedback" },
      { value: 3, label: "Helplines", trigger: "helplines" },
      { value: 4, label: "Nearest Police station near me", trigger: "ask" },
      {value:5,label:"Get Report of Police Station",trigger:"report"}
    ],
  },
  {
    id: "policecomplaint",
    message: "policecomplaint",
    trigger: "options",
  },
  {
    id: "feedback",
    message: `For Filling a feedback these are the steps you need to follow...`,
    trigger: "fillafeedback",
  },
  {
    id:"fillafeedback",
    component:<ChatBotFeedback/>,
    trigger:"options"
  },
  {
    id: "helplines",
    
  component:<ChatBotHelpLines/>,
  trigger:"options"
  },
  {
    id:"ask",
    message:"Sure !,Please Provide me with your Area's Pincode",
    trigger:"input"
  },
  {
    id:"input",
    user:true,
    trigger:"police"

  },
  
  {
    id: "police",
  component:<ChatBotNearest/>,
    trigger: "options",
  },
  { id:"report",
    message:"Please provide me with the name of the district you would want to get a report of",
    trigger:"reportinput",

  },

  { id:"reportinput",
  message:"input",
trigger:"options"

},


];
