import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import './forms.css'; 
const MercadoriasForm = () => {
  const formik = useFormik({
    initialValues: {
      nome: '',
      numeroRegistro: '',
      fabricante: '',
      tipo: '',
      descricao: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome é obrigatório'),
      numeroRegistro: Yup.string().required('Número de registro é obrigatório'),
      fabricante: Yup.string().required('Fabricante é obrigatório'),
      tipo: Yup.string().required('Tipo é obrigatório'),
      descricao: Yup.string().required('Descrição é obrigatória'),
    }),
    onSubmit: async (values) => {
      try {
        await api.post('/api/mercadorias', values); 
        alert('Mercadoria cadastrada com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar mercadoria', error);
        alert('Erro ao cadastrar mercadoria');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          onChange={formik.handleChange}
          value={formik.values.nome}
        />
        {formik.errors.nome ? <div>{formik.errors.nome}</div> : null}
      </div>
      <div>
        <label>Número de Registro:</label>
        <input
          type="text"
          name="numeroRegistro"
          onChange={formik.handleChange}
          value={formik.values.numeroRegistro}
        />
        {formik.errors.numeroRegistro ? <div>{formik.errors.numeroRegistro}</div> : null}
      </div>
      <div>
        <label>Fabricante:</label>
        <input
          type="text"
          name="fabricante"
          onChange={formik.handleChange}
          value={formik.values.fabricante}
        />
        {formik.errors.fabricante ? <div>{formik.errors.fabricante}</div> : null}
      </div>
      <div>
        <label>Tipo:</label>
        <input
          type="text"
          name="tipo"
          onChange={formik.handleChange}
          value={formik.values.tipo}
        />
        {formik.errors.tipo ? <div>{formik.errors.tipo}</div> : null}
      </div>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          name="descricao"
          onChange={formik.handleChange}
          value={formik.values.descricao}
        />
        {formik.errors.descricao ? <div>{formik.errors.descricao}</div> : null}
      </div>
      <button type="submit">Cadastrar Mercadoria</button>
    </form>
  );
};

export default MercadoriasForm;
