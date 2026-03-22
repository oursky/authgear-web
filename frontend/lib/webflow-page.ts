import { readFileSync, existsSync } from 'fs';
import path from 'path';

const WEBFLOW_DIR = path.join(process.cwd(), '..', 'authgear-new.webflow');

/**
 * Strips Webflow ix2 animation-init inline styles that set opacity:0 + transforms.
 * Webflow's JS would normally animate these in, but without the per-page animation
 * config JSON (which lives in <script> tags we strip) ix2 never fires and everything
 * stays invisible. Checkboxes with opacity:0;position:absolute are unaffected because
 * they don't contain the transform functions.
 */
function stripAnimationInitStyles(html: string): string {
  // Match style attributes containing BOTH opacity:0 AND a Webflow transform init
  // (translate3d or scale3d). Order of properties varies, so we check both orderings.
  return html.replace(
    /\s+style="[^"]*(?:translate3d|scale3d)[^"]*opacity:\s*0[^"]*"/gi,
    ''
  ).replace(
    /\s+style="opacity:\s*0[^"]*(?:translate3d|scale3d)[^"]*"/gi,
    ''
  );
}

/**
 * Removes the nav div (the one with a w-nav class) from the given HTML string
 * by tracking balanced div nesting — so only the nav itself is removed, not any
 * content that follows it.
 */
