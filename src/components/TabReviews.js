import React, { useEffect } from "react";
import { useSupabase } from "../context/SupabaseContext";
// import { ColorRing } from "react-loader-spinner";
// import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { decrypt, encrypt } from "n-krypta";
// import { ThreeDots } from "react-loader-spinner";
function TabReviews({ policeStationName }) {
  const { fetchReviews, reviews, reviewLoader } = useSupabase();
  useEffect(() => {
    fetchReviews(policeStationName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const [index, setIndex] = useState(4);
  // const [loader, setLoader] = useState(false);

  // const showLoader = () => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
  //     setIndex((prevIndex) => prevIndex + 6);
  //   }, 1000);
  // };

  function convertToISTAndFormatDate(inputDate) {
    // Convert input string to Date object
    const inputDateTime = new Date(inputDate);

    // Convert to IST (Indian Standard Time)
    inputDateTime.setUTCHours(inputDateTime.getUTCHours() + 5);
    inputDateTime.setUTCMinutes(inputDateTime.getUTCMinutes() + 30);

    // Format date as "Numeric Day, short Month Year"
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata", // Set the time zone to IST
    };

    const formattedDate = inputDateTime.toLocaleString("en-IN", options);
    return formattedDate;
  }
  if (reviewLoader) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#8C4E1D"
          size="xl"
        />
      </div>
    );
  }




  // const data=encrypt('dddddddddddddddddd',toString(process.env.REACT_APP_SECRET_KEY));
  // console.log(data);
  // console.log(decrypt(data,toString(process.env.REACT_APP_SECRET_KEY)));

  return (
    <div className="p-4">
      <div className="container grid reviews-container md:grid-cols-2 grid-cols-1 gap-5">
        {reviews.length === 0 ? (
          <h1 className="text-[#8c4e1d] text-xl font-semibold">
            No reviews found for {policeStationName}
          </h1>
        ) : (
          reviews
            .filter((item) => item.feedback !== null)
            .map((item) => (
              <div
                key={item.documentID}
                className={
                  item.Feel > 0
                    ? "border-green-500 border p-4 rounded-md"
                    : "border-red-500 border p-4 rounded-md"
                }
              >
                <div className="flex justify-between">
                  <h1 className="font-bold">Anonymous</h1>
                  <h1 className="text-gray-500">
                    {convertToISTAndFormatDate(item.created_at)}
                  </h1>
                </div>
                <hr></hr>
                <h1 className="mt-2">{decrypt(item.feedback,toString(process.env.REACT_APP_SECRET_KEY))}</h1>
              </div>
            ))
        )}
      </div>
        {/* <div className="flex justify-center">
          {!loader ? (
            <div>
              {index < reviews.length ? (
                <Button onClick={showLoader} className="customButton">
                  Load More
                </Button>
              ) : (
                ""
              )}
            </div>
          ) : (
            <h1>
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#8C4E1D"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            </h1>
          )}
        </div> */}
    </div>
  );
}

export default TabReviews;
