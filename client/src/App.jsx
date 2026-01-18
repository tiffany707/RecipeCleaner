import { useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [Url, setUrl] = useState("")
  const [info, setInfo] = useState(null)

  const getRecipe = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("/scraper", {text:Url});
      setInfo(response.data)
    }
    catch(e){
      console.log(e.message)
    }
  }  

  return (
    <>
    <div className="flex pt-20 items-center w-full min-h-screen flex-col  bg-gray-50">

      <div className="px-6 py-4 rounded-2xl w-fit shadow-2xl">
        <h1 className="flex justify-center items-center pb-3">Recipe Cleaner</h1>
        <form onSubmit={getRecipe}>
          <input value={Url} onChange={(e)=>{setUrl(e.target.value)}} className="border border-gray-300 rounded-lg py-2 px-4" type="text" placeholder="Enter URL"/>
          <button className="bg-blue-400 rounded-lg py-2 px-4 text-white hover:bg-blue-500 cursor-pointer"type="submit">Clean</button>
        </form>
      </div>
      {/* Displaying info retrieved */}
      <div>{info ?
        (<div className="px-20 pt-7 rounded-lg shadow-lg flex-box justify-center items-center">
          <h1 className="font-semibold text-3xl">{info.title}</h1>
          <div className="py-3"><h3 className="font-semibold text-lg">Details</h3>{info.details} </div>
          <div className="py-3"><h3 className="font-semibold text-lg">Ingredients</h3>{info.ingredients} </div>
          <div className="py-3"><h3 className="font-semibold text-lg">Garnish</h3>{info.garnish} </div>
          <div className="py-3"><h3 className="font-semibold text-lg">Directions</h3>{info.directions} </div>
        </div>


        )
        :
        (<div></div>)
        }
      </div>
    </div>
   
    </>
  )
}

export default App
