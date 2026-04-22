import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { strapiImageUrl } from '@/lib/strapi';

type Props = {
  content: BlocksContent | null | undefined;
  /** Wrapper classes. Default: login gallery (dark) prose. */
  proseClassName?: string;
};

const DEFAULT_PROSE =
  'ds-richtext-prose ds-richtext-prose--on-dark ds-login-gallery-richtext';

export default function StrapiBlocksContent({ content, proseClassName = DEFAULT_PROSE }: Props) {
  if (!content || !Array.isArray(content) || content.length === 0) return null;

  return (
    <div className={proseClassName}>
      <BlocksRenderer
        content={content}
        blocks={{
          image: ({ image }) => {
            const src = strapiImageUrl(image as Parameters<typeof strapiImageUrl>[0]);
            if (!src) return null;
            const w = typeof image.width === 'number' && image.width > 0 ? image.width : 1200;
            const h = typeof image.height === 'number' && image.height > 0 ? image.height : 800;
            return (
              <figure className="ds-strapi-blocks-figure">
                <img
                  src={src}
                  alt={image.alternativeText ?? ''}
                  width={w}
                  height={h}
                  loading="lazy"
                  className="ds-strapi-blocks-figure__img"
                />
              </figure>
            );
          },
        }}
      />
    </div>
  );
}
