import React, { Component } from 'react';
import './MyPopup.css'




function ShowDistance(props) {


  if (props.dist<1)
    return <p>{Number(props.dist*1000).toFixed(0)}m away</p>
  else
    return <p>{Number(props.dist).toFixed(1)}km away</p>

}




class MyPopup extends Component {

  render(){
    return(

      <div className="MyPopup">
      <h3>{this.props.selStation.AddressInfo.Title}</h3>
        <p className="adr">  {this.props.selStation.AddressInfo.AddressLine1} </p>
        <ShowDistance dist={this.props.selStation.AddressInfo.Distance} />
        
      </div>
    )
  }

}


/*<StyledPopup>
<div>{selStation.AddressInfo.Title}</div>
<div>

  <p className="adr">  {selStation.AddressInfo.AddressLine1} </p>
  <p className="dist">   {selStation.AddressInfo.Distance}</p>

</div>
</StyledPopup>*/

export default MyPopup;
