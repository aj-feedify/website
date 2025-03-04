import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import logo from '../../assets/logo/logo.png'
import './Home.css'

export default function Home() {
  return (
    <>
      <div className="container container_content">
        <div className="home_about list_y d_f_ce">
          <img className="home_img" src={logo} alt="Feedify logo" />
          <Link className="home_btn" to={'/dashboard'}>
            <Button>Explore</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
