import React, { Component } from 'react';
import './ChargerList.css';

class ChargerElement extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick  () {
    console.log("comp" +this.props.ind +"clicked")
    this.setState({selected:(this.props.ind+1)})
  }

  render(){
    let chargerClass='unselected-charger';
    if (this.props.selected)
      chargerClass = 'selected-charger'
    return(
      <div onClick={this.handleClick}>
        <p className={chargerClass} >
          <span>{this.props.charger.ID},</span> <span>{this.props.charger.AddressInfo.Title},</span>
        </p>
      </div>
    )
  }
}

class ChargerList extends Component{

  render(){
    return(
      <div className="chargeList">
        <div className="listTitle">
          <h3>Chargers nearby</h3>
        </div>
        <ul>
          {this.props.chrgList.map((chrg,i) => {
            return(

               <ChargerElement charger={chrg}  key={i} ind={i} selected={this.props.selInd==(i+1)}   />

            )
          })}
        </ul>
      </div>
    )
  }
}

export default ChargerList;
