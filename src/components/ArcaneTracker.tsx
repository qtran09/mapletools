"use client"

import {useEffect, useReducer} from "react";

const ArcaneTable = () => {

    const MIN_LEVEL = 0
    const MAX_LEVEL = 20
    let initialState = localStorage.getItem('arcaneData')
    if(initialState != null){
        initialState = JSON.parse(initialState)
    }
    else{
        initialState = [
            {
                id: 1,
                name: 'Vanishing Journey',
                level: 0
            },
            {
                id: 2,
                name: 'Chuchu Island',
                level: 0
            },
            {
                id: 3,
                name: 'Lachelein',
                level: 0
            },
            {
                id: 4,
                name: 'Arcana',
                level: 0
            },
            {
                id: 5,
                name: 'Morass',
                level: 0
            },
            {
                id: 6,
                name: 'Esfera',
                level: 0
            }
        ]
    }
    // Not a fan of hard-coding the costs here but too lazy to setup in a better way
    const COSTS = {
        'Vanishing Journey': [0,970000,1230000,1660000,2260000,3060000,4040000,5220000,6600000,8180000,9990000,12010000,14260000,16740000,19450000,22420000,25630000,29100000,32830000,36820000,'MAX'],
        'Chuchu Island': [0,1210000,1530000,2060000,2800000,3780000,4980000,6420000,8100000,10020000,12210000,14650000,17360000,20340000,23590000,27140000,30970000,35100000,39530000,44260000,'MAX'],
        'Lachelein': [0,1450000,1830000,2460000,3340000,4500000,5920000,7620000,9600000,11860000,14430000,17290000,20460000,23940000,27730000,31860000,36310000,41100000,46230000,51700000,'MAX'],
        'Arcana': [0,1690000,2130000,2860000,3880000,5220000,6860000,8820000,11100000,13700000,16650000,19930000,23560000,27540000,31870000,36580000,41650000,47100000,52930000,59140000,'MAX'],
        'Morass': [0,1930000,2430000,3260000,4420000,5940000,7800000,10020000,12600000,15540000,18070000,22570000,26660000,31140000,36010000,41300000,46990000,53100000,59630000,66580000,'MAX'],
        'Esfera': [0,2170000,2730000,3660000,4960000,6660000,8740000,11220000,14100000,17380000,21090000,25210000,29760000,34740000,40150000,46020000,52330000,59100000,66330000,74020000,'MAX']
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

    const [arcaneData, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        localStorage.setItem('arcaneData', JSON.stringify(arcaneData))
    })
    return (
        <div className="border-2 border-solid rounded-lg w-1/2 flex-wrap flex h-1/2 bg-[#525252]">
            {
                arcaneData.map((zone) => (
                    <div className="w-1/3 flex-center flex-col" key={zone.id} >
                        <h1 className="head_text text-center">{zone.name}: {zone.level}</h1>
                        <h1 className="head_text text-center">Cost: {COSTS[zone.name][zone.level]}</h1>
                        <button
                            onClick={() => handleLevelChange(zone, 'INCREASE')} 
                            className="bg-slate-500/50 rounded-xl border-brand-500 px-10 py-3 text-base font-medium text-brand-500">
                            Increase
                        </button>
                        <button
                            onClick={() => handleLevelChange(zone,'DECREASE')} 
                            className="bg-slate-500/50 rounded-xl border-brand-500 px-10 py-3 text-base font-medium text-brand-500">                           
                            Decrease
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default ArcaneTable