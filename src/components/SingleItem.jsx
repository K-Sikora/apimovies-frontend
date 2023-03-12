import React, { useState } from "react";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import Similar from "./SingleItem/Similar";
import Keywords from "./SingleItem/Keywords";
import ItemInfo from "./SingleItem/ItemInfo";
import ItemCoverImage from "./SingleItem/ItemCoverImage";
import axios from "axios";
import ItemDetails from "./SingleItem/ItemDetails";
import { useQuery } from "react-query";

const SingleItem = () => {
  const { itemType, id } = useParams();
  const [episodesVisible, setEpisodesVisible] = useState(false);
  const [isVisibleKeywords, setIsVisibleKeywords] = useState(false);

  //Get current item  data

  const getItemData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/${itemType}/${id}`
    );
    console.log(response.data);
    return response.data;
  };

  const { data: itemData, isLoading } = useQuery({
    queryKey: ["itemData"],
    queryFn: getItemData,
    refetchOnWindowFocus: false,
  });

  //Get keywords of current item

  const getKeywords = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/${itemType}/keywords/${id}`
    );
    console.log(response.data);
    return response.data;
  };

  const { data: keyword } = useQuery({
    queryKey: ["keyword"],
    queryFn: getKeywords,
    refetchOnWindowFocus: false,
  });

  //Get similar movie/show to current item

  const getSimilar = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/${itemType}/similar/${id}`
    );
    return response.data;
  };

  const { data: similar } = useQuery({
    queryKey: ["similar"],
    queryFn: getSimilar,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <NotFound />;
  }
  return (
    <div className="bg-stone-800 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        {itemData && (
          <div className="min-h-screen gap-6 bg-stone-800 flex flex-col   py-5 px-0 justify-start">
            <ItemInfo
              episodesVisible={episodesVisible}
              setEpisodesVisible={setEpisodesVisible}
              itemData={itemData}
            />
            <ItemCoverImage
              id={id}
              itemData={itemData}
              itemType={itemType}
            />
            <ItemDetails
              itemData={itemData}
              keyword={keyword}
              setIsVisibleKeywords={setIsVisibleKeywords}
              isVisibleKeywords={isVisibleKeywords}
            />

            <Keywords
              isVisibleKeywords={isVisibleKeywords}
              keyword={keyword}
              itemData={itemData}
              itemType={itemType}
            />
            <Similar
              similar={similar}
              itemType={itemType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
