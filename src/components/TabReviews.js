import React, { useEffect } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { Spinner } from "@chakra-ui/react";
import { decrypt } from "n-krypta";
import { useTranslation } from "react-i18next";
function TabReviews({ policeStationName }) {
  const { fetchReviews, reviews, reviewLoader } = useSupabase();
  const { t } = useTranslation();
  useEffect(() => {
    fetchReviews(policeStationName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policeStationName]);

  function convertToISTAndFormatDate(inputDate) {
    const inputDateTime = new Date(inputDate);

    inputDateTime.setUTCHours(inputDateTime.getUTCHours() + 5);
    inputDateTime.setUTCMinutes(inputDateTime.getUTCMinutes() + 30);

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
                  <h1 className="font-bold">{t("single.anonymous")}</h1>
                  <h1 className="text-gray-500">
                    {convertToISTAndFormatDate(item.created_at)}
                  </h1>
                </div>
                <hr></hr>
                <h1 className="mt-2">
                  {decrypt(
                    item.feedback,
                    toString(process.env.REACT_APP_SECRET_KEY)
                  )}
                </h1>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default TabReviews;
