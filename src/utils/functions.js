export const  isValidFileUploaded=(file)=>{
  const validExtensions = ['xls','xlsx','csv']
  const fileExtension = file.name.split('.').pop()
  return validExtensions.includes(fileExtension)
}