// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";
//mske async funtion with id parameter
async function getUserData(id) {
//make sure the id is valid
if (typeof id !== 'number' || id < 1|| id >10 ){
    return Promise.reject(`Invalid ID`)
  }
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  
  try{

    //to check to make sure data from central
    const valueReturnedFromCentral = await central(id);
    if (!valueReturnedFromCentral){
      return Promise.reject(`Database Failure`)
    };
  
    const[databaseInfo,vaultInfo] = await Promise.all([
      dbs[valueReturnedFromCentral](id),
      vault(id)

    ]);
    return {
      id,
      ...databaseInfo,
      ...vaultInfo
    }
   

  }catch(error){
    return Promise.reject(`Database error - ${error}`);
  }
  
  };
 
    




