import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Page introuvable</h1>
      <p>La page que vous recherchez n’existe pas.</p>
      <Link href="/">Retour à l’accueil</Link>
    </div>
  );
}
