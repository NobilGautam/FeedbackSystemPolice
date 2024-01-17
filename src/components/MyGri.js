import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import SingleFeedbackPost from "./SingleFeedbackPost";

const MyGri = () => {
  const { fetchGri, gri } = useSupabase();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchGri();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setData(gri);
  }, [gri]);

  return (
    <div className="mt-20 md:mt-24 pt-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => {
            return <div>
                <p>{item.created_at}</p>
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>{item.policeStation}</p>
                <p>{item.subject}</p>
                <p>{item.explain}</p>
            </div>
        })
      )}
    </div>
  );
};

export default MyGri;
