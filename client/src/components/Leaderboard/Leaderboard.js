import React,{ useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Leaderboard.css'


const Leaderboard = () => {

   const navigate = useNavigate();
   const [Users, setUsers] = useState();
   let data = [];
   let count = 0;
   useEffect(() => {
      getAllUser();
      document.title = 'Leaderboard | Space';
      // eslint-disable-next-line
   }, []);

   const getAllUser = async () => {
      // eslint-disable-next-line
      let res = await fetch(`http://localhost:9002/leaderboard`, {
         method: "GET", headers: {
            'Content-Type': 'application/json'
         },
      });
      let alluserData = await res.json();

      alluserData.users.forEach((ele) => data.push({
         name: ele.name,
         id: ele._id,
         quesSolved: ele.questionsSolved.length
      }));
      console.log(data);
      data.sort((a, b) => b.quesSolved - a.quesSolved);
      setUsers(data);
   }

   if (Users) {

      return (
         <>
            <div>
               <h5>Rank  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Name &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Questions Solved</h5>
            {
                  Users.map((ele) => {
                     count++;
                     return <>
                        <p>&emsp;&emsp;{count}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<strong><span id='lead_user' onClick={() => navigate(`/profile/${ele.id}`)} >{ele.name}</span></strong> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {ele.quesSolved}  </p>
                     </>;
               }
               )
               }
            </div>
         </>
      )
   } else {
      return (
         <Loading/>
      )
   }
}
export default Leaderboard
