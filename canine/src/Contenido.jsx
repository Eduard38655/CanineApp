import { useEffect, useState } from "react";
import Styles from "../src/App.module.css";
function Contenido({ dogs, setDogs }) {
 const [openIndex, setOpenIndex] = useState(false);
 useEffect(()=>{
  console.log(openIndex);
  
 },[openIndex])
  return (
    <div className={Styles.Div_Container }>
      {dogs.map((dog, index) => (
        <div key={index} className={Styles.Div_Card}   onMouseEnter={() => setOpenIndex(index)}
 >
          <div className={Styles.Div_Img} >
            <div className={Styles.Img}  >
              <img src={dog.image} alt={dog.breed}   
               />
              
            </div>
            <div className={openIndex === index ? Styles.display : Styles.nodisplay}>
              <p>
              {dog.subBreeds && dog.subBreeds.length > 0
                ?  dog.subBreeds.join(", ") 
                : "No tiene sub razas"}
                </p>
            </div>
          </div>

         <div className={Styles.Text}>
           <h3>
            {dog.breed}  
          </h3>
         </div>

        </div>
      ))}
    </div>
  );

}

export default Contenido;
