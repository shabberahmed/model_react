import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data,setData]=useState([])
// -----------------
const [food,setFood]=useState(null)
  let ApiData =async()=>{
    const options = {
      method: 'GET',
      url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
      params: {
        'nutrition-type': 'cooking',
        'category[0]': 'generic-foods',
        'health[0]': 'alcohol-free'
      },
      headers: {
        'X-RapidAPI-Key': 'd0e111736amsh5eb8d4eddd93c34p12bd26jsn12d0685e839c',
        'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data.hints);
      setData(response.data.hints)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    ApiData()
  },[])
  // ---------
  const openModal = (val) => {
    setFood(val)
    console.log(val)
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
<>
<div className='row'>
  {
  data.map((val)=>{
    return(
      <div className="App col-md-4" key={val.food.id}>
      <h1>React Modal Example</h1>
      <div>
      <img src={val.food.image} alt="" />
      </div>
      <button onClick={()=>openModal(val.food)}>see more</button>
      {isModalOpen&&food&&(
        
        <div className="modal-overlay">
          <div className="modal1">
          <img src={food.image} alt="" />
            <h2>{food.category}</h2>
            <p>{food.knownAs}</p>
            <button  onClick={closeModal}><i class="fa-solid fa-x"></i></button>
          </div>
        </div>
      )}
    </div>
    )
  })
}
</div>
</>
  );
}
export default App

