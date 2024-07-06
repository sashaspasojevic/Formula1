// import React from 'react'

import { useContext } from "react"
import Flag from "react-flagkit"
import { PostContext } from "../../services/PostContext"
import { Link } from "react-router-dom"

const TableRaces = ({race}) => {

  const {oneFlag} = useContext(PostContext)
        const {round, Circuit, raceName: name, date, Results} = race
        const {Location, circuitName} = Circuit

        let driverNationality = Results[0].Driver.nationality
        let winner = Results[0].Driver.familyName

        let dateOfRace = ''
        if (date) {
          dateOfRace =`${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
        }

  return (
    <tr className="RacesRow">
        <td>{round}</td>
        <td><Flag country={oneFlag(Location.country)}/></td>
        <td><Link to={`/races/:${round}`} className="racesLink">{name}</Link></td>
        <td>{circuitName}</td>
        <td>{dateOfRace}</td>
        <td><Flag country={oneFlag(driverNationality)}/></td>
        <td>{winner}</td>
    </tr>
  )
}

export default TableRaces