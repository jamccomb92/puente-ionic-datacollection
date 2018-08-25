 # Puente Data Collection and Asset Identification Application 

![](https://img.shields.io/badge/build-success-brightgreen.svg)

# Stack

![](https://img.shields.io/badge/ionic_3-✓-blue.svg)
![](https://img.shields.io/badge/angular_2+-✓-blue.svg)
![](https://img.shields.io/badge/parse_server-✓-blue.svg)

# About this Program

This is a Community Health Records Data Collection Application that integrates Ionic 3, Angular 2+ and Parse Server. It's being used for community development data collection and assessment in the Dominican Republic.

# Key Libraries

Uses ionic-native geolocation and google sdk


## Some older screenshots

<p align="center">
  <img src="https://github.com/murraco/ionic-parse-server/blob/master/signin.png" width="40%" />
  <img src="https://github.com/hopetambala/puente-parse-ionic/blob/master/home.png" width="40%" />
</p>

# File structure

```
puente-data-collection/
│
├── resources/
│
├── src/
│   ├── app/                      *Holds main logic for application
│   │   ├── app.constant.ts       
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.template.html
│   │   └── main.ts
│   │
│   ├── assets/
│   │   └── icon/
│   │       └── favicon.ico
│   │
│   ├── pages/                    * Holds Model, View, and Controller for each page of the application
│   │
│   ├── providers/                * Provides "services" or functions to be used/re-used throughout application
│   │
│   ├── theme/
│   │   └── variables.scss        * Defines CSS scheme for application
│   │
│   └── index.html
│
├── typings/
│    └── cordova-typings.d.ts
│
├── .editorconfig                 * Defines coding styles between editors
├── .gitignore                    * Example git ignore file
├── config.xml                    * Cordova configuration file
├── ionic.config.json             * Ionic configuration file
├── LICENSE                       * MIT License
├── package.json                  * Defines our JavaScript dependencies
├── package-lock.json             * Defines our exact JavaScript dependencies tree
├── README.md                     * This file
├── tsconfig.json                 * Defines the root files and the compiler options
├── tslint.json
└── *.png                         * Images for the README.md
```

## Ionic Framework

The Ionic framework allows for the creation of highly interactive, **cross-platform mobile applications** that can be deployed across iOS, Android, and Windows devices. These hybrid applications include native functionalities, exhaustive gestures, and customizable tools to enhance user-friendliness. Those powerful capabilities are brought to Ionic because it provides mobile-friendly `HTML`, `JS`, and `CSS` components to developers.

Some of its advantages are:

- Open source
- Code once, run on all mobile devices
- One programming language for all mobile OS
- Use of well-known web technologies
- A huge community

## Parse Server

**Parse Server** is an open source version of the Parse backend that can be deployed to any infrastructure that can run `Node.js`. It works with the Express web application framework and can be added to existing web applications, or run by itself. Its repository is on [Github](https://github.com/parse-community/parse-server).

Parse offer a backend to store data, push notifications, social media integration for our app etc. The features provided tend to be helpful in prototyping quickly.

- **General Purpose**: Open Source
- **Hosting**: Self-hosting or Parse Server Hosting providers. Supports local testing and development
- **Custom Code**: Supported via Cloud Code
- **Database**: Mongo DB
- **Push**: Support push notifications for Android, iOS. Also users can manage Push Notifications campaigns
- **Storage**: No restricted time limits and no file storage restrictions. Control over backup, restore and database indexes
- **Ideal for**: General purpose applications

# Known Issues
- Android Production has geolocation issues
- Performance Issues on older/slower devices

# Contribution

- Report issues
- Open pull request with improvements
- Spread the word
- Reach out to me directly at <tech@puente-dr.com>
