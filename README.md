# contacts_web
SEARCA's contacts database (Frontend)

### Requirements
- Apache
- [NodeJS >= v8.9.4](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install#mac-tab)



### Installation
1.) Install [Contact's database API](https://github.com/SEARCAPhil/contacts_api)    

2.) Clone this repository and checkout to `develop` branch to see the latest fetures and updates
 > git clone https://github.com/SEARCAPhil/contacts_web.git   
 git checkout -b develop  


3.) Install dependencies
  > yarn install    

4.) Bundle assets
> webpack 


5.) Open your prefered browser and navigate to 
  > http://localhost/contacts_web/www/#/contacts 


### Directory structure
|- **src (main)** - All your files must reside here  
|--- **assets**   
|------ css   
|------ fonts   
|------ img    
|--- **components**   
|----- **your-component** (Sample custom component)  
|--------- **actions** *(CRUD Operations)*  
|------------- create.js   
|------------- retrieve.js   
|------------- update.js   
|------------- delete.js   
|------------- [ . . . ]   
|---------- index.styl (Custom style)   
|---------- index.js (Component main entry file)   
|--- **pages** *(different pages loaded to DOM by routers)*   
|--- **services** (AJAX calls)   
|--- **routers** (Defines routing mechanism)  
|--- **utils** (*general* Classes that could be used anywhere) 

|- **www** - This will be generated after bundling the application by running 
  > webpack