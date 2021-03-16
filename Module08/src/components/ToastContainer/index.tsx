import React, { useCallback } from 'react';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../hooks/toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast();

  const handleRemoveToast = useCallback((id: string) => {
    removeToast(id);
  }, []);

  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
