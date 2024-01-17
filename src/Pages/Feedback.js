/* eslint-disable array-callback-return */
import React from "react";
import { Auth } from "../Firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SingleFeedbackPost from "../components/SingleFeedbackPost";
import { useSupabase } from "../context/SupabaseContext";
import { Button, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useParams } from "react-router";

const Feedback = () => {
  const {
    fetchVisits,
    visits,
    globalVisits,
    feedback,
    setFeedback,
    tableData: PoliceData,
  } = useSupabase();
  const [policeStations, setPoliceStations] = useState(PoliceData);
  const [user] = useAuthState(Auth);
  const [ImgLinks, setImgLinks] = useState(new Map());
  const [addressLinks, setAddressLinks] = useState(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [flag, setFlag] = useState(true);
  const [sortState, setSortState] = useState("day_Reported");
  const { t } = useTranslation();
  const { documentID } = useParams();
  const blinkDoc = documentID || "";
  const sortMethods = {
    none: { method: null },
    name: { method: "policeStation" },
    name_dsc: { method: "policeStation" },
    day_Reported: { method: "created_at" },
  };

  useEffect(() => {
    if (user) {
      fetchVisits(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sort = (sortState) => {
    if (sortState === "name" || sortState === "rating") {
      feedback.sort(sortBy(sortMethods[sortState].method));
    } else if (sortState === "day_Reported") {
      feedback.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      feedback.reverse();
    }
    setFlag(!flag);
  };

  useEffect(() => {
    const matching_PS = [];
    setPoliceStations(PoliceData);
    for (var i = 0; i < visits.length; i++) {
      const Ps = visits[i].policeStation;
      for (var j = 0; j < policeStations.length; j++) {
        if (Ps === policeStations[j].name) {
          matching_PS.push(policeStations[j]);
        }
      }
    }
    const ImgUrls = new Map();
    const Address = new Map();
    for (var k = 0; k < matching_PS.length; k++) {
      ImgUrls.set(matching_PS[k].name, matching_PS[k].image);
      Address.set(matching_PS[k].name, matching_PS[k].address);
    }
    setImgLinks(ImgUrls);
    setAddressLinks(Address);
  }, [PoliceData, policeStations, visits]);

  const sortBy = (field) => (a, b) =>
    (a[field] > b[field]) - (a[field] < b[field]);

  const handlechange = async (e) => {
    try {
      const response = await axios.post("https://libretranslate.de/translate", {
        q: e.target.value,
        source: "auto",
        target: "en",
      });

      setSearchTerm(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      setSearchTerm(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trimStart().length === 0) {
      alert("Please type a valid Police Station");
      return;
    }
    const temp = globalVisits.filter((item) =>
      item.policeStation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFeedback(temp);
  };

  useEffect(() => {
    sort(sortState)
  },[feedback])

  return (
    <div className="mt-20 md:mt-24 pt-10">
      <div className="w-[80%] mx-auto mb-10 flex flex-col md:flex-row items-center pt-3 justify-between">
        <form className="flex w-full md:w-[50%]" onSubmit={handleSubmit}>
          <Input
            placeholder={t("home.searchPlaceholder")}
            onChange={handlechange}
            className="searchBar shadow-md"
          />

          <Button className="customButton mx-4" type="submit">
            {t("home.search")}
          </Button>
        </form>
        <div className="flex mt-4 md:mt-0">
          <select
            defaultValue="day_Reported"
            className="border rounded px-4 py-2 shadow-md bg-white"
            onChange={(e) => sort(e.target.value)}
          >
            <option value="name">{t("sort.name")}</option>
            <option value="name_dsc">{t("sort.nameDesc")}</option>
            <option value="rating">{t("sort.rating")}</option>
            <option value="rating_dsc">{t("sort.ratingDesc")}</option>
            <option value="day_Reported">{t("sort.dayReported")}</option>
          </select>
          <Button
            className="customButton mx-4"
            onClick={() => {
              sort(sortState);
            }}
          >
            {t("home.sort")}
          </Button>
        </div>
      </div>
      {feedback.map((item) => {
        if (item.feedback) {
          return (
            <SingleFeedbackPost
              key={item.id}
              ImgLinks={ImgLinks}
              addressLinks={addressLinks}
              item={item}
              blink={blinkDoc === item.documentID}
            />
          );
        }
      })}
    </div>
  );
};

export default Feedback;
