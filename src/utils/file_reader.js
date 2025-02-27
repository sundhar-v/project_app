export const readJSONFile = (file, setInputData) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedJson = JSON.parse(e.target.result); // Parse JSON
        setInputData(parsedJson)
      } catch (error) {
        setInputData({})
      }
    };

    reader.readAsText(file); 
  }
}