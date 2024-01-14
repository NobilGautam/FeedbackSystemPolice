import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { ArcElement, Chart as ChartJs, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
  Text,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Modal,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
ChartJs.register(ArcElement, Tooltip, Legend);
function TabData({ policeData }) {
  const OverlayOne = () => (
    <ModalOverlay bg="none" backdropFilter="blur(10px)" backdropBlur="10px" />
  );

  const { fetchStats, stats } = useSupabase();
  const [selectedChart, setSelectedChart] = useState("Feedback");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [status, setStatus] = useState("Connecting to server...");
  useEffect(() => {
    fetchStats(policeData.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policeData.name]);

  if (!stats) {
    return null;
  }
  const customOptions = {
    maintainAspectRatio: false, // Set to false to allow custom height and width
    height: 800, // Set the desired height
    width: 1200, // Set the desired width
    plugins: {
      legend: {
        display: true,
        position: "chartArea",
        labels: {
          boxWidth: 10, // Set the width of the colored boxes in the legend
        },
      },
    },
  };

  const follow_data = {
    labels: ["No Response", "Resolved", "Resolving"],
    datasets: [
      {
        data: [
          stats[0].Follow_No_Response,
          stats[0].Follow_Resolved,
          stats[0].Follow_Resolving,
        ],
        backgroundColor: ["red", "green", "orange"],
      },
    ],
  };
  const wait_data = {
    labels: [
      "Immediately",
      "5 Mins",
      "10 Mins",
      "15 Mins",
      "More than 15 Mins",
    ],
    datasets: [
      {
        data: [
          stats[0].Waiting_None,
          stats[0].Waiting_Five,
          stats[0].Waiting_Ten,
          stats[0].Waiting_Fifteen,
          stats[0].Waiting_More_Fifteen,
        ],
        backgroundColor: ["green", "orange", "blue", "grey", "red"],
      },
    ],
  };
  const guidance_data = {
    labels: ["Poor", "Below Average", "Average", "Good", "Excellent"],
    datasets: [
      {
        data: [
          stats[0].Guidance_Poor,
          stats[0].Guidance_Below_Average,
          stats[0].Guidance_Average,
          stats[0].Guidance_Good,
          stats[0].Guidance_Excellent,
        ],
        backgroundColor: ["red", "grey", "blue", "orange", "green"],
      },
    ],
  };
  const infra_data = {
    labels: ["Poor", "Below Average", "Average", "Good", "Excellent"],
    datasets: [
      {
        data: [
          stats[0].Infra_Poor,
          stats[0].Infra_Below_Average,
          stats[0].Infra_Average,
          stats[0].Infra_Good,
          stats[0].Infra_Excellent,
        ],
        backgroundColor:  ["red", "grey", "blue", "orange", "green"],
      },
    ],
  };
  const rating_data = {
    labels: ["Poor", "Below Average", "Average", "Good", "Excellent"],
    datasets: [
      {
        data: [
          stats[0].Overall_Poor,
          stats[0].Overall_Below_Average,
          stats[0].Overall_Average,
          stats[0].Overall_Good,
          stats[0].Overall_Excellent,
        ],
        backgroundColor: ["red", "grey", "blue", "orange", "green"],
      },
    ],
  };
  const help_data = {
    labels: ["Poor", "Below Average", "Average", "Good", "Excellent"],
    datasets: [
      {
        data: [
          stats[0].Help_Poor,
          stats[0].Help_Below_Average,
          stats[0].Help_Average,
          stats[0].Help_Good,
          stats[0].Help_Excellent,
        ],
        backgroundColor: ["red", "grey", "blue", "orange", "green"],
      },
    ],
  };
  const behavior_data = {
    labels: ["Abusive", "Rude", "Polite"],
    datasets: [
      {
        data: [
          stats[0].Behaviour_Abusive,
          stats[0].Behaviour_Rude,
          stats[0].Behaviour_Polite,
        ],
        backgroundColor: ["red", "grey", "green"],
      },
    ],
  };
  const gender_data = {
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        data: [
          stats[0].Gender_Male,
          stats[0].Gender_Female,
          stats[0].Gender_Others,
        ],
        backgroundColor: ["blue", "green", "grey"],
      },
    ],
  };
  const feedback_data = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [stats[0].Positive_Feedback, stats[0].Negative_Feedback],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  const chartData = [
    { data: gender_data, label: "Gender" },
    { data: feedback_data, label: "Feedback" },
    { data: follow_data, label: "Follow" },
    { data: wait_data, label: "Waiting Period" },
    { data: behavior_data, label: "Behavior" },
    { data: guidance_data, label: "Guidance" },
    { data: help_data, label: "Help" },
    { data: infra_data, label: "Infrastructure" },
    { data: rating_data, label: "Overall Rating" },
  ];

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };
  const handleClick = async () => {
    setOverlay(<OverlayOne />);
    onOpen();

    try {
      setStatus("Connecting to server...");

      const data = await fetch(
        `https://flask-api-render-gzze.onrender.com/fetch_stats?send_email=false&ps=${policeData.name}`
      );

      setStatus("Creating file...");

      const blob = await data.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const a = document.createElement("a");
      a.href = url;
      a.download = `${policeData.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setStatus("Download complete!");
      onClose();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="h-full p-4">
      <div className="">
        <label htmlFor="chartSelector" className="mr-2">
          Select Data
        </label>
        <Select
          id="chartSelector"
          value={selectedChart}
          onChange={handleChartChange}
          className="bg-gray-300"
        >
          {chartData.map((chart, index) => (
            <option key={index} value={chart.label}>
              {chart.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="mt-12">
        {chartData.map((chart, index) => (
          <div
            key={index}
            style={{
              display: selectedChart === chart.label ? "block" : "none",
            }}
            className="h-full"
          >
            <Pie
              className="w-full h-full"
              data={chart.data}
              options={customOptions}
            ></Pie>
          </div>
        ))}
      </div>
      <Button className="customButton" onClick={handleClick}>
        Download Detailed PDF
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h1 className="text-2xl text-[#8C4E1D] font-sans font-semibold">
              {" "}
              Rajasthan Police
            </h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex items-center justify-center h-full">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#8C4E1D"
                size="xl"
              />
            </div>
            <div className="text-center text-xl text-[#8C4E1D]">{status}</div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TabData;
