import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import StudentNavbar from "../../components/StudentNavbar";
import "../Style/Leadboard.css";

function Leaderboard() {

  const [leaders,setLeaders] = useState([]);

  useEffect(()=>{

    const fetchLeaderboard = async () => {
      try{
        const response = await api.get("/candidate/leaderboard/today");
        setLeaders(response.data);
      }
      catch(error){
        console.error("Leaderboard error:",error);
      }
    };

    fetchLeaderboard();

  },[]);

  const top3 = leaders.slice(0,3);
  const others = leaders.slice(3);

  return(
    <>
    <StudentNavbar/>

    <div id="candidate-leaderboard-root">

      <div className="candidate-leaderboard-container">

        <h2 className="candidate-leaderboard-title">
          🏆 Daily Coding Leaderboard
        </h2>

        {/* PODIUM */}

        <div className="candidate-leaderboard-podium">

          {top3.map((user,index)=>{

            const rank = index + 1;

            return(
              <div
                key={index}
                className={`candidate-podium-card podium-rank-${rank}`}
              >

                <div className="candidate-podium-rank">

                  {rank===1 && "👑"}
                  {rank===2 && "🥈"}
                  {rank===3 && "🥉"}

                </div>

                <div className="candidate-podium-name">
                  {user.candidateName}
                </div>

                <div className="candidate-podium-score">
                  Score {user.score}
                </div>

                <div className="candidate-podium-stars">
                  ⭐ {user.stars}
                </div>

              </div>
            );
          })}

        </div>

        {/* TABLE */}

        <div className="candidate-leaderboard-table-card">

          <table className="candidate-leaderboard-table">

            <thead>

              <tr>
                <th>Rank</th>
                <th>Candidate</th>
                <th>Score</th>
                <th>Stars</th>
              </tr>

            </thead>

            <tbody>

            {leaders.length===0 ? (

              <tr>
                <td colSpan="4" className="candidate-leaderboard-empty">
                  No candidates attempted today
                </td>
              </tr>

            ) : (

              others.map((user,index)=>{

                const percent = (user.score/100)*100;

                return(

                <tr key={index} className="candidate-leaderboard-row">

                  <td className="candidate-rank">
                    #{user.rank}
                  </td>

                  <td className="candidate-name">
                    {user.candidateName}
                  </td>

                  <td>

                    <div className="candidate-score-bar-wrapper">

                      <div
                        className="candidate-score-bar"
                        style={{width:`${percent}%`}}
                      ></div>

                      <span className="candidate-score-text">
                        {user.score}
                      </span>

                    </div>

                  </td>

                  <td className="candidate-stars">
                    ⭐ {user.stars}
                  </td>

                </tr>

                );

              })

            )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

    </>
  );
}

export default Leaderboard;
