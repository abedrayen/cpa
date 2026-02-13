'use client';

import { useState, useId } from 'react';

const FAQ_ITEMS = [
  {
    q: 'Livrez-vous à Sousse et en Tunisie ?',
    a: 'Oui. Nous livrons à Sousse et dans toute la Tunisie. Contactez-nous pour les options de livraison et les délais.',
  },
  {
    q: 'Puis-je obtenir un devis personnalisé ?',
    a: 'Oui. Nombre de nos produits sont disponibles sur devis pour dimensions ou finitions sur mesure. Utilisez le formulaire de demande de devis ou contactez-nous directement.',
  },
  {
    q: 'Quelle garantie proposez-vous ?',
    a: 'Nous garantissons la qualité de nos produits aluminium. Les conditions de garantie varient selon le produit — contactez-nous pour les détails.',
  },
];

export function ProductFaq() {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="pdp-faq" aria-labelledby="pdp-faq-heading">
      <h2 id="pdp-faq-heading" className="pdp-faq__title">
        Questions fréquentes
      </h2>
      <ul className="pdp-faq__list">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${id}-faq-${i}`;
          const triggerId = `${id}-faq-trigger-${i}`;
          return (
            <li key={i} className="pdp-faq__item">
              <h3 className="pdp-faq__q">
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="pdp-faq__trigger"
                >
                  {item.q}
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                className="pdp-faq__a"
              >
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
