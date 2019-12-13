import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'fa667381'; 
  const APP_KEY = '65a75019f4d99a36663f11f4e2da62e1';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  //runs when query changes
  useEffect(() => {
    getRecipies();
  }, [query]);

  const getRecipies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  const updateSearch = e => {
    setSearch(e.target.value)
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }

  return(
    <div className="App">
      <form 
      onSubmit={getSearch} 
      className="search-form"
      >
        <input className='search-bar' type='text' 
        value={search} 
        onChange={updateSearch} 
        />
        <button 
        className='search-button' 
        type='submit'>Submit</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}
export default App;
