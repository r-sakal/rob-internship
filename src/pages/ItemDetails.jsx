import React, { useEffect, useState } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails",
          {
            params: { nftId: 17914494 },
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
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item?.title || "NFT item"}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading
                      ? "Loading item details..."
                      : `${item?.title || "Rainbow Style"} #${item?.tag || "194"}`}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item?.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item?.likes || 0}
                    </div>
                  </div>
                  <p>
                    {item?.description ||
                      "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.ownerId || 73855012}`}>
                            <img
                              className="lazy"
                              src={item?.ownerImage || AuthorImage}
                              alt={item?.ownerName || "Owner"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.ownerId || 73855012}`}>
                            {item?.ownerName || "Monica Lucas"}
                          </Link>
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
                          <Link to={`/author/${item?.creatorId || 55757699}`}>
                            <img
                              className="lazy"
                              src={item?.creatorImage || AuthorImage}
                              alt={item?.creatorName || "Creator"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.creatorId || 55757699}`}>
                            {item?.creatorName || "Monica Lucas"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item?.price || 0}</span>
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
