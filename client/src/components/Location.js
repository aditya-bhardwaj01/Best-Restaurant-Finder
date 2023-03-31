import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import Navbar from './Navbar'
import Spinner from './Spinner'
// import Cuisines from '../images/stats/location/Jayanagar_rating_dist.png'
// import Rating from '../images/stats/location/Uttarahalli_rating_dist.png'
// import Cuisines from '../images/stats/location/Uttarahalli_cuisines_dist.png'
// import Resttype from '../images/stats/location/Uttarahalli_resttype_dist.png'
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      avgCost: []
    }
  }

  componentDidMount = () => {
    axios
      .post('/locationPage', {
        location: this.props.location
      })
      .then((response) => {
        this.setState({
          loading: false,
          avgCost: response.data.avgCost
        })
      })

    AOS.init({
      duration: 1000,
      once: true
    });
  }

  render() {
    return (
      <div className="Location" data-aos="fade-up">
        {
          this.state.loading === true ? <Spinner /> :
            <div className="main-content">
              <Navbar />
              <div className="main-location">
                <Link to="/home">&larr;Go back</Link> <br />
                {this.props.location}<br />
                <img style={{border: 'solid red'}}
                 src={require(`../images/stats/location/${this.props.location}_rating_dist.png`)} alt="Rating distribution" />
                 <img style={{border: 'solid red'}}
                 src={require(`../images/stats/location/${this.props.location}_cuisines_dist.png`)} alt="Cuisines distribution" />
                 <img style={{border: 'solid red'}}
                 src={require(`../images/stats/location/${this.props.location}_resttype_dist.png`)} alt="Rest-type distribution" />

                {/* <img style={{border: 'solid red'}}
                 src={Rating} alt="Rating distribution" />
                 <img style={{border: 'solid red'}}
                 src={Cuisines} alt="Cuisines distribution" />
                 <img style={{border: 'solid red'}}
                 src={Resttype} alt="Rest-type distribution" /> */}
              </div>
            </div>
        }
      </div>
    )
  }
}

export default function LocationFunc(props) {
  const { location } = useParams()
  return <Location location={location}> </Location>
}
