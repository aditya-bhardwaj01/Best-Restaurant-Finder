import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

class Restaurant extends Component {
  render() {
    return (
      <div className="Restaurant">
        <Link to="/home">&larr;Go back</Link>
      </div>
    )
  }
}

export default function RestaurantFunc(props) {
  const { name } = useParams()
  return <Restaurant name={name}></Restaurant>
}