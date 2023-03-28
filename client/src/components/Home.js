import React, { Component } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router';

import northIndian from '../images/north-indian.png'
import southIndian from '../images/south-indian.jpg'
import cafe from '../images/cafe.jpg'
import biryani from '../images/biryani.jpg'
import fastFood from '../images/fast-food.jpg'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      index: 0,
      typingSpeed: 100,
      searchBy: "none",
      searchedLocation: "",
      location: [],
      restaurant: []
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.typingAnimation, this.state.typingSpeed);
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  typingAnimation = () => {
    const { text, index } = this.state;
    const content = "Find your taste in the city!";

    if (index >= content.length) {
      clearInterval(this.interval);
      return;
    }

    const nextChar = content[index];
    this.setState({ text: text + nextChar, index: index + 1 });
  };

  searchType = (type) => {
    this.setState({
      searchBy: type
    })
  };

  searchLocation = (event) => {
    const searchText = event.target.value;
    if(searchText === ""){
      document.getElementById("matched-search-location").style.display = "none"
    }
    else{
      document.getElementById("matched-search-location").style.display = "block"
    }
    
    axios
      .post('http://localhost:5000/searchLocation', {
        searchText: searchText
      })
      .then((response) => {
        // console.log(response.data)
        this.setState({
          location: response.data
        })
      })
  }

  searchRestaurant = (event) => {
    const searchText = event.target.value;
    if(searchText === ""){
      document.getElementById("matched-search-resturant").style.display = "none"
    }
    else{
      document.getElementById("matched-search-restaurant").style.display = "block"
    }

    axios
      .post("http://localhost:5000/searchRestaurant", {
        searchText: searchText
      })
      .then((response) => {
        console.log(response.data)
        this.setState({
          restaurant: response.data
        })
      })
  }

  navigateTo = (searchedItem) => {
    console.log(searchedItem)
    if(this.state.searchBy === 'location'){
      this.props.navigate(`/location/${searchedItem}`)
    }
    else if(this.state.searchBy === 'restaurant'){
      this.props.navigate(`/restaurant/${searchedItem}`)
    }
  }

  render() {
    return (
      <div className='Home' data-aos="fade-up">
        <div className="top-home">
          <Navbar page={"home-page"} />

          <div className="top-home-text-section">
            <div className="box-top">
              <h3 style={{ textAlign: 'center', color: 'white' }}>{this.state.text}</h3>
              <hr style={{ backgroundColor: 'white' }}></hr>

              {
                this.state.searchBy === "none"
                  ?
                  <div className="row justify-content-between" id='search-type-buttons' style={{ padding: "10px" }}>
                    <button type="button" className="btn btn-outline-light" style={{ margin: "10px" }} onClick={() => this.searchType('location')}>
                      Search by Location&rarr;
                    </button>
                    <button type="button" className="btn btn-outline-light" style={{ margin: "10px" }} onClick={() => this.searchType('restaurant')}>
                      Search Restaurant&rarr;
                    </button>
                  </div>
                  :
                  <div id='search-type-boxes'>
                    {
                      this.state.searchBy === "location"
                        ?
                        <div className="search-region">
                          <input type="search" className='search' id="search-by-location" placeholder='Search Location'
                            onChange={this.searchLocation} />
                          <div id="matched-search-location">
                            {this.state.location.map((element) => {
                              return <p onClick={() => this.navigateTo(element)}>
                                {element}
                              </p>
                            })}
                          </div>
                        </div>
                        :
                        <div className="search-region">
                          <input type="search" className='search' id="search-restaurant" placeholder='Search Restaurant'
                            onChange={this.searchRestaurant} />
                          <div id="matched-search-restaurant">
                            {this.state.restaurant.map((element) => {
                              return <p onClick={() => this.navigateTo(element)}>
                                {element}
                              </p>
                            })}
                          </div>
                        </div>
                    }
                    <p
                      style={{ cursor: 'pointer', textAlign: 'left', marginTop: '6px', fontWeight: 'bold' }}
                      onClick={() => { this.setState({ searchBy: 'none' }) }}>
                      &larr;Go back
                    </p>
                  </div>
              }

            </div>
          </div>
        </div>
        <div className="bottom-home">
          <h2>What are you looking for!</h2>
          <div className="looking-for">
            <div className="row">
              <div className="col">
                <img src={northIndian} alt="North Indian" />
                <p>North Indian</p>
              </div>
              <div className="col">
                <img src={southIndian} alt="South Indian" />
                <p>South Indian</p>
              </div>
              <div className="col">
                <img src={cafe} alt="Cafe" />
                <p>Cafe</p>
              </div>
              <div className="col">
                <img src={biryani} alt="Biryani" />
                <p>Biryani</p>
              </div>
              <div className="col">
                <img src={fastFood} alt="Fast food" />
                <p>Fast Food</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function HomeFunc(props){
  const navigate = useNavigate()
  return <Home navigate={navigate}></Home>
}