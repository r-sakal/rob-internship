import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/new-items.css";

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
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
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

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatCountdown = (expiryDate) => {
    const timeRemaining = Math.max(expiryDate - currentTime, 0);
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const renderNewItemCard = (item) => (
    <div className="px-2 new-item-card" key={item.id}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={`Creator #${item.authorId}`}
          >
            <img className="lazy" src={item.authorImage} alt={item.title} />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {item.expiryDate ? <div className="de_countdown">{formatCountdown(item.expiryDate)}</div> : null}

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
  );

  const renderSkeletonCard = (_, index) => (
    <div className="px-2 new-item-card" key={index}>
      <div className="nft__item">
        <div className="new-item-skeleton new-item-skeleton-avatar" />
        <div className="new-item-skeleton new-item-skeleton-countdown" />
        <div className="nft__item_wrap">
          <div className="new-item-skeleton new-item-skeleton-image" />
        </div>
        <div className="nft__item_info">
          <div className="new-item-skeleton new-item-skeleton-title" />
          <div className="new-item-skeleton new-item-skeleton-price" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12 new-items-slider">
            <Slider {...sliderSettings}>
              {loading ? new Array(4).fill(0).map(renderSkeletonCard) : items.map(renderNewItemCard)}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
