/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext();

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
  // Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_API_KEY' with your Supabase project URL and API key
  const supabase = createClient("https://wbddiuietsgrlxuitvda.supabase.co", process.env.REACT_APP_SUPABASE_KEY);

  // Replace 'YOUR_TABLE_NAME' with the name of the table you want to read
  const tableName = "policeStations";

  // State to hold the fetched data
  const [tableData, setTableData] = useState([]);
  // const [policeData, setPoliceData] = useState({});

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        // Fetch all rows from the specified table
        const { data, error } = await supabase.from(tableName).select("*");

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          // Update state with the retrieved data
          setTableData(data || []);
          // setPoliceData(data||[]);
  
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    // Call the function to fetch data when the context provider mounts
    fetchTableData();
  }, []); // The empty dependency array ensures that this effect runs only once when the context provider mounts

  return (
    <SupabaseContext.Provider value={{ tableData }}>
      {children}
    </SupabaseContext.Provider>
  );
};
