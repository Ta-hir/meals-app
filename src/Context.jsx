import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'

const Appcontext = React.createContext()

// mealsdb api urls
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealurl = "https://www.themealdb.com/api/json/v1/1/random.php"

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites')

    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'))
    } else {
        favorites = []
    }
    return favorites
}

const AppProvider = ({ children }) => {

    // meals state
    const [meals, setMeals] = useState([])
    // loading state
    const [loading, setLoading] = useState(false)
    // search  state
    const [searchTerm, setSearchTerm] = useState('')
    // modal state
    const [showModal, setShowModal] = useState(false)
    //selected meal to show in modal state
    const [selectedMeal, setSelectedMeal] = useState(null)
    // favorites state
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

    // fetch meals data from api using axios
    const getMeals = async (url) => {
        setLoading(true)
        try {
            const { data } = await axios(url)
            if (data.meals) {

                setMeals(data.meals)
            } else {
                setMeals([])
            }

        } catch (error) {
            console.log(error.response)
        }
        setLoading(false)
    }

    const fetchRandomMeal = () => {
        getMeals(randomMealurl)

    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal
        if (favoriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal)
        } else {

            meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }
    const addToFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavorite) return
        const updatedFavorites = [...favorites, meal]
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }
    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.id !== idMeal)
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    useEffect(() => {
        getMeals(allMealsUrl)
    }, [])

    // render data using useEffect hook
    useEffect(() => {
        if (!searchTerm) return
        getMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    return (
        <Appcontext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </Appcontext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(Appcontext)
}

export { Appcontext, AppProvider }

