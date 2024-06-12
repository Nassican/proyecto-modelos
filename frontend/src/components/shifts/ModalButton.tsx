interface ModalProps {
  info: string;
  description: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ info, description, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-4/5 max-w-3xl overflow-hidden rounded-lg bg-white">
        <button className="absolute right-2 top-2 border-none bg-transparent text-2xl font-bold" onClick={onClose}>
          X
        </button>
        <div className="flex">
          <div className="w-1/2 p-4">
            <h2 className="text-xl font-bold">{info}</h2>
            <p>Information about {description}</p>
          </div>
          <div className="w-1/2 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label className="flex flex-col">
                Code:
                <input type="text" name="code" required className="rounded border p-2" />
              </label>
              <label className="flex flex-col">
                Email:
                <input type="email" name="email" required className="rounded border p-2" />
              </label>
              <button type="submit" className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
