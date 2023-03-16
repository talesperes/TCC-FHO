import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const currentDate = new Date().toISOString().split("T")[0];

const ScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Content = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
`;

const ScheduleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  box-sizing: border-box;
`;

const SaveButton = styled.button`
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

const CancelButton = styled(SaveButton)`
  background-color: #ccc;
`;

const Select = styled.select`
  font-size: 14px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ScheduleAppointment = () => {
  const [doctorType, setDoctorType] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const doctorTypes = [
    { id: 1, name: "Cardiologista" },
    { id: 2, name: "Dermatologista" },
    { id: 3, name: "Ortopedista" },
    // Adicione mais tipos de médicos aqui
  ];

  const doctors = [
    { id: 1, name: "Dr. João", type: 1 },
    { id: 2, name: "Dra. Maria", type: 1 },
    { id: 3, name: "Dr. Lucas", type: 2 },
    { id: 4, name: "Dra. Ana", type: 2 },
    { id: 5, name: "Dr. Carlos", type: 3 },
    // Adicione mais médicos aqui
  ];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/inicio");
  };

  const handleCancel = () => {
    navigate("/inicio");
  };

  const handleDoctorTypeChange = (e) => {
    setDoctorType(e.target.value);
  };

  const handleDoctorNameChange = (e) => {
    setDoctorName(e.target.value);
  };

  const doctorsWorkingHours = useMemo(
    () => [
      {
        doctorId: 1,
        workingHours: [
          { day: "Segunda-feira", startTime: "08:00", endTime: "17:00" },
          { day: "Terça-feira", startTime: "08:00", endTime: "17:00" },
          // ...
        ],
      },
      // Outros médicos
    ],
    []
  );

  const getAvailableHours = useCallback(
    (doctorId, day) => {
      const doctorWorkingHours = doctorsWorkingHours.find(
        (item) => item.doctorId === doctorId
      );

      if (!doctorWorkingHours) {
        return [];
      }

      const workingHours = doctorWorkingHours.workingHours.find(
        (item) => item.day === day
      );

      if (!workingHours) {
        return [];
      }

      return availableHours;
    },
    [availableHours, doctorsWorkingHours]
  );

  useEffect(() => {
    if (doctorName && date) {
      const day = new Date(date).toLocaleDateString("pt-BR", {
        weekday: "long",
      });
      const hours = getAvailableHours(doctorName, day);
      setAvailableHours(hours);
      setSelectedTime(""); // Limpa o horário selecionado anteriormente
    }
  }, [doctorName, date, getAvailableHours]);

  return (
    <ScheduleContainer>
      <Content>
        <h1>Agendar Consulta</h1>
        <ScheduleForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="doctorType">Especialidade Médica</Label>
            <Select
              id="doctorType"
              value={doctorType}
              onChange={handleDoctorTypeChange}
            >
              <option value="">Selecione a especialidade</option>
              {doctorTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="doctorName">Médico</Label>
            <Select
              id="doctorName"
              value={doctorName}
              onChange={handleDoctorNameChange}
            >
              <option value="">Selecione o médico</option>
              {doctors
                .filter((doctor) => doctor.type === Number(doctorType))
                .map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date">Data</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={currentDate}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="time">Horário</Label>
            <Select
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Selecione o horário</option>
              {availableHours.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </FormGroup>
          <SaveButton type="submit">Agendar</SaveButton>
          <CancelButton type="button" onClick={handleCancel}>
            Cancelar
          </CancelButton>
        </ScheduleForm>
      </Content>
    </ScheduleContainer>
  );
};

export default ScheduleAppointment;
