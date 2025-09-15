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

const create = (req, res) => {
  const { nome, tipo, anoFabricacao, cor, quantidadesEstoque } = req.body;

  if (!nome || !tipo) {
    return res.status(400).json({
      sucess: false,
      message: "Nome e tipo são campos obrigatórios!",
    });
  }

  const novoBrinquedo = {
    id: brinquedos.length++,
    nome: nome,
    tipo: tipo,
    anoFabricacao: anoFabricacao,
    cor: cor,
    quantidadesEstoque: quantidadesEstoque,
  };

  brinquedos.push(novoBrinquedo);

  res.status(200).json({
    sucess: true,
    message: "Brinquedo criado com sucesso!",
    data: novoBrinquedo,
  });
};

const deletar = (req, res) => {
  let id = parseInt(req.params.id);

  const brinquedoParaDeletar = brinquedos.find((b) => b.id === id);

  if (!brinquedoParaDeletar) {
    return res.status(404).json({
      sucess: false,
      message: `Esse ID de brinquedo não existe: ${id}`,
    });
  }

  const brinquedosFiltrados = brinquedos.filter(
    brinquedo => brinquedo.id != id
  );

  brinquedos.splice(0, brinquedos.length, ...brinquedosFiltrados);

  res.status(200).json({
    sucess: true,
    message: "Brinquedo deletado com sucesso!",
    brinquedoDeletado: brinquedoParaDeletar,
  });
};

export { getAll, getByID, create, deletar };
