import React from "react";
import Skeleton from "./Skeleton";

const SkeletonCard = ({ containerClassName, containerStyle }) => {
  return (
    <div className={containerClassName} style={containerStyle}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton className="new-item-skeleton-avatar" />
        </div>
        <Skeleton className="new-item-skeleton-countdown" />
        <div className="nft__item_wrap">
          <Skeleton className="new-item-skeleton-image" />
        </div>
        <div className="nft__item_info">
          <Skeleton className="new-item-skeleton-title" />
          <Skeleton className="new-item-skeleton-price" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;