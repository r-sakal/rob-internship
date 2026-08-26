import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import useApiData from "../UI/api/useApiData";
import "../../css/styles/skeleton.css";

const TopSellers = () => {
  const { data: sellersData, loading } = useApiData(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    {
      initialData: [],
      errorMessage: "Failed to fetch top sellers:",
    }
  );

  const sellers = Array.isArray(sellersData) ? sellersData : [];

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton className="skeleton-avatar" />
                      </div>
                      <div className="author_list_info">
                        <Skeleton className="skeleton-title" />
                        <Skeleton className="skeleton-text" />
                      </div>
                    </li>
                  ))
                : sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId || 73855012}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId || 73855012}`}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
