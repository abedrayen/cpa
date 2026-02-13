import { PrismaClient, Role } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const TND_PRODUCTS = [
  { name: 'Coffre en tunnel poly fini 25cm', description: 'Coffre tunnel pour volet roulant.', value: 40, unit: 'TND/m' },
  { name: 'Coffre en tunnel poly fini 30cm', description: 'Coffre tunnel pour volet roulant.', value: 40, unit: 'TND/m' },
  { name: 'Laine de roche ROCKMUR KRAFT 45mm Rockwool', description: "Panneau en laine de roche, semi-rigide, revêtu d'un pare-vapeur kraft polyéthylène. 1 colis = 11,34 m².", value: 16.5, unit: 'TND/m²' },
  { name: 'Contre chassis P/ Placo 700x2100x125 ERMETIKA', description: 'Contre-châssis porte pour placo.', value: 480, unit: 'TND/pièce' },
  { name: 'Plaque en polystyrène 2cm', description: "Plaque en polystyrène destinée pour l'isolation thermique et acoustique des bâtiments. Dimension 1x1m. Densité: 16 kg/m³.", value: 4.5, unit: 'TND/unité' },
  { name: 'Plaque en polystyrène 4cm', description: "Plaque en polystyrène destinée pour l'isolation thermique et acoustique des bâtiments.", value: 7.8, unit: 'TND/m²' },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@cpa.local';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'ChangeMeInProduction!';

  const hash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, passwordHash: hash, role: Role.ADMIN },
    update: {},
  });
  console.log('Admin user ready:', adminEmail);

  for (const p of TND_PRODUCTS) {
    const slug = slugify(p.name);
    const existing = await prisma.product.findFirst({ where: { slug, deletedAt: null } });
    const data = {
      name: p.name,
      slug,
      description: p.description,
      price: new Decimal(p.value),
      isQuoteOnly: false,
      isActive: true,
      specs: { unit: p.unit } as object,
    };
    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data,
      });
      console.log('Updated product:', slug);
    } else {
      await prisma.product.create({ data });
      console.log('Created product:', slug);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
