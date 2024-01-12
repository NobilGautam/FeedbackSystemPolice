/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { encrypt,decrypt } from "n-krypta";

const SupabaseContext = createContext();

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
  const supabase = createClient(
    "https://wbddiuietsgrlxuitvda.supabase.co",
    process.env.REACT_APP_SUPABASE_KEY
  );

  const policeStationTableName = "policeStations";
  const visitsTableName = "visits";
  const psStats="psStats"
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [individual, setIndividual] = useState("");
  const [reviewLoader,setReviewLoader]=useState(true);
  const [visitsLoader,setVisitsLoader]=useState(true);
  const[globalVisits,setGlobalVisits]=useState([]);
  const [feedback,setFeedback]=useState([]);
  const [stats,setStats]=useState(null);
  const [allPolice,setAllPolice]=useState([]);
  const [statsLoading,setStatsLoading]=useState(true);
  const [QR,setQR]=useState(false);
  const [show2,setShow2]=useState(false);
  const [modalFlag,setModalFlag]=useState(true);

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
  useEffect(()=>{
    const fetchAllStats=async()=>{
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
  
    }
    fetchAllStats();
  },[])

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
        
        setGlobalVisits(data||[]);
        setFeedback(data||[]);
        setVisitsLoader(false);
      }
    } catch (error) {
      console.error("Error fetching visits:", error.message);
    }
  };
  const fetchStats=async(ps)=>{
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

  }


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
          mobile:form.mobile
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
            rating: form.overallRating,
            time: form.time,
            behaviour: form.pbehaviour,
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
        setReviewLoader(false);
      }
    } catch (error) {
      console.error("Error fetching visits:", error.message);
    }
  }

  return (
    <SupabaseContext.Provider
      value={{
        globalVisits,
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
        reviewLoader,
        setReviewLoader,
        visitsLoader,
        setVisits,
        feedback,
        setFeedback,
        fetchStats,
        stats,
        allPolice,
        QR,
        setQR,
        show2,
        setShow2,
        modalFlag,
        setModalFlag
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
