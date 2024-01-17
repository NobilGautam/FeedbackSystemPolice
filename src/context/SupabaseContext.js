/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext();

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
  const supabase = createClient(
    "https://wbddiuietsgrlxuitvda.supabase.co",
    process.env.REACT_APP_SUPABASE_KEY
  );

  const policeStationTableName = "policeStations";
  const visitsTableName = "visits";
  const psStats = "psStats";
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [individual, setIndividual] = useState("");
  const [reviewLoader, setReviewLoader] = useState(true);
  const [visitsLoader, setVisitsLoader] = useState(true);
  const [globalVisits, setGlobalVisits] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);
  const [allPolice, setAllPolice] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [psstatsLoading, setPsStatsLoading] = useState(true);
  const [QR, setQR] = useState(false);
  const [show2, setShow2] = useState(false);
  const [gri, setGri] = useState([]);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const { data, error } = await supabase
          .from(policeStationTableName)
          .select("*")
          .order("id");

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setTableData(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchTableData();
  }, []);
  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const { data, error } = await supabase
          .from(psStats)
          .select("*")
          .order("id");

        if (error) {
          console.error("Error fetching visits:", error.message);
        } else {
          setAllPolice(data);
          setStatsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching visits:", error.message);
      }
    };
    fetchAllStats();
  }, []);

  const fetchVisits = async (userEmail, documentID) => {
    try {
      let supabaseQuery = supabase.from(visitsTableName).select("*");

      if (userEmail) {
        supabaseQuery = supabaseQuery.filter("email", "eq", userEmail);
      }

      if (documentID) {
        supabaseQuery = supabaseQuery.filter("documentID", "eq", documentID);
      }

      const { data, error } = await supabaseQuery;

      if (error) {
        console.error("Error fetching visits:", error.message);
      } else {
        const visitsData = data || [];
        setVisits(visitsData);
        setGlobalVisits(visitsData);
        setFeedback(visitsData);
        setVisitsLoader(false);
        return visitsData;
      }
    } catch (error) {
      console.error("Error fetching visits:", error.message);
    }
  };

  const fetchStats = async (ps) => {
    try {
      const { data, error } = await supabase
        .from(psStats)
        .select("*")
        .filter("policeStation", "eq", ps);

      if (error) {
        console.error("Error fetching visits:", error.message);
      } else {
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching visits:", error.message);
    }
  };

  const fetchGri = async () => {
    try {
      const { data, error } = await supabase.from("gri").select("*");

      if (error) {
        console.error("Error fetching Grievance:", error.message);
        throw error;
      } else {
        setGri(data);
      }
    } catch (error) {
      console.error("Error fetching Grievance:", error.message);
      throw error;
    }
  };

  const handleSubmit = async (form) => {
    try {
      const { data, error } = await supabase.from(visitsTableName).upsert([
        {
          name: form.name,
          age: form.age,
          email: form.email,
          policeStation: form.pstation,
          created_at: new Date().toISOString(),
          mobile: form.mobile,
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
      }
    } catch (error) {
      console.error("Error processing form submission:", error.message);
    }
  };

  const griSubmit = async (formData) => {
    try {
      const { data, error } = await supabase.from("gri").insert([
        {
          name: formData.name,
          created_at: new Date().toISOString(),
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          subject: formData.subject,
          policeStation: formData.policeStation,
          explanation: formData.explanation,
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
      }
    } catch (error) {
      console.error("Error processing form submission:", error.message);
    }
  };

  const [statsData, updateData] = useState([]);
  const [psStatsData, setPsStats] = useState([]);
  const [formData, setFormData] = useState([]);
  const fetchPSstats = async (form) => {
    try {
      const { data, error } = await supabase
        .from(psStats)
        .select("*")
        .filter("policeStation", "eq", form.pstation);
      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully");
        updateData(data);
      }
    } catch (error) {
      console.error("Error updating visit:", error.message);
    }
  };

  const fetchPSstatsName = async (ps) => {
    try {
      setPsStatsLoading(true)
      const { data, error } = await supabase
        .from(psStats)
        .select("*")
        .filter("policeStation", "eq", ps);
      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully");
        setPsStats(data)
        setPsStatsLoading(false)
      }
    } catch (error) {
      console.error("Error updating visit:", error.message);
    }
  };

  const updatePSstats = async (data, formData) => {
    if (formData.gender === "male") data[0].Gender_Male++;
    else if (formData.gender === "female") data[0].Gender_Female++;
    else data[0].Gender_Others++;

    if (formData.infra === "Excellent") data[0].Infra_Excellent++;
    else if (formData.infra === "Good") data[0].Infra_Good++;
    else if (formData.infra === "Average") data[0].Infra_Average++;
    else if (formData.infra === "Below Average") data[0].Infra_Below_Average++;
    else data[0].Infra_Poor++;

    if (formData.overallRating === 5) data[0].Overall_Excellent++;
    else if (formData.overallRating === 4) data[0].Overall_Good++;
    else if (formData.overallRating === 3) data[0].Overall_Average++;
    else if (formData.overallRating === 2) data[0].Overall_Below_Average++;
    else data[0].Overall_Poor++;

    if (formData.phelpful === "Excellent") data[0].Help_Excellent++;
    else if (formData.phelpful === "Good") data[0].Help_Good++;
    else if (formData.phelpful === "Average") data[0].Help_Average++;
    else if (formData.phelpful === "Below Average")
      data[0].Help_Below_Average++;
    else data[0].Help_Poor++;

    if (formData.pguidance === "Excellent") data[0].Guidance_Excellent++;
    else if (formData.pguidance === "Good") data[0].Guidance_Good++;
    else if (formData.pguidance === "Average") data[0].Guidance_Average++;
    else if (formData.pguidance === "Below Average")
      data[0].Guidance_Below_Average++;
    else data[0].Guidance_Poor++;

    if (formData.time === "Immediately") data[0].Waiting_None++;
    else if (formData.time === "5 Mins") data[0].Waiting_Five++;
    else if (formData.time === "10 Mins") data[0].Waiting_Ten++;
    else if (formData.time === "15 Mins") data[0].Waiting_Fifteen++;
    else data[0].Waiting_More_Fifteen++;

    if (formData.pguidance === "Abusive") data[0].Behaviour_Abusive++;
    else if (formData.pguidance === "Rude") data[0].Behaviour_Rude++;
    else data[0].Behaviour_Polite++;

    data[0].ps_Rating = Math.max(
      1,
      Math.min(
        5,
        Math.floor(
          (data[0].Overall_Excellent +
            2 * data[0].Overall_Good +
            3 * data[0].Overall_Average +
            4 * data[0].Overall_Below_Average +
            5 * data[0].Overall_Poor) /
            (data[0].Overall_Excellent +
              data[0].Overall_Good +
              data[0].Overall_Average +
              data[0].Overall_Below_Average +
              data[0].Overall_Poor)
        )
      )
    );

    if (formData.overallRating >= 3) data[0].Positive_Feedback++;
    else data[0].Negative_Feedback++;

    try {
      const { error } = await supabase
        .from(psStats)
        .update(data)
        .match({ policeStation: formData.pstation });

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully");
      }
    } catch (error) {
      console.error("Error updating visit:", error.message);
    }
  };

  useEffect(() => {
    if (statsData.length !== 0) updatePSstats(statsData, formData);
  }, [statsData]);

  const updateVisit = async (documentId, form, followup) => {
    try {
      let updateData;

      if (form) {
        // Code block for handling form data
        updateData = {
          name: form.name,
          age: form.age,
          email: form.email,
          policeStation: form.pstation,
          gender: form.gender,
          feedback: form.feedback,
          purpose: form.purpose,
          Feel: form.Feel,
          rating: form.overallRating,
          time: form.time,
          behaviour: form.pbehaviour,
          guidance: form.pguidance,
          helpfulness: form.phelpful,
          infrastructure: form.infra,
        };
      } else if (followup) {
        updateData = {
          follow_up: followup,
        };
      } else {
        console.error("Neither form nor followup provided for update.");
        return;
      }

      const { data, error } = await supabase
        .from(visitsTableName)
        .update([updateData])
        .match({ documentID: documentId });

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully:", data);
        fetchPSstats(form);
        setFormData(form);
      }
    } catch (error) {
      console.error("Error updating visit:", error.message);
    }
  };

  const fetchReviews = async (policeStation) => {
    try {
      const { data, error } = await supabase
        .from(visitsTableName)
        .select("*")
        .filter("policeStation", "eq", policeStation);

      if (error) {
        console.error("Error fetching visits:", error.message);
      } else {
        setReviews(data || []);
        setReviewLoader(false);
      }
    } catch (error) {
      console.error("Error fetching visits:", error.message);
    }
  };

  return (
    <SupabaseContext.Provider
      value={{
        globalVisits,
        tableData,
        loading,
        individual,
        visits,
        reviews,
        reviewLoader,
        visitsLoader,
        feedback,
        stats,
        allPolice,
        QR,
        show2,
        gri,
        psStatsData,
        psstatsLoading,
        fetchPSstatsName,
        setIndividual,
        handleSubmit,
        fetchVisits,
        updateVisit,
        fetchReviews,
        setReviewLoader,
        setVisits,
        setFeedback,
        fetchStats,
        setQR,
        setShow2,
        fetchGri,
        griSubmit,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
