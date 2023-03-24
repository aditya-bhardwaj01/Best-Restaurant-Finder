import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import toDark from '../images/toDark.png';
import toLight from '../images/toLight.png'
import { useSelector, useDispatch } from 'react-redux';
import { activePage, toggleMode } from '../actions';

class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        console.log(this.props.page)
    }

    render() {
        return (
            <div className='Navbar'>
                {/* "navbar navbar-expand-lg navbar-light bg-light" */}
                <nav className={
                    this.props.mode === 1 ?
                    'navbar navbar-expand-lg navbar-light bg-transparent':
                    'navbar navbar-expand-lg navbar-dark bg-transparent'
                    }>

                    <Link className='navbar-brand' to='/'>
                        <img src={Logo} alt="logo" className='logo-image' />
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                            <li className={this.props.activepage === 'homepage' ? 'nav-item active':'nav-item'}>
                                <Link className="nav-link font-weight-bold" to='/home'
                                onClick={ () => this.props.dispatch(activePage('homepage'))}>
                                    Home
                                </Link>
                            </li>

                            <li className={this.props.activepage === 'statspage' ? 'nav-item active':'nav-item'}>
                                <Link className="nav-link font-weight-bold" to='/stats'
                                onClick={ () => this.props.dispatch(activePage('statspage'))}>
                                    Stats
                                </Link>
                            </li>
                        </ul>

                        <form className="form-inline my-2 my-lg-0">

                            <img src={this.props.mode === 1 ? toDark:toLight} alt="Toggle mode" 
                            onClick={ () => this.props.dispatch(toggleMode())}
                            className='mode-toggler' />

                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default function NavbarFunc(props) {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.ColorModeReducer)
    const activepage = useSelector((state) => state.ChangeActivePage)
    return <Navbar dispatch={dispatch} mode={mode} activepage={activepage}></Navbar>
}
