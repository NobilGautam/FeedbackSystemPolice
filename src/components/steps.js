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
      { value: 4, label: "Nearest Police station near me", trigger: "police" },
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
    trigger: "options",
  },
  {
    id: "helplines",
    message: "helplines",
    trigger: "options",
  },
  {
    id: "police",
    message: "police",
    trigger: "options",
  },
];
