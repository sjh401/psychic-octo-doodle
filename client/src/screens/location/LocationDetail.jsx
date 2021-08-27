import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FoodCard from '../../components/card/FoodCard';
import './Location.css'

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#1d7dc2',
        '&:hover': {
            backgroundColor: '#f8f7ff',
            color: '#1d7dc2'
        },
    },
}));

export default function LocationDetail(props) {
    const { allLocations, allFoods, currentUser } = props;
    const { location_id } = useParams();
    const [ location, setLocation ] = useState([]);
    const [ foods, setFoods ] = useState([]);
    const [ filterFoods, setFilterFoods ] = useState([]);
    const [ filter, setFilter ] = useState({cuisine: "All"})
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        const oneLocation = allLocations.find(location => {
            return location.id === Number(location_id)
        });
        setLocation(oneLocation);
    },[allLocations, location_id])

    useEffect(() => {
        const locationFoods = allFoods?.filter(food => food.location_id === Number(location_id));
        setFoods(locationFoods)
    },[allFoods, location_id])

    useEffect(() => {
        if(filter.cuisine !== "All") {
            setFilterFoods(foods.filter(food => food.cuisine === filter.cuisine))
        } else {
            setFilterFoods(foods)
        }
    },[filter, foods])

    const handleChange = (e) => {
        const { value } = e.target;
        setFilter( {cuisine: value} )
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className="location-detail-grid">
            <div className="location-detail-header">
                <h1>{location?.name}</h1>
                
            </div>
            <div className="location-detail-foods">
            <div>
                <FormControl className={classes.formControl}>
                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={filter.cuisine}
                    onChange={handleChange}
                    // style={{color:'#f8f7ff'}}
                    >
                    <MenuItem value="All" >
                        <em>Filter by Cuisine</em>
                    </MenuItem>
                    <MenuItem value={"Appitizer"}>Appitizer</MenuItem>
                    <MenuItem value={"Entree"}>Entree</MenuItem>
                    <MenuItem value={"Dessert"}>Dessert</MenuItem>
                    <MenuItem value={"Snack"}>Snack</MenuItem>
                    <MenuItem value={"Beverage"}>Beverage</MenuItem>
                    <MenuItem value={"Alcohol"}>Alcohol</MenuItem>
                    </Select>
                </FormControl>
            </div>
                <div className="location-detail-food-cards">
                    {filterFoods.map(food => (
                        <React.Fragment key={food.id}>
                            <Link to={`/locations/${location_id}/foods/${food.id}`} className="locations-container-link">
                                <FoodCard
                                    name={food.name}
                                    cuisine={food.cuisine}
                                    description={food.description}
                                    img_url={food.img_url}
                                    currentUser={currentUser}
                                    location_id={location_id}
                                    food_id={food.id}
                                />
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="location-detail-description">
                {currentUser &&
                    <div>
                        <Link to={`/locations/${location_id}/foods/new`} className="locations-container-link">
                        <Button variant="contained" color="primary" className={classes.button}>
                            Create New Food
                        </Button>
                        </Link>
                    </div>
                }
                <div className="location-detail-description-card">
                    <div>
                        {location?.description}
                    </div>
                </div>
            </div>
        </div>
    )
}
