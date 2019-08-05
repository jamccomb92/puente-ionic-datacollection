import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingController, AlertController } from "ionic-angular";
import { TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';

// Parse
import { Parse } from 'parse';

// Constants
//import { ENV } from '../../app/app.constant';
import { ENV } from '@app/env';


export class User {
  public id: string;
  public name: string;
  public email: string;
  public organization: string;
  public role: string;

}

@Injectable()
export class AuthProvider {
  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;
  private parseJavascriptKey: string = ENV.parseJavascriptKey;

  constructor(private loadCtrl:LoadingController, 
    private alertCtrl:AlertController,
    private translate:TranslateService) {
    this.parseInitialize();
    console.log('Initiated Auth');
  }

  public signin(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      //REFACTOR LATER
      let loader = this.loadCtrl.create({

        content: 'Signing in...'
      });

      let alerter = this.alertCtrl.create({
        title: 'Login Error',
        subTitle: 'Invalid username and/or password',
        buttons: ['Try Again']
      });

      loader.present();

      Parse.User.logIn(username, password, {
        success: function (user) {
          // Do stuff after successful login, like a redirect.
          loader.dismiss();
          console.log('User logged in successful with username: ' + user.get("username"));
          observer.next(true);
          observer.complete();
        },
        error: function (user, error) {
          // If the user inputs the email instead of the username
          //console.log(error);
          console.log("Trying to use email instead of Username");
          var userQuery = new Parse.Query(Parse.User);

          userQuery.equalTo('email', username);
          userQuery.first().then(function (success) {
            var username = success.toJSON().username; 
            Parse.User.logIn(username, password, {
              success: function (user) {
                // Do stuff after successful login, like a redirect.
                loader.dismiss();
                console.log('User logged in successful with email: ' + user.get("email"));
                observer.next(true);
                observer.complete();
              },
              error: function (user, error) {
                loader.dismiss().then(()=>{
                  alerter.present();
                })
                alerter.dismiss();
                console.log(error);
                observer.error(error);
                observer.complete();
              }
            });
          }, function (error) {
            loader.dismiss().then(()=>{
              alerter.present();
            })
            alerter.dismiss();
            console.log(error);
            observer.error(error);
            observer.complete();
          });
          loader.dismiss().then(()=>{
            alerter.present();
          })
          alerter.dismiss();
        }
      });
    });
  }

  public signup(firstname: string, lastname: string,username: string, password: string, email: string, organization: string,role:string): Observable<boolean> {
    return new Observable((observer) => {
      var user = new Parse.User();
      user.set('firstname', firstname);
      user.set('lastname', lastname);
      user.set('username', username);
      user.set('password', password);
      user.set('email', email);
      user.set('organization', organization);
      user.set('role', role)
      user.set('adminVerified', false)

      user.signUp(null, {
        success: (user) => {
          console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
          observer.next(true);
          observer.complete();
        },
        error: (user, error) => {
          // Show the error message somewhere and let the user try again.
          // It is likely that the user is trying to sign with a username or email already taken.
          console.log("Error: " + error.code + " " + error.message);
          observer.error(error);
          observer.complete();
        }
      });

    });
  }

  public signout(): Observable<boolean> {
    return new Observable((observer) => {
      Parse.User.logOut().then(() => observer.next(true));
    });
  }

  public forgotPassword(email:string) {
    return Parse.User.requestPasswordReset(email, {
      success: function() {
          console.log("Password reset request was sent successfully");
      },
      error: function(error) {
          console.log("The login failed with error: " + error.code + " " + error.message);
      }
  });
  }

  public currentUser(): User {
    let u = Parse.User.current();
    if (u) {
      var user = new User();
      user.id = u.id;
      user.name = u.get('username');
      user.email = u.get('email');
      user.organization = u.get('organization');
      user.role = u.get('role');
      return user;
    }
    return null
  }

  public authenticated(): boolean {
    return this.currentUser() !== null;
  }

  private parseInitialize() {
    //Back4app
    Parse.initialize(this.parseAppId,this.parseJavascriptKey);
    
    //Heroku
    //Parse.initialize(this.parseAppId);
    
    //Server
    Parse.serverURL = this.parseServerUrl;
  }

}