function removeNavDiv(html: string): string {
  const navStartIdx = html.search(/<div[^>]+class="[^"]*w-nav[^"]*"[^>]*>/);
  if (navStartIdx === -1) return html;

  const openTagMatch = html.slice(navStartIdx).match(/<div[^>]*>/);
  if (!openTagMatch) return html;

  let pos = navStartIdx + openTagMatch[0].length;
  let depth = 1;

  while (pos < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', pos);
    const nextClose = html.indexOf('</div>', pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }

  if (depth === 0) {
    return html.slice(0, navStartIdx) + html.slice(pos);
  }
  return html;
}

/**
 * Reads a Webflow HTML export file and extracts the body content,
 * stripping the nav, footer, cookie popup, and scripts that are
 * handled by the Next.js root layout.
 *
 * Returns the inner HTML of the page-wrapper div (or empty string).
 */
export function getWebflowPageBody(relPath: string): string {
  const filePath = path.join(WEBFLOW_DIR, relPath);
  if (!existsSync(filePath)) return '';

  const html = readFileSync(filePath, 'utf-8');

  // Extract everything from the first page-wrapper div to the closing of the main content.
  // The pattern to find is either:
  //   (A) <div class="page-wrapper"> ... </div> (before footer which is outside)
  //   (B) <div class="page-wrapper"> ... <footer ...> ... </footer> ... </div>
  // We want to extract the page-wrapper and its content, but exclude the footer and beyond.

  // Find the page-wrapper start
  const pageWrapperStart = html.indexOf('<div class="page-wrapper">');
  if (pageWrapperStart === -1) {
    // Fallback: extract everything between body opening and footer
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (!bodyMatch) return '';

    let body = bodyMatch[1];
    // Remove nav (header.w-nav) by tracking balanced div nesting
    body = removeNavDiv(body);
    // Remove footer
    body = body.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    // Remove scripts
    body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
    // Remove cookie consent popup
    const cookiesIdx = body.indexOf('<div class="cookies">');
    if (cookiesIdx !== -1) body = body.slice(0, cookiesIdx);
    // Fix asset paths (root pages use relative paths)
    body = body
      .replace(/href="\.\.\/css\//g, 'href="/css/')
      .replace(/href="\.\.\/images\//g, 'href="/images/')
      .replace(/src="\.\.\/images\//g, 'src="/images/')
      .replace(/src="\.\.\/js\//g, 'src="/js/')
      .replace(/src="\.\.\/documents\//g, 'src="/documents/')
      .replace(/srcset="((?:\.\.\/images\/[^"]+))"/g, (_, s) => `srcset="${s.replace(/\.\.\/images\//g, '/images/')}"`)
      .replace(/href="css\//g, 'href="/css/')
      .replace(/href="images\//g, 'href="/images/')
      .replace(/src="images\//g, 'src="/images/')
      .replace(/src="js\//g, 'src="/js/')
      .replace(/src="documents\//g, 'src="/documents/')
      .replace(/srcset="((?:images\/[^"]+))"/g, (_, s) => `srcset="${s.replace(/(?<![/])images\//g, '/images/')}"`);
    // Fix internal .html links
    body = body
      .replace(/href="index\.html"/g, 'href="/"')
      .replace(/href="([^"#?]+)\.html"/g, (_, p) => {
        const cleanPath = p.replace(/^\.\.\//, '/').replace(/^(?!\/)/, '/');
        return `href="${cleanPath}"`;
      });
    // Strip Webflow animation-init inline styles (opacity:0 + transforms)
    body = stripAnimationInitStyles(body);
    return body.trim();
  }

  let content = html.slice(pageWrapperStart);

  // Remove the footer from within the content if it's there
  const footerIdx = content.indexOf('<footer class="footer dark">');
  if (footerIdx !== -1) {
    const footerEndIdx = content.indexOf('</footer>', footerIdx);
    if (footerEndIdx !== -1) {
      content = content.slice(0, footerIdx) + content.slice(footerEndIdx + '</footer>'.length);
    }
  }

  // Remove all script tags
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Remove the cookie consent popup (class="cookies")
  const cookiesIdx = content.indexOf('<div class="cookies">');
  if (cookiesIdx !== -1) {
    content = content.slice(0, cookiesIdx);
  }

  // Fix relative asset paths:
  // Root pages use "css/...", "images/..." → should be "/css/...", "/images/..."
  // Nested pages use "../css/...", "../images/..." → should be "/css/...", "/images/..."
  content = content
    .replace(/href="\.\.\/css\//g, 'href="/css/')
    .replace(/href="\.\.\/images\//g, 'href="/images/')
    .replace(/src="\.\.\/images\//g, 'src="/images/')
    .replace(/src="\.\.\/js\//g, 'src="/js/')
    .replace(/src="\.\.\/documents\//g, 'src="/documents/')
    .replace(/srcset="((?:\.\.\/images\/[^"]+))"/g, (_, s) => `srcset="${s.replace(/\.\.\/images\//g, '/images/')}"`)
    .replace(/href="css\//g, 'href="/css/')
    .replace(/href="images\//g, 'href="/images/')
    .replace(/src="images\//g, 'src="/images/')
    .replace(/src="js\//g, 'src="/js/')
    .replace(/src="documents\//g, 'src="/documents/')
    .replace(/srcset="((?:images\/[^"]+))"/g, (_, s) => `srcset="${s.replace(/(?<![/])images\//g, '/images/')}"`);

  // Fix internal .html links to clean paths:
  content = content
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="([^"#?]+)\.html"/g, (_, p) => {
      // Handle relative paths for nested pages
      const cleanPath = p
        .replace(/^\.\.\//, '/')
        .replace(/^(?!\/)/, '/');
      return `href="${cleanPath}"`;
    });

  // Strip Webflow animation-init inline styles (opacity:0 + transforms)
  content = stripAnimationInitStyles(content);

  return content.trim();
}

/**
 * Patterns that identify scripts we do NOT want to execute on the client:
 * analytics/tracking, Webflow infrastructure, marketing automation, and
 * anything already handled by the Next.js root layout.
 */
const SKIP_SCRIPT_PATTERNS = [
  // Analytics & tracking
  'window.dataLayer', 'gtag(', 'GTM-', 'AW-',
  'initApollo', 'trackingFunctions',
  'plausible',
  'lintrk', '_linkedin_partner_id',
  // Webflow infrastructure (handled in layout)
  'WebFont.load', 'w-mod-js', 'DocumentTouch',
  // Marketing UTM automation
  'URLSearchParams_wb', '"utm_source"', "'utm_source'",
  // FinSweet cookie consent (handled in layout)
  'fs-cc',
];

/**
 * Extracts inline page-functional scripts from a Webflow HTML file, filtering
 * out analytics, tracking, and infrastructure scripts already handled by the
 * Next.js layout. Returns an array of script string contents to execute
 * client-side after the page renders.
 */
export function getWebflowPageScripts(relPath: string): string[] {
  const filePath = path.join(WEBFLOW_DIR, relPath);
  if (!existsSync(filePath)) return [];

  const html = readFileSync(filePath, 'utf-8');

  const scripts: string[] = [];
  const scriptTagRe = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scriptTagRe.exec(html)) !== null) {
    const attrs = match[1];
    const content = match[2].trim();

    // Skip external scripts (have a src attribute)
    if (/\bsrc\s*=/i.test(attrs)) continue;
    // Skip structured data
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
    // Skip empty or trivially short scripts
    if (content.length < 60) continue;
    // Skip analytics/infrastructure scripts
    if (SKIP_SCRIPT_PATTERNS.some((p) => content.includes(p))) continue;

    scripts.push(content);
  }

  return scripts;
}

/**
 * Extracts the <title> content from a Webflow HTML file.
 */
export function getWebflowPageTitle(relPath: string): string {
  const filePath = path.join(WEBFLOW_DIR, relPath);
  if (!existsSync(filePath)) return 'Authgear';
  const html = readFileSync(filePath, 'utf-8');
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : 'Authgear';
}

/**
 * Extracts the meta description from a Webflow HTML file.
 */
export function getWebflowPageDescription(relPath: string): string {
  const filePath = path.join(WEBFLOW_DIR, relPath);
  if (!existsSync(filePath)) return '';
  const html = readFileSync(filePath, 'utf-8');
  const match = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i)
    ?? html.match(/<meta[^>]+content="([^"]+)"[^>]+name="description"/i);
  return match ? match[1].trim() : '';
}
