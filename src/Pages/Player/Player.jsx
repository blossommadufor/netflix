import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState({});

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDhlZmE4MjRiMGNmMDY4MmUwOTAxZDYwNTcxMTgwNSIsIm5iZiI6MTczMzE1MzcyMC44MDA5OTk5LCJzdWIiOiI2NzRkZDNiODc5OWUxNDM2YmFmZGQyZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZreGx8zvYEmNZc-RKPXMES6LeCZcrcysBl-cQZ8A1js",
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));

    setLoading(false);
  }, []);

  return loading ? (
    <div className="player-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate("/netflix");
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
