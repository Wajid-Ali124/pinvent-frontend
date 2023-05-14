import React from 'react'
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss"
import heroimage from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';


function Home() {
    return (
        <div className='home'>
            <nav className="container --flex-between">
                <div className="logo">
                    <RiProductHuntLine size={35} />
                </div>
                <ul className="home-links">
                    <ShowOnLogout>
                        <li>
                            <Link to="/register" >Register</Link>
                        </li>
                        <li>
                            <button className="--btn --btn-primary">
                                <Link to="/login" >Login</Link>
                            </button>
                        </li>
                    </ShowOnLogout>
                    <ShowOnLogin>
                        <li>
                            <button className="--btn --btn-primary">
                                <Link to="/dashboard" >Dashboard</Link>
                            </button>
                        </li>
                    </ShowOnLogin>
                </ul>
            </nav>

            {/* Hero Section */}
            <section className="container hero">
                <div className="hero-text">
                    <h2>Inevntory & Stock Management Solutions</h2>
                    <p>Inventory System to control and manage products in the ware house in real time and integrated to make it easier to develop your business..</p>
                    <div className="hero-buttons">
                        <button className="--btn --btn-primary">
                            <Link to="/dashboard" >Free Trail 1 Month</Link>
                        </button>
                    </div>
                    <div className="--flex-start">
                        <NumberText num="14k" text="Brand Owners" />
                        <NumberText num="23k" text="Active Users" />
                        <NumberText num="500+" text="Partners" />
                    </div>
                </div>
                <div className="hero-image">
                    <img src={heroimage} alt="Incentory" />
                </div>
            </section>


        </div>
    )
}

const NumberText = ({ num, text }) => {
    return (
        <div className="--mr ">
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
}

export default Home
