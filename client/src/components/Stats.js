import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import topRest from '../images/stats/most-famous-rest.png';
import topRestType from '../images/stats/most-famous-rest-types.png';
import topCuisines from '../images/stats/most-popular-cuisines.png';
import topFoodieAreas from '../images/stats/top-foodie-areas.png';
import bookTable from '../images/stats/book-table.png';
import northSouthPie from '../images/stats/north-south-pie.png';
import northHotspot from '../images/stats/north-hotspot.png';
import southHotspot from '../images/stats/south-hotspot.png';
import { Link } from 'react-router-dom';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphs: [
        ["Top restaurants in Bengaluru", topRest, "zoom-in-up"], ["Most famous restaurant type", topRestType, "fade-up"],
        ["Most famous cuisines", topCuisines, "fade-down"], ["Top foodie areas in Bengaluru", topFoodieAreas, "fade-up"],
        ["Ratio of Restaurants offering Book table to not offering Book table", bookTable, "fade-down"],
        ["North-South Indian cuisines distribution", northSouthPie, "zoom-out-down"],
        ["Hotspot of North Indian Food", northHotspot, "fade-up"], ["Hotspot of South Indian Food", southHotspot, "fade-down"]
      ],
      searchResult: [],
      searchedRestType: "",
      searchRestaurant: []
    }
  }

  componentDidMount = async () => {
    AOS.init({
      duration: 1000,
      once: false
    });
  }

  fetchRestType = (event) => {
    let searchText = event.target.value;
    if (searchText === '') {
      document.getElementById('search-results').style.display = 'none'
    }
    else if (searchText !== '') {
      document.getElementById('search-results').style.display = 'block'
    }

    axios
      .post("http://localhost:5000/searchResult", {
        searchText: searchText
      })
      .then((response) => {
        this.setState({
          searchResult: response.data
        })
      })
  }

  fetchRestaurant = (restType) => {
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('search-type-box').value = '';
    this.setState({
      searchedRestType: restType
    })

    axios
      .post("http://localhost:5000/showRestaurant", {
        restType: restType
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        }
        const data = JSON.parse(response.data)

        this.setState({
          searchRestaurant: data
        })
      })
  }

  render() {
    return (
      <div className='Stats'>
        <Navbar page={"stats-page"} data-aos="fade-up" />
        {this.state.graphs.map((element) => {
          return <div className='single-graph'>
            <h2 data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">{element[0]}</h2>
            <img src={element[1]} alt="Graph plot" data-aos={element[2]} />
            <hr style={{ backgroundColor: this.props.mode === 1 ? '#1D1D1D' : 'white', width: '90%' }} />
          </div>
        })}

        <div className="search-stats">
          <h3>Find most famous restaurants for your favourite restaurant type!</h3>
          <input
            id='search-type-box'
            style={{
              backgroundColor: this.props.mode === 1 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255,255,255,0.8)',
              color: this.props.mode === 1 ? 'white' : 'black'
            }}
            type="search" placeholder='Search restaurant type' onChange={this.fetchRestType} />

          <div id="search-results">
            {this.state.searchResult.map((element) => {
              return <div
                style={{
                  backgroundColor: this.props.mode === 1 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255,255,255,0.8)',
                  color: this.props.mode === 1 ? 'white' : 'black'
                }}
                className='single-search-result'
                onClick={() => { this.fetchRestaurant(element) }}>
                {element}
              </div>
            })}
          </div>
        </div>

        <div className="display-restaurant">
          <h4 className="display-restaurant-h4">{this.state.searchedRestType}</h4>

          {this.state.searchedRestType !== "" &&
            <p className="display-restaurant-p1">{this.state.searchRestaurant.length + " result for your search"}</p>}

          <div style={{ padding: '10px' }}>
            <table className="restaurant-table" data-aos="fade-up">
              {this.state.searchRestaurant.length > 0 &&
                <thead>
                  <th>Restaurant Type</th>
                  <th>Restaurant Name</th>
                  <th>Number</th>
                </thead>
              }
              <tbody>
                {
                  this.state.searchRestaurant.map((element) => {
                    return <tr className='single-restaurant' >
                      <td>{element[1]}</td>
                      <td>{element[2]}</td>
                      <td>{element[3]}</td>
                      <td>
                        <Link to={`/restaurant/${element[2]}`}><button type="button" class="btn btn-success btn-sm">View</button></Link>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
}

export default function StatsFunc(props) {
  const mode = useSelector((state) => state.ColorModeReducer)
  return <Stats mode={mode}></Stats>
}

