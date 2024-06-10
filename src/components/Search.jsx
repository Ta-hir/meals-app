import React, { useState } from "react";
import { useGlobalContext } from "../Context";


const Search = () => {
    const [text, setText] = useState('')
    const { setSearchTerm, fetchRandomMeal } = useGlobalContext()

    const handleChange = (e) => {
        setText(e.target.value)
        console.log(text)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text) {
            setSearchTerm(text)
            // setText('')
        }

    }

    const handleRandomMeal = () => {
        setSearchTerm(text)
        setText('')
        fetchRandomMeal()
    }
    return (
        <header className="search-container">
            <form action="" onSubmit={handleSubmit}>
                <input type="text" className="form-input" value={text} onChange={handleChange} placeholder="type meal name" />
                <button className="btn" type="submit">search</button>
                <button className="btn btn-hipster" type="button" onClick={handleRandomMeal}>suprise me</button>
            </form>
        </header>
    )
}

export default Search