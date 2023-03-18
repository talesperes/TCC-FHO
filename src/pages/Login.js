import React, { useState, useRef, useEffect } from "react"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import InputCPF from "../components/InputCPF"
import AccessButton from "../components/AccessButton"
import customModalStyles from "../components/ModalStyles"
import Loading from "../components/Loading"
import LoadingWrapper from "../components/LoadingWrapper"
import Button from "../components/Button"
import DigitInput from "../components/DigitInput"
import CloseButton from "../components/CloseButton"
import DigitInputContainer from "../components/DigitInputContainer"
import Title from "../components/Title"
import Text from "../components/Text"
import ResendLink from "../components/ResendLink"
import Container from "../components/Container"
import LoginForm from "../components/LoginForm"
import axios from "axios"

const LoginPage = () => {
	const API_URL = "https://t0ah990vq8.execute-api.sa-east-1.amazonaws.com/dev"
	const navigate = useNavigate()
	const [cellphone, setCellphone] = useState("")
	const [timeRemaining, setTimeRemaining] = useState(60)
	const [cpf, setCpf] = useState("")
	const [modalOpacity, setModalOpacity] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [verificationCodeDigits, setVerificationCodeDigits] = useState(
		Array(6).fill("")
	)
	const [code, setCode] = useState("")
	const firstDigitInputRef = useRef(null)

	const [modalIsOpen, setModalIsOpen] = useState(false)

	const formatCPF = (value) => {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})/, "$1-$2")
			.substring(0, 14)
	}

	const handleInputChange = (event) => {
		const { value } = event.target
		const formattedValue = formatCPF(value)
		setCpf(formattedValue)
	}

	const requestCloseModal = () => {
		setModalIsOpen(false)
	}

	const handleVerificationCodeSubmit = (e) => {
		e.preventDefault()
		setIsLoading(true)
		axios
			.post(`${API_URL}/code/verify`, {
				cpf: cpf.replace(/[.-]/g, ""),
				code,
			})
			.then((res) => {
				navigate("/inicio")
				setIsLoading(false)
			})
			.catch((error) => {
				console.log("codigo invalido")
				console.error(error)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		setCode(verificationCodeDigits.join(""))
	}, [verificationCodeDigits])

	const handleDigitInputChange = (value, index) => {
		if (value === "") {
			setVerificationCodeDigits((prevDigits) => {
				const newDigits = [...prevDigits]
				newDigits[index] = ""
				return newDigits
			})
			if (index > 0) {
				document.getElementById(`digit-${index - 1}`).focus()
			}
		} else if (/^\d$/.test(value)) {
			setVerificationCodeDigits((prevDigits) => {
				const newDigits = [...prevDigits]
				newDigits[index] = value
				return newDigits
			})
			if (index < 5) {
				document.getElementById(`digit-${index + 1}`).focus()
			}
		}
	}

	const sendCode = () => {
		console.log("sendCode")
		axios
			.post(`${API_URL}/code/send`, {
				cpf: cpf.replace(/[.-]/g, ""),
			})
			.then(() => {
				setModalIsOpen(true)
				setIsLoading(false)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formattedCpf = cpf.replace(/[.-]/g, "")
		if (formattedCpf.length !== 11) {
			return
		}
		setIsLoading(true)
		sendCode()
	}

	const focusFirstInput = () => {
		firstDigitInputRef.current?.focus()
	}

	const resetVerificationCodeDigits = () => {
		setVerificationCodeDigits(Array(6).fill(""))
	}

	useEffect(() => {
		if (modalIsOpen && timeRemaining > 0) {
			const timer = setTimeout(() => {
				setTimeRemaining(timeRemaining - 1)
			}, 1000)
			return () => clearTimeout(timer)
		} else if (!modalIsOpen) {
			setTimeRemaining(60)
		}
	}, [modalIsOpen, timeRemaining])

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
					content: { ...customModalStyles.content, opacity: modalOpacity },
				}}
				onAfterOpen={() => {
					setModalOpacity(1)
					focusFirstInput()
				}}
				onAfterClose={() => {
					setModalOpacity(0)
					resetVerificationCodeDigits()
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
								id={`digit-${index}`}
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
									sendCode()
									setTimeRemaining(60)
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
	)
}

export default LoginPage
