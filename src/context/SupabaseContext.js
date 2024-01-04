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
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [individual, setIndividual] = useState("");

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

  const fetchVisits = async (userEmail) => {
    try {
      const { data, error } = await supabase
        .from(visitsTableName)
        .select("*")
        .filter("email", "eq", userEmail);

      if (error) {
        console.error("Error fetching visits:", error.message);
      } else {
        setVisits(data || []);
      }
    } catch (error) {
      console.error("Error fetching visits:", error.message);
    }
  };

  const handleSubmit = async (form) => {
    try {
      // Send form data to the "visits" table in Supabase
      const { data, error } = await supabase.from(visitsTableName).upsert([
        {
          name: form.name,
          age: form.age,
          email: form.email,
          policeStation: form.pstation,
          created_at: new Date().toISOString(),
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

  const updateVisit = async (documentId, form) => {
    try {
      // Update visit data in the "visits" table in Supabase
      const { data, error } = await supabase
        .from(visitsTableName)
        .update([
          {
            name: form.name,
            age: form.age,
            email: form.email,
            policeStation: form.pstation,
            gender: form.gender,
            feedback: form.feedback,
            purpose: form.purpose,
            Feel: form.Feel,
          },
        ])
        .match({ documentID: documentId });

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully:", data);
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
      }
    } catch (error) {
      console.error("Error fetching visits:", error.message);
    }
  }

  return (
    <SupabaseContext.Provider
      value={{
        tableData,
        loading,
        individual,
        visits,
        reviews,
        setIndividual,
        handleSubmit,
        fetchVisits,
        updateVisit,
        fetchReviews,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
