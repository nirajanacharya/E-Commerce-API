const generateRandomString= (len = 100)=>{

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = chars.length;
    let random="";
    for(i=0;i<len;i++){
        let posn = Math.ceil((Math.random()*(length-1)));
        random+= chars[posn];
    } 
    return random;
}

const generateMinutes = (min)=>{
    const today = new Date();
    today.setMinutes(today.getMinutes()+ +min);
    return today;
}
module.exports= {generateRandomString,
generateMinutes};