import { useEffect, useState } from "react";
import Styles from "../src/App.module.css";
import Contenido from "./Contenido";
import Search from "./Search";

function App() {
const [id,SetId]=useState(1)
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function getDogs() {
      // 1. Intentar leer de localStorage
      const stored = localStorage.getItem("DataInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDogs(parsed);
        return; // si ya existe, no hacemos fetch
      }

      // 2. Si no existe, hacer fetch
      const res = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await res.json();

      const breeds = data.message;
      const promises = [];

      Object.entries(breeds).forEach(([breed, subBreeds]) => {
        promises.push(
          fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then((r) => r.json())
            .then((img) => ({
              breed,
              subBreeds, // guardamos todas las subrazas como array
              image: img.message,
            }))
        );
      });

      const dogsInfo = await Promise.all(promises);

      // 3. Guardar en localStorage
      localStorage.setItem("DataInfo", JSON.stringify(dogsInfo));
      setDogs(dogsInfo);
    }

    getDogs();
  }, []);

  /*Cada vez que cambie dog se debe de ACTUALIZAR LOS VALORES */


  const [isValid, SetValid] = useState(true)
  return (
    <main className={Styles.Container}>
      <div className={Styles.Div_Selection}>
        <button onClick={() => { SetValid(true),SetId(1) }} className={id==1 ? Styles.num1  : Styles.num2}>Ver todos los caninos</button>
        <button onClick={() => { SetValid(false) ,SetId(2)}} className={id==2 ? Styles.num1  : Styles.num2}>Filtar por caninos</button>
      </div>



      {isValid ? <Contenido dogs={dogs} setDogs={setDogs} /> : <Search dogs={dogs} setDogs={setDogs} />}

    </main>
  );
}

export default App;
