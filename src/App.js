import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'fa667381'; 
  const APP_KEY = '65a75019f4d99a36663f11f4e2da62e1';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');


  useEffect( async () => {
    getRecipies();
  }, []);

  const getRecipies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  return(
    <div className="App">
      <form className="search-form">
        <input className='search-bar' type='text' value={search} />
        <button 
        className='search-button' 
        type='submit'>Submit</button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  )
}
export default App;
