const getCurrency = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "Missing 'from' or 'to' parameter" });
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];

    if (!rate) {
      return res.status(404).json({ error: "Currency not found" });
    }

    res.json({ rate });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exchange rate" });
  }
};

export default { getCurrency };
