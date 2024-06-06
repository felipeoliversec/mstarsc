import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import './forms.css'; 

const EntradasForm = () => {
  const [mercadorias, setMercadorias] = useState([]);

  useEffect(() => {
    const fetchMercadorias = async () => {
      try {
        const response = await api.get('/api/mercadorias');
        setMercadorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar mercadorias:', error);
      }
    };
    fetchMercadorias();
  }, []);

  const formik = useFormik({
    initialValues: {
      mercadoriaId: '',
      quantidade: '',
      dataHora: '',
      local: '',
    },
    validationSchema: Yup.object({
      mercadoriaId: Yup.string().required('Mercadoria é obrigatória'),
      quantidade: Yup.number().required('Quantidade é obrigatória').positive().integer(),
      dataHora: Yup.date().required('Data e Hora são obrigatórias'),
      local: Yup.string().required('Local é obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        await api.post('/api/entradas', values);
        alert('Entrada registrada com sucesso!');
      } catch (error) {
        console.error('Erro ao registrar entrada', error);
        alert('Erro ao registrar entrada');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Mercadoria:</label>
        <select
          name="mercadoriaId"
          onChange={formik.handleChange}
          value={formik.values.mercadoriaId}
        >
          <option value="">Selecione a mercadoria</option>
          {mercadorias.map((mercadoria) => (
            <option key={mercadoria.id} value={mercadoria.id}>
              {mercadoria.nome}
            </option>
          ))}
        </select>
        {formik.errors.mercadoriaId ? <div>{formik.errors.mercadoriaId}</div> : null}
      </div>
      <div>
        <label>Quantidade:</label>
        <input
          type="number"
          name="quantidade"
          onChange={formik.handleChange}
          value={formik.values.quantidade}
        />
        {formik.errors.quantidade ? <div>{formik.errors.quantidade}</div> : null}
      </div>
      <div>
        <label>Data e Hora:</label>
        <input
          type="datetime-local"
          name="dataHora"
          onChange={formik.handleChange}
          value={formik.values.dataHora}
        />
        {formik.errors.dataHora ? <div>{formik.errors.dataHora}</div> : null}
      </div>
      <div>
        <label>Local:</label>
        <input
          type="text"
          name="local"
          onChange={formik.handleChange}
          value={formik.values.local}
        />
        {formik.errors.local ? <div>{formik.errors.local}</div> : null}
      </div>
      <button type="submit">Registrar Entrada</button>
    </form>
  );
};

export default EntradasForm;
