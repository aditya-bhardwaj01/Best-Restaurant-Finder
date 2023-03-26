import React, { Component } from 'react'
import { useParams } from 'react-router'

class Restaurant extends Component {
  render() {
    return (
      <div>{this.props.name}</div>
    )
  }
}

export default function RestaurantFunc(props) {
  const { name } = useParams()
  return <Restaurant name={name}></Restaurant>
}