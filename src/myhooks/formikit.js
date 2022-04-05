import { useState, useEffect } from "react";

function validate(values) {
  const erros = {};
  if (values.nome !== undefined && values.nome.length < 6) {
    erros.nome = "O nome precisa ter no mínimo 6 caracteres";
  }

  if (values.email !== undefined && !values.email.includes("@")) {
    erros.email = "Por favor Insira um email válido";
  }

  if (values.senha !== undefined && values.senha.length < 8) {
    erros.senha = "A senha precisa ter no mínimo 8 caracteres";
  }

  if (values.frequencia !== undefined && values.frequencia === 0) {
    erros.frequencia = "Informe sua frequência de uso";
  }

  return erros;
}

export default function useFormik({ initialValues }) {
  const [touched, setTouchedFields] = useState({});
  const [erros, setErros] = useState({});
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const fieldName = event.target.getAttribute("name");
    const { value } = event.target;
    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  const handleBlur = (event) => {
    const fieldName = event.target.getAttribute("name");
    console.log(fieldName);
    setTouchedFields({
      ...touched,
      [fieldName]: true,
    });
  };

  useEffect(() => {
    setErros(validate(values));
  }, [values]);

  return {
    values,
    erros,
    touched,
    handleBlur,
    setErros,
    handleChange,
  };
}
