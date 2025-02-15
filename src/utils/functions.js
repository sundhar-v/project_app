export const  isValidFileUploaded=(file)=>{
  const validExtensions = ['xls','xlsx','csv']
  const fileExtension = file.name.split('.').pop()
  return validExtensions.includes(fileExtension)
}

export const timeStringToMinutes = (time) => {
  const [hour, minutes] = time.split(":").map(Number)
  return hour*60+minutes
}

export const timeMinutesToString = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
