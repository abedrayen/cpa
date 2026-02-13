'use client';

import { useState, useId } from 'react';
import Image from 'next/image';
import type { ProductImage } from '@/lib/types';

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const main = images[selected];

  if (!images.length) {
    return (
      <div
        className="pdp-gallery pdp-gallery--empty"
        aria-label={`Aucune image disponible pour ${productName}`}
      >
        <span className="pdp-gallery__placeholder">Aucune image</span>
      </div>
    );
  }

  return (
    <div className="pdp-gallery" role="group" aria-label={`Galerie pour ${productName}`}>
      <div id={`${id}-main`} className="pdp-gallery__main-wrap">
        <Image
          src={main.url}
          alt={main.alt || `${productName} – vue ${selected + 1} sur ${images.length}`}
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw,  min(600px, 50vw)"
          priority
          className="pdp-gallery__main"
        />
      </div>
      {images.length > 1 && (
        <ul className="pdp-gallery__thumbs" role="tablist" aria-label="Choisir une image du produit">
          {images.map((img, i) => (
            <li key={img.id} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={selected === i}
                aria-label={`Voir l'image ${i + 1} sur ${images.length}`}
                id={`${id}-thumb-${i}`}
                aria-controls={`${id}-main`}
                tabIndex={selected === i ? 0 : -1}
                onClick={() => setSelected(i)}
                className={`pdp-gallery__thumb ${selected === i ? 'pdp-gallery__thumb--selected' : ''}`}
              >
                <Image
                  src={img.url}
                  alt=""
                  width={120}
                  height={90}
                  sizes="80px"
                  className="pdp-gallery__thumb-img"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
