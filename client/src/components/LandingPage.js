import React, { Component } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import landingimage from '../images/LandingPage.jpg'
import restaurant from '../images/restaurant.png'
import stats from '../images/stats.png'
import { activePage } from '../actions';
import Navbar from './Navbar';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: 0,
      interValidRest: null,
      stats: 0,
      interValidStat: null
    }
  }

  explore = () => {
    this.props.dispatch(activePage('statspage'))
    this.props.navigate('/home')
  }

  componentDidMount = () => {
    const restCount = setInterval(() => {
      this.setState({
        restaurant: this.state.restaurant + 1,
        interValidRest: restCount
      })
    }, 100);

    const statCount = setInterval(() => {
      this.setState({
        stats: this.state.stats + 1,
        interValidStat: statCount
      })
    }, 80);

    AOS.init({
      duration: 1000,
      once: true
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interValidRest);
    clearInterval(this.state.interValidStat);
  }

  render() {
    if (this.state.restaurant >= 39) {
      clearInterval(this.state.interValidRest);
    }
    if(this.state.stats >= 49) {
      clearInterval(this.state.interValidStat)
    }

    return (
      <div className='LandingPage' data-aos="fade-up">
        <Navbar page={"landing-page"} />
        <div className="top-landing row">
          <div className="top-left-landing col-sm">
            <h3>"Discover Your Next Favorite Restaurant with Just a Tap!"</h3>
            <p>
              With so many options and limited time, it becomes tough to choose the right one that
              caters to your taste and preferences. But now, with our restaurant discovery app, you
              can say goodbye to the hassle of finding the perfect place to dine. So, whether you're a
              foodie looking to try something new or simply in the mood for a delicious meal, you are at
              the right place.
            </p>
            <div className="to-home-from-landing">
              <button type="button" className="btn btn-success btn-lg" onClick={this.explore}>
                Explore &rarr;
              </button>
            </div>
          </div>
          <div className="top-right-landing col-sm">
            <img src={landingimage} className='img-fluid' alt="Landing page" />
          </div>
        </div>

        <div className="bottom-landing">
          <div className="container">
            <div className="row justify-content-around bottom-landing-main">
              <div className="col-4 first-count">
                <p className="count-number">{this.state.restaurant}K+</p>
                <img src={restaurant} alt="Restaurant" className='img-fluid' />
                <p className="count-desc">Restaurant Data from Bengaluru</p>
              </div>
              <div className="col-4 second-count">
                <p className="count-number">{this.state.stats}+</p>
                <img src={stats} alt="Stats" className='img-fluid' />
                <p className="count-desc">Stats to give you insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function LandingPageFunc(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return <LandingPage navigate={navigate} dispatch={dispatch}></LandingPage>
}
