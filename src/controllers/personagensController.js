import { parse } from "dotenv";
import dados from "../models/dados.js";
const { brinquedos } = dados;

const getAll = (req, res) => {
    const {tipo} = req.query;
        let resultado = brinquedos
    
        if (tipo) {
            resultado = resultado.filter((b) => b.tipo.toLowerCase().includes(tipo.toLowerCase()))
        }

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
    (brinquedo) => brinquedo.id !== id
  );

  brinquedos.splice(0, brinquedos.length, ...brinquedosFiltrados);

  res.status(200).json({
    sucess: true,
    message: "Brinquedo deletado com sucesso!",
    brinquedoDeletado: brinquedoParaDeletar,
  });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);

  const { nome, tipo, anoFabricacao, cor, quantidadesEstoque } = req.body;

  const idParaEditar = id;

  if (isNaN(idParaEditar)) {
    return res.status(400).json({
      sucess: false,
      message: "O ID deve ser um número válido!",
    });
  }

  const brinquedoExiste = brinquedos.find(
    (brinquedo) => brinquedo.id === idParaEditar
  );

  if (!brinquedoExiste) {
    return res.status(400).json({
      sucess: false,
      message: `Brinquedo com id: ${id} não existe`,
    });
  }

  const brinquedosAtualizados = brinquedos.map((brinquedo) =>
    brinquedo.id === idParaEditar
      ? {
          ...brinquedo,
          ...(nome && { nome }),
          ...(tipo && { tipo }),
          ...(anoFabricacao && { anoFabricacao: parseInt(anoFabricacao) }),
          ...(cor && { cor }),
          ...(quantidadesEstoque && { quantidadesEstoque }),
        }
      : brinquedo
  );

  brinquedos.splice(0, brinquedos.length, ...brinquedosAtualizados);

  const brinquedoNovo = brinquedos.find(
    (brinquedo) => brinquedo.id === idParaEditar
  );

  res.status(200).json({
    sucess: true,
    message: `Dados de Brinquedo ID ${idParaEditar} atualizados com sucesso!`,
    brinquedo: brinquedoNovo,
  });
};

export { getAll, getByID, create, deletar, update, tipoFiltro};
