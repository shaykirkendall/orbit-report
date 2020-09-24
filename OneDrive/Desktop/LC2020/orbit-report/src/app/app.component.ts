import { ɵAnimationGroupPlayer } from '@angular/animations';
import { Component } from '@angular/core';
import { Satellite } from './satellite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
  displayList: Satellite[];

constructor() {
  this.sourceList = [];
  this.displayList = [];
  

  window.fetch(this.satellitesUrl).then(function (response) {
    response.json().then(function (data) {

      let fetchedSatellites = data.satellites;
      // TODO: loop over satellites

      for (let i = 0; i < fetchedSatellites.length; i++) {

        let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);

        //this.sourceList.push(fetchedSatellites[i]);

        //let satellite = new Satellite(satellites[i].name, satellites[i].type, satellites[i].launchDate, satellites[i].orbitType, satellites[i].operational);
        //let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);

        this.sourceList.push(satellite);
      }

        this.displayList = this.sourceList.slice(0);
      }.bind(this));
  }.bind(this));
}
search(searchTerm: string): void {
  let matchingSatellites: Satellite[] = [];
  searchTerm = searchTerm.toLowerCase();
  for(let i=0; i < this.sourceList.length; i++) {
     let name = this.sourceList[i].name.toLowerCase();
     if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
     }
  }
  // assign this.displayList to be the array of matching satellites
  // this will cause Angular to re-make the table, but now only containing matches
  this.displayList = matchingSatellites;
}

}       
          


//    }.bind(this));
            
            // assign this.displayList to be the array of matching satellites
            // this will cause Angular to re-make the table, but now only containing matches
        
  

