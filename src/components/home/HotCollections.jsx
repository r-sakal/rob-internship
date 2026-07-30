import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/skeleton.css";
import "../../css/styles/slider.css";
import "../../css/styles/hot-collection-card.css";

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  swipeToSlide: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

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

  const hotCollectionCard = (collection) => (
    <div className="px-2 hot-collection-card" key={collection.id}>
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to="/item-details">
            <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to="/author">
            <img className="lazy pp-coll" src={collection.authorImage} alt={collection.title} />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4>{collection.title}</h4>
          </Link>
          <span>ERC-{collection.code}</span>
        </div>
      </div>
    </div>
  );

  const SkeletonCard = (_, index) => (
    <div className="px-2 hot-collection-card" key={index}>
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
  );

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
          <div className="col-lg-12">
            <Slider {...sliderSettings}>
              {loading ? new Array(4).fill(0).map(SkeletonCard) : collections.map(hotCollectionCard)}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
