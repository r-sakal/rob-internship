import React, { useEffect, useState } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";
import "../css/styles/skeleton.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const resolvedNftId = nftId || "17914494";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails",
          {
            params: { nftId: resolvedNftId },
          }
        );
        setItem(response.data);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [resolvedNftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton
                    className="img-fluid img-rounded mb-sm-30"
                    style={{ width: "100%", aspectRatio: "1 / 1", maxWidth: "540px", margin: "0 auto" }}
                  />
                ) : (
                  <img
                    src={item?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item?.title || "NFT item"}
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton width="320px" height="40px" style={{ marginBottom: "18px" }} />
                  ) : (
                    <h2>{`${item?.title || "Rainbow Style"} #${item?.tag || "194"}`}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width="44px" height="18px" style={{ marginLeft: "8px" }} /> : item?.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width="44px" height="18px" style={{ marginLeft: "8px" }} /> : item?.likes || 0}
                    </div>
                  </div>
                  {loading ? (
                    <div style={{ marginBottom: "24px" }}>
                      <Skeleton width="100%" height="16px" style={{ marginBottom: "8px" }} />
                      <Skeleton width="95%" height="16px" style={{ marginBottom: "8px" }} />
                      <Skeleton width="88%" height="16px" />
                    </div>
                  ) : (
                    <p>
                      {item?.description ||
                        "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                    </p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton className="skeleton-avatar" />
                          ) : (
                            <Link to={`/author/${item?.ownerId || 73855012}`}>
                              <img
                                className="lazy"
                                src={item?.ownerImage || AuthorImage}
                                alt={item?.ownerName || "Owner"}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="120px" height="20px" />
                          ) : (
                            <Link to={`/author/${item?.ownerId || 73855012}`}>
                              {item?.ownerName || "Monica Lucas"}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton className="skeleton-avatar" />
                          ) : (
                            <Link to={`/author/${item?.creatorId || 55757699}`}>
                              <img
                                className="lazy"
                                src={item?.creatorImage || AuthorImage}
                                alt={item?.creatorName || "Creator"}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="130px" height="20px" />
                          ) : (
                            <Link to={`/author/${item?.creatorId || 55757699}`}>
                              {item?.creatorName || "Monica Lucas"}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width="120px" height="30px" />
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{item?.price || 0}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
