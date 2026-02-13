'use client';

import { useState, useId } from 'react';

type TabId = 'description' | 'specs' | 'installation';

const TABS: { id: TabId; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'specs', label: 'Caractéristiques' },
  { id: 'installation', label: 'Pose et entretien' },
];

export function ProductPdpTabs({
  description,
  specs,
}: {
  description: string;
  specs: Record<string, unknown> | null;
}) {
  const [active, setActive] = useState<TabId>('description');
  const id = useId();
  const hasSpecs = specs && Object.keys(specs).length > 0;

  return (
    <div className="pdp-tabs" aria-label="Détails du produit">
      <div className="pdp-tabs__list" role="tablist" aria-label="Sections de détail">
        {TABS.filter((t) => t.id !== 'specs' || hasSpecs).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`${id}-${tab.id}`}
            id={`${id}-tab-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            className="pdp-tabs__tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-description`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-description`}
        hidden={active !== 'description'}
        className="pdp-tabs__panel"
      >
        <div className="pdp-tabs__content pdp-tabs__content--description">
          <p className="product-description">{description}</p>
        </div>
      </div>
      {hasSpecs && (
        <div
          id={`${id}-specs`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-specs`}
          hidden={active !== 'specs'}
          className="pdp-tabs__panel"
        >
          <div className="pdp-tabs__content">
            <table className="specs-table">
              <tbody>
                {Object.entries(specs).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{String(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div
        id={`${id}-installation`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-installation`}
        hidden={active !== 'installation'}
        className="pdp-tabs__panel"
      >
        <div className="pdp-tabs__content">
          <h3 className="pdp-tabs__sub">Pose</h3>
          <p>
            Nos produits aluminium sont conçus pour une pose simple. Nous recommandons une pose par un professionnel pour les fenêtres et portes afin d’assurer une bonne étanchéité et un bon fonctionnement. Contactez-nous pour des conseils de pose ou des poseurs recommandés à Sousse et dans la région.
          </p>
          <h3 className="pdp-tabs__sub">Entretien</h3>
          <p>
            L’aluminium demande peu d’entretien et résiste à la corrosion. Nettoyez périodiquement à l’eau et au savon doux. Évitez les détergents abrasifs. Contrôlez joints et quincaillerie une fois par an pour un rendement optimal.
          </p>
        </div>
      </div>
    </div>
  );
}
