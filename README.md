# contacts_web
SEARCA's contacts database (Frontend)

### Directory structure
|- **src (main)** -All your files must reside here  
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