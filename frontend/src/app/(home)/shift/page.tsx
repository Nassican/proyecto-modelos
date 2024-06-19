import { ButtonsGrid } from '@/components/shifts/buttons-grid';

function TurnosPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-center text-3xl font-bold">Select the type of shift you want to book</h1>
      <ButtonsGrid />
    </div>
  );
}

export default TurnosPage;
