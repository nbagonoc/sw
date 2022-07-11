# SW Fileshare
A coding exam

Was planning to make the client side a react app, but when you have a 9-5 job, it's difficult to find time(see commit messages date lol) to complete all of the task of this coding exam(more like a mini POC to be honest)

Task that were NOT COMPLETED:
* Client side (try the app via postman nalang :D)
* Choosing Provider ENV vars
* Provider(google, bigbucket, aws, etc...)
* Server daily upload limit

Some problems:
* After some clode cleanup before sending this:
    * Unit test for GET and DELETE is failing sometimes
    * I think it has to do with the promises i've used in fs module acting as my DB, or with thow I test using superscript
    * The issue is not being affective when workign on Postman.
* Bugs.. bugs... bugs...
    * Well, actually just one. Sometimes the data.JSON becomes empty(including the []), which breaks the app. No idea why thats happening...



## Installation

```bash
npm install
```

## Testing

```bash
npm run test
```

## Usage

```bash
npm run start
```
```bash
npm run dev
```