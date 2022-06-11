import axios from "axios"

export default async function handler(req, res) {
  
  const url = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=&interval=1d,30d&convert=USD`
  const { data } = await axios(url)    
  
  res.status(200).json(data)
}