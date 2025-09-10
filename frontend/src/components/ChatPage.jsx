import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../slices/channelsSlice';
import { Container, Row, Col, Nav, Form, Button, Spinner } from 'react-bootstrap';

const ChatPage = () => {
  const dispatch = useDispatch();
  
  const { channels, messages, loadingStatus, error } = useSelector((state) => state.channelsInfo);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loadingStatus === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Загрузка...</span>
      </div>
    );
  }

  if (loadingStatus === 'failed') {
    return (
      <div className="text-center">
        <h2>Что-то пошло не так...</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        {/* Список каналов (слева) */}
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <Button variant="outline-primary" size="sm">+</Button>
          </div>
          <Nav as="ul" fill variant="pills" className="flex-column px-2">
            {channels.map((channel) => (
              <Nav.Item as="li" key={channel.id} className="w-100">
                <Button variant="secondary" className="w-100 text-start">
                  # {channel.name}
                </Button>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        {/* Чат (справа) */}
        <Col className="p-0 h-100 d-flex flex-column">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b># general</b></p>
            <span className="text-muted">{messages.length} сообщений</span>
          </div>
          
          {/* Сообщения */}
          <div id="messages-box" className="chat-messages overflow-auto px-5">
            {messages.map((msg) => (
              <div key={msg.id} className="text-break mb-2">
                <b>{msg.username}</b>: {msg.body}
              </div>
            ))}
          </div>

          {/* Форма отправки сообщения */}
          <div className="mt-auto px-5 py-3">
            <Form className="py-1 border rounded-2">
              <Form.Group className="input-group">
                <Form.Control 
                  type="text"
                  placeholder="Введите сообщение..."
                  aria-label="Новое сообщение"
                  className="border-0"
                />
                <Button variant="link" type="submit" disabled>
                  Отправить
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;