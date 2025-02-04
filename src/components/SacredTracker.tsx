"use client"

import {useEffect, useReducer} from "react";

const SacredTable = () => {

    const MIN_LEVEL = 0
    const MAX_LEVEL = 11
    let initialState = localStorage.getItem('sacredData')
    if(initialState != null){
        initialState = JSON.parse(initialState)
    }
    else{
        initialState = [
            {
                id: 1,
                name: 'Cernium',
                level: 0
            },
            {
                id: 2,
                name: 'Hotel Arcus',
                level: 0
            },
            {
                id: 3,
                name: 'Odium',
                level: 0
            },
            {
                id: 4,
                name: 'Shangri-La',
                level: 0
            },
            {
                id: 5,
                name: 'Arteria',
                level: 0
            },
            {
                id: 6,
                name: 'Carcion',
                level: 0
            }
        ]
    }
    const reducer = (state, action) => {
        switch(action.type){
            case "INCREASE":
                return state.map((zone) => {
                    if(zone.id == action.id){
                        const newLevel = Math.min(zone.level+1, MAX_LEVEL)
                        return {... zone, level: newLevel};
                    }
                    else{
                        return zone
                    }
                })
            case "DECREASE":
                return state.map((zone) => {
                    if(zone.id == action.id){
                        const newLevel = Math.max(zone.level-1, MIN_LEVEL)
                        return {... zone, level: newLevel};
                    }
                    else{
                        return zone
                    }
                })
            default:
                return state
        }
    }

    const handleLevelChange = (zone, type) => {
        dispatch({type: type, id: zone.id})
    }

    const [sacredData, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        localStorage.setItem('sacredData', JSON.stringify(sacredData))
    })
    return (
        <div>
            {
                sacredData.map((zone) => (
                    <div key={zone.id} >
                        <label>{zone.name}: {zone.level}</label>
                        <button onClick={() => handleLevelChange(zone, 'INCREASE')}>Increase</button>
                        <button onClick={() => handleLevelChange(zone, 'DECREASE')}>Decrease</button>
                    </div>
                ))
            }
        </div>
    )
}

export default SacredTable