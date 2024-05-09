import { BackButton } from './back-button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BackButton /> {children}
    </div>
  );
}
