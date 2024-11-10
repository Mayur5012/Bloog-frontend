// fetching loggedin user info 

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/users/own') 
    const data = await response.json()
    resolve({data})
  }
  );
}


