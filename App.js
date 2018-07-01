import React, { Component } from 'react';


import ReactMapboxGl, { Layer, Feature , ZoomControl,Marker,Popup } from "react-mapbox-gl";
import MyPopup from "./Components/MyPopup"


import './App.css';
import ChargerList from './ChargerList';
import styled from 'styled-components';



const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoic3RhdmRhdiIsImEiOiJjaml2ZGQ3cWQwYmIxM3dtdHV6OGk0aTJoIn0.VCTW6cxNK0vAb_fr1QvKww"

});



const dresdenCords = {
  lat:51.050407,
  lng:13.737262
}

const Mark = styled.div`
  background-color: #e74c3c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 4px solid #eaa29b;
`;

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

class App extends Component {


  constructor(props){
    super(props);
    this.state = {  test : '',chargersNear:[] ,center:[dresdenCords.lng,dresdenCords.lat], zoom:[8],selected:0};
  }



  getStations = async (lat,lng,distance=500,maxresults=100,distanceunit='KM') => {
    let url = "/api/stations?latitude="+lat+"&longitude="+lng+"&distance="+distance+"&maxresults="+maxresults+"&distanceunit"+distanceunit;
    let response = await fetch(url);
    let data = await response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  }

   onDragEnd = (evt:any) => {
    this.setState({selected:0})
    this.getStations(this.state.map.getCenter().lat,this.state.map.getCenter().lng)
    .then(data=> {
    //  console.log("got new data")
      this.setState({chargersNear:data})
    })
    .catch(err => console.log(err));
  }


  onStyleLoad= el =>  {this.setState({map : el}) };

  testApi = async () => {
    const response = await fetch('/test');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };


  markerClick(chrgStation, feature ){
/*weiß nicht warum die Reihenfolge ist diese, wenn ich bind bei Aufruf nutze*/
  console.log("marker Clicked")
  console.log("chrgStation:",chrgStation)
  console.log("feature:",feature)
  console.log("setting state:")
  this.setState({selStation:chrgStation})
  this.setState({selected:feature.feature.properties.id+1}) /*plus 1 um 0 als kein zu bezeichnen */
  console.log(feature.feature.properties.id)

  }

  onMouseEnter = (i) => {
    console.log("Mouse on:"+i);
  }
  componentDidMount(){
    this.testApi()
      .then(res => this.setState({ test: res.express }))
      .catch(err => console.log(err));
    this.getStations(dresdenCords.lat,dresdenCords.lng)
      .then(data=> {
        console.log("Got data in Dresden:",data)
        this.setState({chargersNear:data})})
      .catch(err => console.log(err));
  }

   onToggleHover(cursor: string, { map }: { map: any }) {
   map.getCanvas().style.cursor = cursor;
  }

  render() {
    const {selStation,selected } = this.state;
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Emobility App</h1>
        </header>

        <div className="map-List">
          <ChargerList chrgList={this.state.chargersNear} selInd={this.state.selected} /> {/* diplay left*/}
          <div className="mapCont">      {/* diplay right*/}
            <Map
            style="mapbox://styles/mapbox/streets-v8"
            onStyleLoad={this.onStyleLoad}
            zoom = {this.state.zoom}
            center = {this.state.center}
            onDragEnd={this.onDragEnd}
            containerStyle={{
              height: "60vh",
              width: "80vw"}}>

                <ZoomControl></ZoomControl>
                {<Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "fuel-15" }}>
                  {this.state.chargersNear.map((chSt,i)=>{
                    return(
                      <Feature
                      onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                      onMouseLeave={this.onToggleHover.bind(this, '')}
                      key = {chSt}
                      onClick = {this.markerClick.bind(this,chSt)}
                      coordinates={[chSt.AddressInfo.Longitude,chSt.AddressInfo.Latitude]}
                      />
                    )
                })
                }
                </Layer>}
                {selected && (
                  <Popup key={selStation.id} coordinates={[selStation.AddressInfo.Longitude,selStation.AddressInfo.Latitude]}>

                    <MyPopup selStation={this.state.selStation}/>
                    </Popup>
                  )}
           </Map>
           </div>
       </div>
      </div>
    );
  }
}


export default App;
