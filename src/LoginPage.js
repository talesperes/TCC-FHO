import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: white;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  // Adicione esta media query
  @media (max-width: 768px) {
    margin: 20px;
    width: calc(100% - 60px);
  }
`;

const InputCPF = styled.input`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
`;

const AccessButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  padding: 10px 0;
  width: 100%;
  border-radius: 3px;
  box-sizing: border-box;
`;

const customModalStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Adicione esta linha
    padding: "0 15px", // Adicione esta linha
  },
  content: {
    position: "relative",
    width: "400px",
    maxWidth: "100%", // Adicione esta linha
    margin: "auto",
    padding: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    maxHeight: "calc(100vh - 50px)",
    overflowY: "auto",
    transition: "opacity 300ms ease-in-out",
    inset: "auto",
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

const Input = styled.input`
  font-size: 14px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box; // Adicione esta linha
`;

const DigitInput = styled(Input)`
  width: 40px;
  margin: 0 5px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const DigitInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
`;

const ResendLink = styled.a`
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const cellphone = "19999999999";
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [cpf, setCpf] = useState("");
  const [modalOpacity, setModalOpacity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCodeDigits, setVerificationCodeDigits] = useState(
    Array(6).fill("")
  );
  const firstDigitInputRef = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "") // Remove todos os caracteres não numéricos
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto após os primeiros 3 dígitos
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto após os próximos 3 dígitos
      .replace(/(\d{3})(\d{1,2})/, "$1-$2") // Adiciona hífen após os próximos 3 dígitos
      .substring(0, 14); // Limita o tamanho do CPF a 14 caracteres (incluindo pontos e hífen)
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatCPF(value);
    setCpf(formattedValue);
  };

  const requestCloseModal = () => {
    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/inicio");
    }, 1500); // Remove o loading circular após 5 segundos
  };

  const handleVerificationCodeSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Adicione esta linha
    // Aqui, você pode adicionar a lógica para verificar o código de verificação
    closeModal(); // Fecha o modal após verificar o código de verificação
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui, você pode adicionar a lógica para salvar os dados do usuário
    setModalIsOpen(true); // Abre o modal após o envio do formulário
  };

  const focusFirstInput = () => {
    firstDigitInputRef.current?.focus();
  };

  const resetVerificationCodeDigits = () => {
    setVerificationCodeDigits(Array(6).fill(""));
  };

  useEffect(() => {
    if (modalIsOpen && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!modalIsOpen) {
      setTimeRemaining(10);
    }
  }, [modalIsOpen, timeRemaining]);

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <InputCPF
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={handleInputChange}
        />
        <AccessButton>Acessar</AccessButton>
      </LoginForm>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={requestCloseModal}
        contentLabel="Verification Modal"
        style={{
          ...customModalStyles,
          content: { ...customModalStyles.content, opacity: modalOpacity }, // Adicione a opacidade aqui
        }}
        onAfterOpen={() => {
          setModalOpacity(1);
          focusFirstInput();
        }}
        onAfterClose={() => {
          setModalOpacity(0);
          resetVerificationCodeDigits();
        }}
      >
        <CloseButton onClick={requestCloseModal}>&times;</CloseButton>
        <Title>Verificação</Title>
        <Text>
          Enviamos um código de 6 dígitos para o número {cellphone}. Por favor,
          insira o código abaixo.
        </Text>
        <form onSubmit={handleVerificationCodeSubmit}>
          <DigitInputContainer>
            {verificationCodeDigits.map((digit, index) => (
              <DigitInput
                ref={index === 0 ? firstDigitInputRef : null}
                key={index}
                id={`digit-${index}`} // Adicione esta linha
                type="tel"
                maxLength="1"
                value={digit}
                onChange={(e) => handleDigitInputChange(e.target.value, index)}
              />
            ))}
          </DigitInputContainer>
          <p style={{ textAlign: "center" }}>
            {timeRemaining > 0 ? (
              <span style={{ fontSize: "14px", color: "#999" }}>
                {`Reenviar código (${timeRemaining})`}
              </span>
            ) : (
              <ResendLink
                onClick={() => {
                  setTimeRemaining(10);
                }}
              >
                Reenviar código
              </ResendLink>
            )}
          </p>
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

export default LoginPage;
