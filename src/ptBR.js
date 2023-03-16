import { DateLocalizer } from "react-big-calendar";

const dateLocalizer = new DateLocalizer({
  culture: "pt-BR",
  formats: {
    dateFormat: "dd",
    dayFormat: "ddd",
    weekdayFormat: "dddd",
    monthHeaderFormat: "MMMM yyyy",
    dayRangeHeaderFormat: ({ start, end }, culture, local) =>
      local.format(start, "MMMM dd", culture) +
      " — " +
      local.format(end, "dd", culture),
    agendaHeaderFormat: ({ start, end }, culture, local) =>
      local.format(start, "MMM dd", culture) +
      " - " +
      local.format(end, "MMM dd", culture),
    selectRangeFormat: ({ start, end }, culture, local) =>
      local.format(start, "MMM dd", culture) +
      " - " +
      local.format(end, "MMM dd", culture),
  },
  messages: {
    date: "Data",
    time: "Hora",
    event: "Evento",
    allDay: "Dia inteiro",
    week: "Semana",
    work_week: "Dias úteis",
    day: "Dia",
    month: "Mês",
    previous: "Anterior",
    next: "Próximo",
    yesterday: "Ontem",
    tomorrow: "Amanhã",
    today: "Hoje",
    agenda: "Agenda",
    noEventsInRange: "Não há eventos neste período.",
    showMore: (total) => `+ Ver mais (${total})`,
  },
});

export default dateLocalizer;