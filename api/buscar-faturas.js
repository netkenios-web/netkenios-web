export default async function handler(req, res) {
  const { customer_id } = req.query;
  const TOKEN = process.env.MIKWEB_TOKEN;

  if (!customer_id) return res.status(400).json({ error: "ID do cliente ausente" });
  if (!TOKEN) return res.status(500).json({ error: "Configuração de API ausente no servidor" });

  try {
    const response = await fetch(`https://api.mikweb.com.br/v1/admin/billings?customer_id=${customer_id}&per_page=100&sort_field=due_day&sort_direction=asc`, {
      headers: { 
        'Authorization': `Bearer ${TOKEN}`, 
        'Content-Type': 'application/json' 
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error("Erro na busca de faturas:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
