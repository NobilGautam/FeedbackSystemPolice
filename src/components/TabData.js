import React, { useEffect } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { ArcElement, Chart as ChartJs, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);
function TabData({ policeData }) {
  const { fetchStats, stats } = useSupabase();

  useEffect(() => {
    fetchStats(policeData.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policeData.name]);

  if (!stats) {
    return null;
  }
  const customOptions = {
    responsive: false, // Set to false to use custom height and width
    maintainAspectRatio: false, // Set to false to allow custom height and width
    height: 400, // Set the desired height
    width: 800, // Set the desired width
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
        backgroundColor: ["red", "green", "orange", "blue", "grey"],
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
        backgroundColor: ["red", "green", "orange", "blue", "grey"],
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
        backgroundColor: ["red", "green", "orange", "blue", "grey"],
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
        backgroundColor: ["red", "green", "orange", "blue", "grey"],
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
        backgroundColor: ["red", "green", "orange", "blue", "grey"],
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
        backgroundColor: ["red", "green", "orange"],
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

  return (
    <div className="overflow-scroll max-h-full">
      <div className="grid sm:grid-cols-2 w-[100%] py-5 justify-center">
        <Pie data={gender_data} options={customOptions}></Pie>
        <Pie data={feedback_data} options={customOptions}></Pie>
        <Pie data={follow_data} options={customOptions}></Pie>
        <Pie data={wait_data} options={customOptions}></Pie>
        <Pie data={behavior_data} options={customOptions}></Pie>
        <Pie data={guidance_data} options={customOptions}></Pie>
        <Pie data={help_data} options={customOptions}></Pie>
        <Pie data={infra_data} options={customOptions}></Pie>
        <Pie data={rating_data} options={customOptions}></Pie>
      </div>
    </div>
  );
} //

export default TabData;
