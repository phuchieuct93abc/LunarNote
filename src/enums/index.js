export const LargeFont = "1";
export const MediumFont = "2";
export const SmallFont = "3";
export const merge = (source,target)=>{
  let result = {};
	Object.keys(source).forEach((key) =>{
    let soruceObj = source[key];
    let targetObj = target[key]?target[key]:{}

      result[key] = Object.assign({},source[key],targetObj)

    } );
  return result

}
