import React from "react";
import { useGlobalContext } from "../Context";
import { FaRegThumbsUp } from "react-icons/fa"

const Meals = () => {
    const { meals, loading, selectMeal, addToFavorites } = useGlobalContext()

    if (loading) {
        return (
            <section className="section">
                <h4>Loading...</h4>
            </section>
        )
    }
    if (meals.length < 1) {
        return (
            <section className="section">
                <h5>No meals matched your search term. Please try again</h5>
            </section>
        )
    }

    return (
        <section className="section-center">
            {meals.map((singleMeal) => {
                const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
                return <article className="single-meal" key={idMeal}>
                    <img src={image} alt="image" className="img" onClick={() => selectMeal(idMeal)} />
                    <footer>
                        <h5>{title}</h5>
                        <button className="like-btn" onClick={() => addToFavorites(idMeal)}> <FaRegThumbsUp /> </button>
                    </footer>
                </article>
            })}
        </section>
    )
}

export default Meals