import React, { Component } from 'react';
import './ChargerList.css';

class ChargerElement extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    console.log("hello from" +this.props.charger.ID)
    this.props.setSelectedFromClick(this.props.charger);
  }
  render(){
    let chargerClass='unselected-charger';
    if (this.props.selectedID==this.props.charger.ID)
      chargerClass = 'selected-charger'
    return(
      <div className='charger-element' onClick={this.handleClick} >
        <p className={chargerClass} >
          <span>{this.props.charger.ID},</span> <span>{this.props.charger.AddressInfo.Title},</span>
        </p>
      </div>
    )
  }
}

class ChargerList extends Component{

  constructor(props){
    super(props);

  }

  render(){

    return(
      <div className="chargeList">
        <div className="listTitle">
          <h3>Chargers nearby</h3>
        </div>
        <div className="list-objects">
            {this.props.chrgList.map((chrg,i) =>
                  (
                  <ChargerElement charger={chrg} key={i}  chargerID={chrg} selectedID={this.props.selectedID} setSelectedFromClick={this.props.clickOnList}    />
                )
            )

        }
        </div>
      </div>
    )
  }
}

export default ChargerList;
