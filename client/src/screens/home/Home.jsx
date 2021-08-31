import React, { useEffect, useState } from 'react'
import { getTenIndecies, sortArray } from '../../assets/functions';
import FoodCard from '../../components/card/FoodCard';
import './Home.css'

export default function Home(props) {
    const [ sorted, setSorted ] = useState([])
    const [ ten, setTen ] = useState([]);

    const { allFoods, darkMode } = props;

    useEffect(() => {
        const limited = getTenIndecies(sorted)
        setTen(limited)
    },[allFoods, sorted])

    useEffect(() => {
        const array = sortArray(allFoods)
        setSorted(array)
    },[allFoods])

    return (
        <div className="home-detail-grid">
            <div className="home-details">
                <img src={(darkMode === true) ? "https://i.imgur.com/eyLImzQ.png" : "https://i.imgur.com/xLr5h9x.png"} alt="destination hot dog logo" className="home-logo"/>
            </div>
            <div className={(darkMode === true) ? "dark-home-foods-container home-foods-container" : "home-foods-container"}>
                {ten?.map(food => {
                        return (
                        <FoodCard
                            key={food.id}
                            name ={food.name}
                            cuisine={food.cuisine}
                            location_id={food.location_id}
                            img_url={food.img_url}
                            food_id={food.id}
                            darkMode={darkMode}
                        />
                )})}
            </div>
        </div>
    )
}