-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT,
  author TEXT DEFAULT 'Admin',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);

-- Insert first article
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, author, status)
VALUES (
  'Révolutionner la Sécurité Routière en Afrique : La Vision AI-Karangué',
  'revolutionner-la-securite-routiere-en-afrique',
  'Découvrez comment AI-Karangué utilise l''IA et l''IoT pour transformer la sécurité routière et la gestion de flotte sur le continent africain.',
  '# Révolutionner la Sécurité Routière en Afrique : La Vision AI-Karangué

L''Afrique fait face à un défi de taille : malgré un parc automobile proportionnellement plus réduit que dans d''autres régions du monde, le continent enregistre les taux de mortalité routière les plus élevés. Chez **AI-Karangué**, nous croyons que la technologie n''est pas seulement un luxe, mais une nécessité vitale pour inverser cette tendance.

## L''IA au Service de la Vie

Notre approche repose sur une fusion innovante entre l''**Intelligence Artificielle** (IA) et l''**Internet des Objets** (IoT). En installant nos boîtiers intelligents dans les véhicules, nous ne nous contentons pas de collecter des données ; nous donnons une "conscience" au véhicule.

### Les piliers de notre innovation :

1.  **Surveillance Comportementale en Temps Réel** : Nos algorithmes analysent la fatigue, les distractions et les conduites à risque pour intervenir avant que l''accident ne survienne.
2.  **Maintenance Prédictive** : En anticipant les pannes critiques, nous assurons que chaque véhicule sur la route est dans un état optimal de sécurité.
3.  **Analyses de Flotte Basées sur les Données** : Pour les entreprises, Karangué transforme la gestion logistique en un levier d''efficacité et de rentabilité.

## Une Solution Adaptée aux Réalités Locales

Contrairement aux solutions standardisées, **AI-Karangué** a été pensée pour l''écosystème africain. Nos systèmes sont résilients, connectés et conçus pour fonctionner là où la connectivité et les infrastructures peuvent être irrégulières.

## Vers un Futur Plus Sûr

Notre mission va au-delà du business. Chaque déploiement de notre solution est un pas de plus vers une route où chaque passager, chaque chauffeur et chaque piéton peut circuler avec une **tranquillité d''esprit** totale.

Rejoignez-nous dans cette révolution technologique. Ensemble, faisons de la sécurité routière une réalité tangible pour tous.',
  '/images/blog/vision_cover.png',
  'Technologie',
  'L''équipe AI-Karangué',
  'published'
) ON CONFLICT (slug) DO NOTHING;

