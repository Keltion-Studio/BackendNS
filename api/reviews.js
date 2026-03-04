export default async function handler(req, res) {
  const { product_id } = req.query;

  if (!product_id) {
    return res.status(400).json({ error: "Missing product_id" });
  }

  try {
    const response = await fetch(
      `https://api.whop.com/api/v1/reviews?product_id=${product_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=3600");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}