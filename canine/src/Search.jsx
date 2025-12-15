import { useEffect, useState } from "react";
import Styles from "../src/App.module.css";

function Search({ dogs, setDogs }) {
  const [GetInput, SetInput] = useState("");
  const [GetData, SetData] = useState([]);
  const [Update, SetUpd] = useState(false)
  const [Get_Up_Input, SetGet_Up] = useState("")

  useEffect(() => {
    if (!GetInput) {
      SetData(dogs);
      return;
    }

    const q = GetInput.toLowerCase();

    const Filter = dogs.filter(
      (e) =>
        e.breed.toLowerCase().includes(q) ||
        (e.subBreed && e.subBreed.toLowerCase().includes(q))
    );

    SetData(Filter);
  }, [GetInput, dogs]);


  function EliminarCanino(dog) {


    const Filter = dogs.filter((e) => e.breed != dog)
    localStorage.setItem("DataInfo", JSON.stringify(Filter));

    const stored = localStorage.getItem("DataInfo");

    if (stored) {
      const parsed = JSON.parse(stored);
      setDogs(parsed);
      return;
    }
    setDogs(Filter)
  }



  function ActualizarDatos() {
    // Recorrer todos los perros y actualizar el que coincida con la raza
    const updatedDogs = dogs.map((dog) => {
      if (dog.breed.toLowerCase() === Update.toLowerCase()) {
        // actualizamos la raza con el valor del input
        return {
          ...dog,
          breed: Get_Up_Input,
        };
      }
      return dog; // los demás se quedan igual
    });

    // Guardar en localStorage
    localStorage.setItem("DataInfo", JSON.stringify(updatedDogs));

    // Actualizar el estado
    setDogs(updatedDogs);
  }

  function Organizar_Raza() {

    const info = dogs
      .map((e) => {
        return { breed: e.breed, subBreeds: e.subBreeds, image: e.image };
      })
      .sort((a, b) => {
        return b.breed.toLowerCase().localeCompare(a.breed.toLowerCase());
      });

    console.log(info);

    // actualizar el estado con el array ordenado
    setDogs(info);
  }




  return (<>

    <article className={Styles.Container_Filter}>
      <div className={Styles.Div_Buscar}>
        <input
          type="text"
          placeholder="Buscar por raza o sub-raza"
          onChange={(e) => SetInput(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th onClick={() => Organizar_Raza()}>
              Raza <i className="fa-solid fa-up-down"></i>
            </th>
            <th>Subraza</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {GetData && GetData.length > 0 ? (
            GetData.map((dog, i) => (
              <tr key={i} >
                <td>
                  <img src={dog.image} alt={dog.breed} width={120} />
                </td>
                <td>{dog.breed}</td>
                <td>   <p>
                  {dog.subBreeds && dog.subBreeds.length > 0
                    ? dog.subBreeds.join(", ")
                    : "No tiene sub razas"}
                </p></td>
                <td>
                  <button onClick={() => SetUpd(dog.breed)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => EliminarCanino(dog.breed)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={{Styles:"text-aling"}}>
                No hay datos
              </td>
            </tr>
          )}
        </tbody>
      </table>



    </article>
    {Update != "" ? (<>
      <div className={Styles.Dialog}>

        <div className={Styles.Div_Up_Info}>
          <h3> Actuliza los datos</h3>
          <input type="text" placeholder="Ingresa la raza" onChange={(e) => { SetGet_Up(e.target.value) }} required />

          <div className={Styles.Div_Buttons}>
            <button onClick={(e) => ActualizarDatos()}>Actualizar</button>
            <button onClick={(e) => SetUpd("")}>Cancelar</button>
          </div>

        </div>
      </div>
    </>) : (<></>)}
  </>
  );
}

export default Search;
