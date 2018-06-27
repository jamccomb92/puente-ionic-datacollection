import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

import { App, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { QueryServiceProvider } from '../../../providers/query-service/query-service';

import { AuthProvider } from '../../../providers/auth/auth';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Component({
  selector: 'environmentalhistory',
  templateUrl: 'environmentalhistory.html'
})
export class EnvironmentalHistoryForm {

  environmentalHealth = {
    yearsLivedinthecommunity: null,
    yearsLivedinThisHouse: null,
    waterAccess: null,
    typeofWaterdoyoudrink: null,
    latrineAccess: null,
    clinicAccess: null,
    conditionoFloorinyourhouse: null,
    conditionoRoofinyourhouse: null,
    medicalproblemswheredoyougo: null,
    dentalproblemswheredoyougo:null
  }

  //Design Element
  accordionItems: any = [];
  constructor(private auth: AuthProvider,  
    private app: App, 
    private geolocation:Geolocation,
    private parseProvider: ParseProvider,
    private querySrvc: QueryServiceProvider,
    private viewCtrl: ViewController) {

    console.log('Hello EnvironmentalHistoryForm ');
    this.auth.authenticated();
    
    //Design Element: Accordion
    this.accordionItems = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
    ];
  }

  public post_n_clear() {
    //Posts an object to parse server and clears the local form array

    //Adds array to parseServer (newSurvey)
    //Then adds element to local array (surveyPoint)
    //Then clears the Form/array (surveyPoint)

    //TODO, change how this is posted to reflect new database design
    this.parseProvider.postObjectsToClass(this.environmentalHealth,'SurveyData').then((/*surveyPoint*/) => {
      //This is for the list of results
    //this.submittedList.push(surveyPoint);
      for (var key in this.environmentalHealth){
        this.environmentalHealth[key] = null;
      }
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  //Navigation
  close() {
    this.viewCtrl.dismiss();
  }

  //Design Element: Accordion
  expandItem(item){
 
    this.accordionItems.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

  }



}
