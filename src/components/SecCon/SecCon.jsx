import './SecCon.css'
import PropTypes from 'prop-types'

const SecCon = props => {
  return (
    <div className='sec'>
        <p>Feels Like : {props.fl}°c</p>
        <p>Wind : {Math.round(props.sp)}m/s</p>
        <p>Humidity : {props.hum}%</p>
        <p>Pressure : {props.pr} hPa</p>
    </div>
  )
}

SecCon.propTypes = {
    fl : PropTypes.string,
    pr : PropTypes.number,
    sp : PropTypes.number,
    hum : PropTypes.number
}

export default SecCon