import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDhlZmE4MjRiMGNmMDY4MmUwOTAxZDYwNTcxMTgwNSIsIm5iZiI6MTczMzE1MzcyMC44MDA5OTk5LCJzdWIiOiI2NzRkZDNiODc5OWUxNDM2YmFmZGQyZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZreGx8zvYEmNZc-RKPXMES6LeCZcrcysBl-cQZ8A1js",
    },
  };

  // const handleWheel = (event) => {
  //   event.preventDefault();
  //   cardsRef.current.scrollLeft += event.deltaY;
  // };

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    setLoading(false);

    // cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return loading ? (
    <div className="card-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
    <div className="cards">
      <div className="title-cards">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index) => {
            return (
              <div key={index}>
                <a href={`/player/${card.id}`}>
                  <div className="box">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w500` + card.backdrop_path
                      }
                      alt=""
                    />
                    <p>{card.original_title}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TitleCards;
