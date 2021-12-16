import { useSelector } from "react-redux";


function RecipeList () {
    const recipes = useSelector(store => store.recipes)

    return (
        <h1>RECIPE LIST</h1>
    )
} // end RecipeList

export default RecipeList;