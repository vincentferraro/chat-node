
export function randomName(): Function{
    let count = 0
    let listName=["Alice", "Henry","Georges"]
    return ()=>{
      let name= listName[count]
      count = count === 2? 0 : count+=1
      return name
    }
  }