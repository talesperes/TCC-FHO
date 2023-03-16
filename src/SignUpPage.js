import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // Importe o axios
import Modal from "react-modal";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch; // Altere esta linha
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  text-align: left;

  @media (max-width: 768px) {
    width: 90%; // Reduz a largura do formulário para 90% em dispositivos com largura de tela até 768px
    max-width: 400px; // Define uma largura máxima de 400px para evitar que o formulário fique muito grande em telas pequenas
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-size: 14px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box; // Adicione esta linha
`;

const AccessButton = styled.button`
  background-color: #1877f2;
  color: white;
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;

const InputReadOnly = styled(Input)`
  background-color: #f0f0f0; // Altera a cor de fundo do campo somente leitura
  cursor: not-allowed; // Muda o estilo do cursor para indicar que o campo não é editável
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 8px 0;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
`;

const customModalStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Adicione esta linha
    padding: "0 15px", // Adicione esta linha
  },
  content: {
    position: "static",
    width: "400px",
    maxWidth: "100%", // Adicione esta linha
    margin: "auto",
    padding: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    maxHeight: "calc(100vh - 50px)",
    overflowY: "auto",
    transition: "opacity 300ms ease-in-out",
  },
};

const Loading = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #007bff;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const DigitInput = styled(Input)`
  width: 40px;
  margin: 0 5px;
  text-align: center;
`;

Modal.setAppElement("#root");

const SignUpPage = () => {
  // Campos do formulário
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [modalOpacity, setModalOpacity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCodeDigits, setVerificationCodeDigits] = useState(
    Array(6).fill("")
  );

  // Estado do modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleVerificationCodeSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Adicione esta linha
    // Aqui, você pode adicionar a lógica para verificar o código de verificação
    closeModal(); // Fecha o modal após verificar o código de verificação
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui, você pode adicionar a lógica para salvar os dados do usuário
    setModalIsOpen(true); // Abre o modal após o envio do formulário
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalIsOpen(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Remove o loading circular após 5 segundos
  };

  // Função para buscar o endereço com base no CEP
  const fetchAddress = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;

      setAddress(logradouro);
      setNeighborhood(bairro);
      setCity(localidade);
      setState(uf);
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
      // Você pode adicionar uma mensagem de erro aqui, caso deseje informar o usuário sobre o erro
    }
  };

  const handleCepChange = (e) => {
    const newCepValue = e.target.value.replace(/\D+/g, "");
    setCep(newCepValue);

    if (newCepValue.length === 8) {
      fetchAddress(newCepValue);
    }
  };

  const handleCellphoneChange = (e) => {
    const newCellphoneValue = e.target.value.replace(/\D+/g, ""); // Remove todos os caracteres não numéricos
    setCellphone(newCellphoneValue);
  };

  const handleDigitInputChange = (value, index) => {
    if (value === "") {
      // Apaga o dígito atual e volta o foco para o campo anterior, se houver
      setVerificationCodeDigits((prevDigits) => {
        const newDigits = [...prevDigits];
        newDigits[index] = "";
        return newDigits;
      });
      if (index > 0) {
        document.getElementById(`digit-${index - 1}`).focus();
      }
    } else if (/^\d$/.test(value)) {
      // Insere o dígito e avança o foco para o próximo campo, se houver
      setVerificationCodeDigits((prevDigits) => {
        const newDigits = [...prevDigits];
        newDigits[index] = value;
        return newDigits;
      });
      if (index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  return (
    <Container>
      <SignUpForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>CPF</Label>
          <Input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>CEP</Label>
          <Input type="text" value={cep} onChange={handleCepChange} />
        </FormGroup>
        <FormGroup>
          <Label>Celular</Label>
          <Input
            type="text"
            value={cellphone}
            onChange={handleCellphoneChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Endereço</Label>
          <InputReadOnly
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label>Número</Label>
          <Input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Complemento</Label>
          <Input
            type="text"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Bairro</Label>
          <InputReadOnly
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label>Cidade</Label>
          <InputReadOnly
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label>Estado</Label>
          <InputReadOnly
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            readOnly
          />
        </FormGroup>
        <AccessButton type="submit">Cadastrar</AccessButton>
      </SignUpForm>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Verification Modal"
        style={{
          ...customModalStyles,
          content: { ...customModalStyles.content, opacity: modalOpacity }, // Adicione a opacidade aqui
        }}
        onAfterOpen={() => setModalOpacity(1)}
        onAfterClose={() => setModalOpacity(0)}
      >
        <h2>Verificação</h2>
        <p>
          Enviamos um código de 6 dígitos para o número {cellphone}. Por favor,
          insira o código abaixo.
        </p>
        <form onSubmit={handleVerificationCodeSubmit}>
            {verificationCodeDigits.map((digit, index) => (
              <DigitInput
                key={index}
                id={`digit-${index}`} // Adicione esta linha
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleDigitInputChange(e.target.value, index)}
              />
            ))}
          <Button type="submit">Verificar</Button>
        </form>
      </Modal>
      {isLoading && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
    </Container>
  );
};

export default SignUpPage;
