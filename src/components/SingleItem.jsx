import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { useParams } from "react-router-dom";
import Similar from "./SingleItem/Similar";
import Keywords from "./SingleItem/Keywords";
import ItemInfo from "./SingleItem/ItemInfo";
import ItemCoverImage from "./SingleItem/ItemCoverImage";
import axios from "axios";
import ItemDetails from "./SingleItem/ItemDetails";
import { useQuery } from "react-query";
import Loading from "./Loading";
import NotFound from "./NotFound";
const SingleItem = () => {
  const { itemType, id } = useParams();
  const [episodesVisible, setEpisodesVisible] = useState(false);
  const [isVisibleKeywords, setIsVisibleKeywords] = useState(false);

  //Get current item  data

  const getItemData = async () => {
    const response = await axios.get(
      `https://app-backend.adaptable.app/api/${itemType}/${id}`
    );
    return response.data;
  };

  const { data: itemData, isLoading: isLoading2 } = useQuery({
    queryKey: ["itemData"],
    queryFn: getItemData,
    refetchOnWindowFocus: false,
  });

  //Get keywords of current item

  const getKeywords = async () => {
    const response = await axios.get(
      `https://app-backend.adaptable.app/api/${itemType}/keywords/${id}`
    );
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
      `https://app-backend.adaptable.app/api/${itemType}/similar/${id}`
    );
    return response.data;
  };

  const { data: similar, isLoading } = useQuery({
    queryKey: ["similar"],
    queryFn: getSimilar,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <NotFound />;
  }
  return (
    <div className=" dark:text-light text-dark-900">
      <Layout>
        <div className="max-w-6xl mx-auto">
          {itemData && (
            <div className="min-h-screen gap-6 dark:bg-dark-900 bg-stone-100 duration-300 flex flex-col py-5 px-0 justify-start">
              {isLoading2 ? (
                <Loading />
              ) : (
                <ItemInfo
                  episodesVisible={episodesVisible}
                  setEpisodesVisible={setEpisodesVisible}
                  itemData={itemData}
                />
              )}

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
              {isLoading ? (
                <Loading />
              ) : (
                <Similar
                  similar={similar}
                  itemType={itemType}
                />
              )}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default SingleItem;
