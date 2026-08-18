import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";
import "../css/styles/skeleton.css";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [displayFollowers, setDisplayFollowers] = useState(0);

  const resolvedAuthorId = authorId || "73855012";

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
          {
            params: { author: resolvedAuthorId },
          }
        );
        setAuthor(response.data);
        setDisplayFollowers(response.data?.followers || 0);
        setIsFollowing(false);
      } catch (error) {
        console.error("Failed to fetch author:", error);
        setAuthor(null);
        setDisplayFollowers(0);
        setIsFollowing(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [resolvedAuthorId]);

  const handleFollowToggle = () => {
    const following = !isFollowing;
    setIsFollowing(following);
    setDisplayFollowers((previousFollowers) =>
      Math.max(0, previousFollowers + (following ? 1 : -1))
    );
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={author?.authorImage || AuthorImage} alt={author?.authorName || "Author"} />
                      )}

                      {!loading ? <i className="fa fa-check"></i> : null}
                      <div className="profile_name">
                        {loading ? (
                          <>
                            <Skeleton width="220px" height="30px" style={{ marginBottom: "10px" }} />
                            <Skeleton width="140px" height="16px" style={{ marginBottom: "10px" }} />
                            <Skeleton width="440px" height="16px" style={{ marginBottom: "12px" }} />
                            <Skeleton width="90px" height="34px" borderRadius="8px" />
                          </>
                        ) : (
                          <h4>
                            {author?.authorName || "Monica Lucas"}
                            <span className="profile_username">@{author?.tag || "monicaaaa"}</span>
                            <span id="wallet" className="profile_wallet">
                              {author?.address || "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7"}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <Skeleton width="150px" height="18px" />
                        ) : (
                          `${displayFollowers} followers`
                        )}
                      </div>
                      {loading ? (
                        <Skeleton width="120px" height="44px" borderRadius="40px" />
                      ) : (
                        <button
                          type="button"
                          className="btn-main"
                          onClick={handleFollowToggle}
                          disabled={!author}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || []}
                    authorImage={author?.authorImage || AuthorImage}
                    authorId={author?.authorId || resolvedAuthorId}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
