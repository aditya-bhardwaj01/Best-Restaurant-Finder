import React, { Component } from 'react'
import Navbar from './Navbar';
import AOS from "aos";
import "aos/dist/aos.css";
import northIndian from '../images/north-indian.png'
import southIndian from '../images/south-indian.jpg'
import cafe from '../images/cafe.jpg'
import biryani from '../images/biryani.jpg'
import fastFood from '../images/fast-food.jpg'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      index: 0,
      typingSpeed: 100,
      searchBy: "none",
      location: ['Mumbai', 'Bengaluru', 'Chennai', 'Pune', 'Hyderabad', 'Mumbai', 'Bengaluru', 'Chennai', 'Pune', 'Hyderabad'],
      restaurant: ['abcd', 'hdksl', 'yhdhd', 'yhfhf', 'tets', 'abcd', 'hdksl', 'yhdhd', 'yhfhf', 'tets']
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
                          <input type="search" className='search' id="search-by-location" placeholder='Search Location' />
                        </div>
                        :
                        <div className="search-region">
                          <input type="search" className='search' id="search-restaurant" placeholder='Search Restaurant' />
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
            <div class="row">
              <div class="col">
                <img src={northIndian} alt="North Indian" />
                <p>North Indian</p>
              </div>
              <div class="col">
                <img src={southIndian} alt="South Indian" />
                <p>South Indian</p>
              </div>
              <div class="col">
                <img src={cafe} alt="Cafe" />
                <p>Cafe</p>
              </div>
              <div class="col">
                <img src={biryani} alt="Biryani" />
                <p>Biryani</p>
              </div>
              <div class="col">
                <img src={fastFood} alt="Fast food" />
                <p>Fast Food</p>
              </div>
            </div>
            {/* <img src={northIndian} alt="North Indian" />
            <img src={southIndian} alt="South Indian" />
            <img src={cafe} alt="Cafe" />
            <img src={biryani} alt="Biryani" />
            <img src={fastFood} alt="Fast food" /> */}
          </div>
        </div>
      </div>
    )
  }
}
