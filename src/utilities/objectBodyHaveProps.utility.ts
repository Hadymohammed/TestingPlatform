const haveProperities=(obj:Object,refProps:string[]):boolean=>{
    for (const prop of refProps) {
        if(obj.hasOwnProperty(prop)==false){
            return false;
        }
    }
    return true;
}
export default haveProperities;