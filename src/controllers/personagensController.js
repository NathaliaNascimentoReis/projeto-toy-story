import dados from "../models/dados.js";
const { brinquedos } = dados;

const getAll = (req, res) => {
  res.status(200).json({
    total: brinquedos.length,
    data: brinquedos,
  });
};

const getByID = (req, res) => {
  const id = parseInt(req.params.id);
  const brinquedo = brinquedos.find((b) => b.id === id);

  if (brinquedo) {
    res.status(200).json(brinquedo);
  } else {
    res.status(404).json({
      mensagem: "Esse brinquedo não existe",
    });
  }
};

export { getAll, getByID };