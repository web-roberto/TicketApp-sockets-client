export const getUltimos = async () => {
  const resp = await fetch('https://ticketapp-socket.herokuapp.com//ultimos');
  const data = await resp.json();

  return data.ultimos;
};

//const [state, dispatch] = useReducer(first, second, third)
