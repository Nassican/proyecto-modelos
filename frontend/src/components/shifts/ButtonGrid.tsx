'use client';

import { useState, useEffect } from 'react';

import axios from '@/lib/axios';

import Modal from './ModalButton';

interface ButtonShift {
  id: number;
  color: string;
  icon: string;
  name: string;
  description: string;
  code: string;
}

const ButtonGrid: React.FC = () => {
  const [modalInfo, setModalInfo] = useState<string | null>(null);
  const [modalDescription, setModalDescription] = useState<string>('');
  const [buttons, setButtons] = useState<ButtonShift[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('TypesShift');
        setButtons(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (info: string, description: string) => {
    setModalInfo(info);
    setModalDescription(description);
  };

  const handleCloseModal = () => {
    setModalInfo(null);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => handleButtonClick(button.name, button.description)}
          className="rounded-lg bg-gray-200 p-4 text-lg font-bold hover:bg-gray-300"
        >
          {button.name}
        </button>
      ))}
      {modalInfo && <Modal description={modalDescription} info={modalInfo} onClose={handleCloseModal} />}
    </div>
  );
};

export default ButtonGrid;
