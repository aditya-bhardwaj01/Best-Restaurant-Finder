import React, { Component } from 'react'
import { useParams } from 'react-router'

class Location extends Component {
  render() {
    return (
      <div>{this.props.location}</div>
    )
  }
}

export default function LocationFunc(props) {
    const { location }  = useParams()
    return <Location location={location}> </Location>
}
