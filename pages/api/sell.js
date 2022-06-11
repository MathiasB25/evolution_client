import axios from "axios"

export default async function handler(req, res) {
    const { symbol, name, amount: convert, user: _id, price, config } = req.body

    try {
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/tokens/sell`, { symbol, name, amount: convert, user: _id, price }, config)
        res.json(data)
    } catch (error) {
        console.log(error.response.data)
    }
}