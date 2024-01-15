import React, { useEffect, useState } from "react";
import SingleCommPost from "../components/SingleCommPost";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";
import { useSupabase } from "../context/SupabaseContext";
import { useTranslation } from "react-i18next";

function Home() {
  const { tableData: PoliceData } = useSupabase();
  const [searchResults, setSearchResults] = useState(PoliceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [index, setIndex] = useState(6);
  const [flag, setFlag] = useState(true);
  const [loader, setLoader] = useState(false);
  const { loading, statsLoading } = useSupabase();
  const { t } = useTranslation();

  useEffect(() => {
    setSearchResults(PoliceData);
  }, [PoliceData]);

  const handlechange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortBy = (field) => (a, b) =>
    (a[field] > b[field]) - (a[field] < b[field]);
  const sortByRev = (field) => (a, b) =>
    (a[field] < b[field]) - (a[field] > b[field]);

  const showLoader = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setIndex((prevIndex) => prevIndex + 6);
    }, 1000);
  };

  useEffect(() => {
    setSearchResults(searchResults);
    setIndex(6);
  }, [flag, searchResults]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trimStart().length === 0) {
      alert("Please type a valid Police Station");
      return;
    }
    const temp = PoliceData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(temp);
  };
  const sort = (sortState) => {
    console.log(searchResults)
    if (sortState === "name" || sortState === "rating")
      searchResults.sort(sortBy(sortMethods[sortState].method));
    else searchResults.sort(sortByRev(sortMethods[sortState].method));
    setFlag(!flag);
  };

  const [sortState, setSortState] = useState("name");

  const sortMethods = {
    none: { method: null },
    name: { method: "name" },
    name_dsc: { method: "name" },
    rating: { method: "rating" },
    rating_dsc: { method: "rating" },
    day_visited: { method: "" },
  };

  return (
    <div>
      <div className="w-[80%] mx-auto mt-20 md:mt-28 flex flex-col md:flex-row items-center pt-10 justify-between">
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
            defaultValue="None"
            className="border rounded px-4 py-2 shadow-md bg-white"
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="name_dsc">Name Dsc</option>
            <option value="rating">Rating</option>
            <option value="rating_dsc">Rating Dsc</option>
          </select>
          <Button className="customButton mx-4" onClick={() => sort(sortState)}>
            {t("home.sort")}
          </Button>
        </div>
      </div>

      {loading || statsLoading ? (
        <div className="flex justify-center">
          <h1 className="mt-32 text-center text-[#8c4e1d] text-5xl">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#8C4E1D"
              size="xl"
            />
          </h1>
        </div>
      ) : (
        <div className="container w-[80%] mx-auto grid md:grid-cols-3 grid-cols-1 gap-10 mt-8 md:mt-16">
          {searchResults
            .slice(0, Math.min(index, searchResults.length))
            .map((item) => (
              <SingleCommPost key={item.id} item={item} />
            ))}
        </div>
      )}
      {searchResults.length > 0 ? (
        <div className="flex justify-center items-center w-[80%] mx-auto py-5">
          {loader ? (
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
          ) : (
            <div>
              {index < searchResults.length ? (
                <Button
                  onClick={showLoader}
                  className="mx-auto justify-center mt-6 p-8 text-2xl customButton"
                >
                  {t("home.loadMore")}
                </Button>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {!loading && (
            <h1 className="mt-5 text-[#8C4E1D] text-center text-3xl">
              No Police Stations Found
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
