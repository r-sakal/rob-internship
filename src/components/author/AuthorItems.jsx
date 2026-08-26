import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "../../css/styles/skeleton.css";

const AuthorItems = ({ items = [], authorImage, authorId, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton className="new-item-skeleton-avatar" />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton className="new-item-skeleton-image" />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton className="new-item-skeleton-title" />
                      <Skeleton className="new-item-skeleton-price" />
                    </div>
                  </div>
                </div>
              ))
            : items.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${authorId || 73855012}`}>
                        <img className="lazy" src={authorImage} alt={item.title} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
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

                      <Link to={`/item-details/${item.nftId || item.id}`}>
                        <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId || item.id}`}>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
