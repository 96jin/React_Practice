export default function handler(req, res) {
  const { pid } = req.query
  console.log(req.query)
  res.json({text: pid})
}