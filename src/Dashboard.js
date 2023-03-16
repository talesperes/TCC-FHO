import React from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/pt-br";

moment.locale("pt-br");

const localizer = momentLocalizer(moment);

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Header = styled.div`
  background-color: #007bff;
  color: white;
  padding: 15px;
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-right: 20px;
`;

const MenuItem = styled.div`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f2f5;
  }
`;

const CalendarContainer = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-right: 20px;
`;

const AppointmentList = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const AddAppointmentButton = styled.button`
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
  float: right;
`;

const appointments = [
  {
    id: 1,
    date: "2023-03-20",
    time: "09:00",
    patient: "João Silva",
    doctor: "Dra. Maria Santos",
    specialty: "Cardiologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
  {
    id: 2,
    date: "2023-03-20",
    time: "14:00",
    patient: "Ana Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Dermatologia",
    status: "Confirmado",
  },
];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 8px;
  text-align: left;
  border: 1px solid #007bff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatMonthTitle = (date, culture, localizer) => {
  return (
    capitalize(localizer.format(date, "MMMM", culture)) +
    " " +
    localizer.format(date, "YYYY", culture)
  );
};

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header>Sistema de Agendamento de Consultas</Header>
      <Content>
        <Sidebar>
          <MenuItem>Agenda</MenuItem>
          <MenuItem>Pacientes</MenuItem>
          <MenuItem>Médicos</MenuItem>
          <MenuItem>Relatórios</MenuItem>
          <MenuItem>Configurações</MenuItem>
        </Sidebar>
        <CalendarContainer>
          <Calendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            messages={{
              allDay: "Dia inteiro",
              previous: "Anterior",
              next: "Próximo",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              agenda: "Agenda",
              date: "Data",
              time: "Hora",
              event: "Evento",
              noEventsInRange: "Não há eventos neste período",
            }}
            formats={{
              monthHeaderFormat: formatMonthTitle,
            }}
          />
        </CalendarContainer>
        <AppointmentList>
          <h2>Consultas agendadas</h2>
          <Table>
            <thead>
              <tr>
                <TableHeader>Data</TableHeader>
                <TableHeader>Hora</TableHeader>
                <TableHeader>Paciente</TableHeader>
                <TableHeader>Médico</TableHeader>
                <TableHeader>Especialidade</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.specialty}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <AddAppointmentButton>Adicionar consulta</AddAppointmentButton>
        </AppointmentList>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
