import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import HomePage from '@/components/pages/HomePage';

export default function HomePageEntry() {
  const content = <HomePage />;

  return typeof window === 'undefined' ? (
    <MemoryRouter basename={import.meta.env.BASE_NAME} initialEntries={['/']}>
      {content}
    </MemoryRouter>
  ) : (
    <BrowserRouter basename={import.meta.env.BASE_NAME}>{content}</BrowserRouter>
  );
}
