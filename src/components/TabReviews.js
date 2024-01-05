import React, { useEffect } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { ColorRing } from "react-loader-spinner";

function TabReviews({ policeStationName }) {
  const { fetchReviews, reviews,reviewLoader } = useSupabase();
  useEffect(() => {
    fetchReviews(policeStationName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function convertToISTAndFormatDate(inputDate) {
    // Convert input string to Date object
    const inputDateTime = new Date(inputDate);
  
    // Convert to IST (Indian Standard Time)
    inputDateTime.setUTCHours(inputDateTime.getUTCHours() + 5);
    inputDateTime.setUTCMinutes(inputDateTime.getUTCMinutes() + 30);
  
    // Format date as "Numeric Day, short Month Year"
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Kolkata', // Set the time zone to IST
    };
  
    const formattedDate = inputDateTime.toLocaleString('en-IN', options);
    return formattedDate;
  }
if(reviewLoader){
  return (<div className="flex justify-center">
  <h1 className="mt-32 text-center text-[#8c4e1d] text-5xl">
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#8C4E1D", "#8C4E1D", "#8C4E1D", "#8C4E1D", "#8C4E1D"]}
    />
  </h1>
</div>)
}
  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 gap-10 md:p-4">
      {reviews.length === 0 ? (
        <h1 className="text-[#8c4e1d] text-xl font-semibold">No reviews found for {policeStationName}</h1>
      ) : (
        reviews
          .filter((item) => item.feedback !== null)
          .map((item) => (
            <div
              key={item.documentID}
              className={item.Feel > 0 ? 'border-green-500 border p-4 rounded-md' : 'border-red-500 border p-4 rounded-md'}
            >
              <div className="flex justify-between">
                <h1 className="font-bold">{item.name}</h1>
                <h1 className="text-gray-500">{convertToISTAndFormatDate(item.created_at)}</h1>
              </div>
              <hr></hr>
              <h1 className="mt-2">{item.feedback}</h1>
            </div>
          ))
      )}
    </div>
  );
  
}

export default TabReviews;
