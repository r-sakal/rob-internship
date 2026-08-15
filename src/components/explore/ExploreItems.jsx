import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import SkeletonCard from "../UI/SkeletonCard";
import "../../css/styles/skeleton.css";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore", {
          params: sortBy ? { filter: sortBy } : {},
        });
        setItems(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [sortBy]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < items.length;

  const handleFilterChange = (event) => {
    setSortBy(event.target.value);
    setVisibleCount(8);
  };

  const handleLoadMore = (event) => {
    event.preventDefault();
    setVisibleCount((previousVisibleCount) => previousVisibleCount + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortBy}
          onChange={handleFilterChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <SkeletonCard
              key={index}
              containerClassName="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              containerStyle={{ display: "block", backgroundSize: "cover" }}
            />
          ))
        : visibleItems.map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator #${item.authorId}`}
                  >
                    <img className="lazy" src={item.authorImage} alt={item.title} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown expiryDate={item.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=Check%20out%20this%20NFT">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {!loading && hasMoreItems ? (
        <div className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
            Load more
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default ExploreItems;
