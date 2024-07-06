// import React from 'react'

import { useContext } from "react";
import Flag from "react-flagkit"
import { PostContext } from "../../services/PostContext";

const QualifyingTable = ({item}) => {

   const { oneFlag } = useContext(PostContext);

  return (
    <tr>
        <td>{item.position}</td>
        <td><Flag country={oneFlag(item.Driver.nationality)}/></td>
        <td>{item.Driver.familyName}</td>
        <td>{item.Constructor.name}</td>
        <td>{item.Q3 || item.Q2 || item.Q1}</td>
    </tr>
  )
}

export default QualifyingTable