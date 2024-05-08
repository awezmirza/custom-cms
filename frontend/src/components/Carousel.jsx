import React from "react";
import "../styles/carousel.css";
import { NO_BANNER_FOUND_URL } from "../utils/constant";

// Splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Carousel = ({ data }) => {
    return (
        <div className="carasoul">
            <div className="tpover"></div>
            {data.comingSoon ? (
                <h2 className="play-button"> Coming Soon </h2>
            ) : (
                <button type="button" className="play-button">
                    <Link className="play-button-link" to={data.gameLink}>
                        Play Now
                    </Link>
                </button>
            )}
            <Splide
                options={{
                    rewind: true,
                    gap: "1rem"
                }}
                className="spl"
            >
                {data.banners && data.banners.length > 0 ? (
                    data.banners.map((bannerLink, idx) => {
                        <SplideSlide>
                            <img
                                className="banner"
                                src={bannerLink}
                                alt={`image ${idx}`}
                            />
                        </SplideSlide>;
                    })
                ) : (
                    <SplideSlide>
                        <img
                            className="banner"
                            src={NO_BANNER_FOUND_URL}
                            alt={`No banner found`}
                        />
                    </SplideSlide>
                )}
            </Splide>
        </div>
    );
};

export default Carousel;
