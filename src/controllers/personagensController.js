import dados from "../models/dados.js";
const { brinquedos } = dados;

const getAll = (req, res) => {
  res.status(200).json({
    total: brinquedos.length,
    data: brinquedos,
  });
};

export {getAll};