import axios from "axios"

export default async function handler(req, res) {
  const { data } = await axios(`${process.env.SERVER_URL}/api/tokens/currencies`)    
  res.status(200).json(data)
}