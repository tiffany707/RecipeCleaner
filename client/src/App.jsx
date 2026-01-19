import { useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [Url, setUrl] = useState("")
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState("Clean")

  
  const getRecipe = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("/scraper", {text:Url});
      response.data.directions = response.data.directions.filter(items => !items.toLowerCase().includes("dotdash meredith food studios"));
      setLoading("Clean")
      setInfo(response.data)
    }
    catch(e){
      console.log(e.message)
    }
  }  

  const changeLoading = () =>{
    setLoading("Loading...")
  }

  return (
    <>
    <div className="flex pt-20 items-center w-full min-h-screen flex-col  bg-gray-50">
    {/* Location to input URL */}
      <div className="px-30 py-4 rounded-xl w-fit shadow-2xl">
        <h1 className="flex justify-center items-center pb-3 text-2xl font-smi-bold">Recipe Cleaner</h1>
        <h2 className="text-red-800 text-sm flex justify-center mb-1">Disclaimer: Only works with allrecipes.com</h2>
        <form onSubmit={(e)=>{getRecipe(e); changeLoading();}} className="flex flex-col md:flex-row items-center justify-center">
          <input required value={Url} onChange={(e)=>{setUrl(e.target.value)}} className="border border-gray-300 rounded-lg py-2 px-2 w-100 mr-2" type="text" placeholder="Enter URL"/>
          <button className="mt-2 sm:mt-0 bg-blue-400 rounded-lg py-2 px-4 text-white hover:bg-blue-500 transition-colors duration-200 cursor-pointer"type="submit">{loading}</button>
        </form>
      </div>
      {/* Displays retrieved info*/}
      <div className="mt-1 sm:mt-5 mx-6 py-20">{info ?
        (<div className="px-12 sm:px-20 pt-7 rounded-lg shadow-xl flex-box justify-center items-center">
          <h1 className="font-semibold text-3xl">{info.title}</h1>
          <div className="py-3 m-2"><h3 className="font-semibold text-xl mb-3">Details</h3>
            <table>
              <thead className="pt-2">
                {info.details.map((items,index) =>(
                  index % 3 == 0 ?
                    (<tr className="border-t-2 border-gray-300">
                      <td className="p-3">
                        {items}
                      </td>
                    </tr>)
                    :
                    null
                ))} 
              </thead>
            </table>
          </div>
          <div className="py-3"><h3 className="font-semibold text-xl">Ingredients</h3>
            <ul className="list-disc ml-5 pt-2">
              {info.ingredients.map((items, index) => {
                return (<li key={index + 100}>{items}</li>)
              })} 
            </ul>
          </div>
          <div className="pt-3 pb-20 mt-5">
            <h3 className="font-semibold text-xl">Directions</h3>
            {info.directions.map((items, index)=>(
              <div className="pt-3">
                <div className="font-semibold">Step {index + 1}</div>
                <div>{items}</div>
              </div>
          ))}
          </div>
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
