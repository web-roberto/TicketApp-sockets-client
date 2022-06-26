import React, { useContext, useEffect, useState } from 'react';

import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd';

import { SocketContext } from '../context/SocketContext';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUltimos } from '../helpers/getUltimos';

const { Title, Text } = Typography;

export const Cola = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on('ticket-asignado', (asignados) => {
      setTickets(asignados);
    });

    return () => {
      socket.off('ticket-asignado');
    };
  }, [socket]);

  useEffect(() => {
    getUltimos().then(setTickets);
  }, []);

  return (
    <>
      <Title level={1}>Attending to the client</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano"> {item.agente} </Tag>,
                    <Tag color="magenta"> Desk: {item.escritorio} </Tag>,
                  ]}
                >
                  <Title> No. {item.numero}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Divider> History </Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.numero}`}
                  description={
                    <>
                      <Text type="secondary">At the desk: </Text>
                      <Tag color="magenta"> {item.numero} </Tag>
                      <Text type="secondary"> Office Workerr: </Text>
                      <Tag color="volcano"> {item.agente} </Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
