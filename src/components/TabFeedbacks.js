import React, { useEffect } from "react";
import { useSupabase } from "../context/SupabaseContext";
import IndFeedback from "./IndFeedback";

const TabFeedbacks = ({ policeStation }) => {
  const { fetchReviews, reviews, reviewLoader } = useSupabase();
  useEffect(() => {
    fetchReviews(policeStation);
  }, []);
  return (
    <div>
      {reviewLoader ? (
        <>Loading</>
      ) : (
        <>
          {reviews
            .filter((item) => item.feedback !== null)
            .map((item) => (
              <IndFeedback key={item.id} item={item} />
            ))}
        </>
      )}
    </div>
  );
};

export default TabFeedbacks;
