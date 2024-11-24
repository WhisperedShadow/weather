import './MainCon.css'
import PropTypes from 'prop-types'

const MainCon = props => {
  let code = props.img;
  const icon = `https://openweathermap.org/img/wn/${code}@2x.png`
  document.icon=icon;
  return (
    <div className='main'>
      <div>
        <img src={icon} alt="icon" className='icon'/>
      </div>
      <div>
        <h1>{Math.round(props.temp)} °C</h1>
        <h3>{props.main}</h3>
        <p>{props.des}</p>
      </div>
    </div>
  )
}

MainCon.propTypes = {
  img: PropTypes.string,
  temp: PropTypes.number,
  main : PropTypes.string,
  des : PropTypes.string
}

export default MainCon