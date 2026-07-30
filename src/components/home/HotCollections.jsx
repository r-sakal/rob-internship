import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/styles/skeleton.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Failed to fetch hot collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading
            ? new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div className="skeleton-box skeleton-image" />
                    </div>
                    <div className="nft_coll_pp">
                      <div className="skeleton-box skeleton-avatar" />
                    </div>
                    <div className="nft_coll_info">
                      <div className="skeleton-box skeleton-title" />
                      <div className="skeleton-box skeleton-text" />
                    </div>
                  </div>
                </div>
              ))
            : collections.map((hot_collections) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={hot_collections.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={hot_collections.nftImage} className="lazy img-fluid" alt={hot_collections.title} />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={hot_collections.authorImage} alt={hot_collections.title} />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{hot_collections.title}</h4>
                      </Link>
                      <span>ERC-{hot_collections.code}</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
