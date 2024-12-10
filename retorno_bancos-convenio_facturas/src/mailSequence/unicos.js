function unicos(data) {
  let newData=[]
  for(let i in data){
    let row = data[i]
    let duplicate=false;
   
    for(let j in newData){
      if(row.join()== newData[j].join()){
        duplicate=true;
      }
    }

    if(!duplicate){
      newData.push(row)
    }

  }

  return newData;
}