import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from 'react-redux';

import topRest from '../images/stats/most-famous-rest.png';
import topRestType from '../images/stats/most-famous-rest-types.png';
import topCuisines from '../images/stats/most-popular-cuisines.png';
import topFoodieAreas from '../images/stats/top-foodie-areas.png';
import bookTable from '../images/stats/book-table.png';
import northSouthPie from '../images/stats/north-south-pie.png';
import northHotspot from '../images/stats/north-hotspot.png';
import southHotspot from '../images/stats/south-hotspot.png';

class Stats extends Component {
  constructor(props){
    super(props);
    this.state = {
      graphs: [
        ["Top restaurants in Bengaluru", topRest, "zoom-in-up"], ["Most famous restaurant type", topRestType, "fade-up"], 
        ["Most famous cuisines", topCuisines, "fade-down"], ["Top foodie areas in Bengaluru", topFoodieAreas, "fade-up"], 
        ["Ratio of Restaurants offering Book table to not offering Book table", bookTable, "fade-down"], 
        ["North-South Indian cuisines distribution", northSouthPie, "zoom-out-down"],
        ["Hotspot of North Indian Food", northHotspot, "fade-up"], ["Hotspot of South Indian Food", southHotspot, "fade-down"]
      ],
      searchResult: []
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
    if(searchText === ''){
      document.getElementById('search-results').style.display = 'none'
    }
    else if(searchText !== ''){
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

  render() {
    return (
      <div className='Stats'>
        <Navbar page={"stats-page"} data-aos="fade-up" />
        {this.state.graphs.map((element) => {
          return <div className='single-graph' >
            <h2 data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">{element[0]}</h2>
            <img src={element[1]} alt="Graph plot" data-aos={element[2]} />
            <hr style={{backgroundColor: this.props.mode === 1 ? '#1D1D1D': 'white', width: '90%'}} />
          </div>
        })}

        <div className="search-stats">
          <h3>Find most famous restaurants for your favourite cuisines!</h3>
          <input 
          style = {{backgroundColor: this.props.mode === 1 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255,255,255,0.8)'}}
          type="search" placeholder='Search restaurant type' onChange={this.fetchRestType} />

          <div id="search-results">
            {this.state.searchResult.map((element) => {
              return <div 
              style = {{
                backgroundColor: this.props.mode === 1 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255,255,255,0.8)',
                color: this.props.mode === 1 ? 'white' : 'black'
              }}
              className='single-search-result'>
                {element}
              </div>
            })}
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

