// Function to generate a random string
function getRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Generate random police stations
  const numberOfStations = 699;
  const policeStations = [];
  
  for (let i = 1; i <= numberOfStations; i++) {
    const station = {
      id: i,
      name: getRandomString(10) + ' POLICE STATION',
      address: `xyz ${i} ok`,
      rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
      image: 'https://images.unsplash.com/photo-1600081191763-05da665acf1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9saWNlJTIwc3RhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    };
  
    policeStations.push(station);
  }
  const fixedp={
    id:700,
    name:"SURAJGARH POLICE STAION",
    address:'xyz',
    rating:3,
      image: 'https://images.unsplash.com/photo-1600081191763-05da665acf1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9saWNlJTIwc3RhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',

  }
  policeStations.push(fixedp);
  
  // Export the array
  export default policeStations;
  