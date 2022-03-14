import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from "../Styles/Navbar.module.css"
import bag from "../Static/bag.svg"
import home from "../Static/home.svg"

import { connect } from 'react-redux'
import { store } from '../Redux/store'

class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {
      currency: store.getState().currency
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({currency: store.getState().currency})
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  handleCurrency = (e) => {
    localStorage.setItem("preferredCurrency", e.target.value)
    this.props.changeCurrency(e.target.value)
  }

  render() {
    return (
      <nav className={styles.navbar}>
          <Link to="/">
            <img src={home} alt="home icon" width="38"  className={styles.home}/>
          </Link>

          <div className={styles.categories}>
              <span className={styles.category} onClick={()=>this.props.changeCategory("all")}>All</span>
              <span className={styles.category} onClick={()=>this.props.changeCategory("tech")}>Tech</span>
              <span className={styles.category} onClick={()=>this.props.changeCategory("clothes")}>Clothes</span>
          </div>

          

          <div className={styles.misc}>
              <select className={styles.currency} value={this.state.currency} onChange={this.handleCurrency}>
                  <option className={styles.currencyOption} value="USD">USD</option>
                  <option className={styles.currencyOption} value="GBP">GBP</option>
                  <option className={styles.currencyOption} value="AUD">AUD</option>
                  <option className={styles.currencyOption} value="JPY">JPY</option>
                  <option className={styles.currencyOption} value="RUB">RUB</option>
              </select>

                <button aria-label="show shopping bag button">
                    <img src={bag} alt="shopping bag icon" />
                    <span className={styles.badge}>10</span>
                </button>
          </div>
      </nav>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
     changeCategory: (category)=> dispatch({type: "CATEGORY_UPDATE", category: category}),
     changeCurrency: (currency)=> dispatch({type: "CURRENCY_UPDATE", currency: currency}),
  }
}

export default connect(null, mapDispatchToProps)(Navbar)