import React,{ useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'


const Leaderboard = () => {

   const navigate = useNavigate();
   const [Users, setUsers] = useState();
   let data = [];

   useEffect(() => {
      getAllUser();
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
            <h5>Name &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Questions Solved</h5>
            {
               Users.map((ele) => {
                  return <>
                     <p><span onClick={() => navigate(`/profile/${ele.id}`)} >{ele.name}</span> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {ele.quesSolved}  </p>
                  </>
               })
            }
         </>
      )
   } else {
      return (
         <Loading/>
      )
   }
}
export default Leaderboard
