import type { PricingCopy } from './types';
import { fullComparisonEs } from './data/full-comparison-es';

export const pricingCopyEs: PricingCopy = {
  meta: {
    title: 'Precios - Authgear',
    description:
      'Solución de autenticación y autorización para tus aplicaciones y APIs, con precios flexibles para desarrolladores y empresas.',
  },
  cloud: {
    titleLine1: 'Precios simples y ',
    titleHighlight: 'transparentes',
    titleLine1Suffix: '',
    titleLine2: '',
    subtitle: 'Sin funciones bloqueadas. Sin costes ocultos.',
    intro: 'En Authgear creemos en impulsar tu crecimiento. ',
    introStrong: 'Todos los planes incluyen todas las funciones',
    introRest:
      ': desde medidas de seguridad robustas hasta integraciones fluidas y personalizaciones avanzadas. Empieza gratis y escala tus aplicaciones con todas las herramientas que necesitas.',
    plans: [
      {
        name: 'Free',
        priceLine: '$0',
        cta: { label: 'Empieza ahora', href: 'https://portal.authgear.com/', external: true },
        features: [
          'MAUs ilimitados',
          '100 mensajes SMS/WhatsApp',
          '2 aplicaciones',
          '2 asientos de administrador',
          '1 día de retención de logs',
          'Incluye todas las funciones de autenticación',
          'Soporte de la comunidad',
        ],
      },
      {
        name: 'Developers',
        badge: 'Más popular',
        priceLine: '$50',
        highlight: true,
        cta: {
          label: 'Empieza ahora',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=developers-plan',
          external: true,
        },
        features: [
          'MAUs ilimitados',
          'SMS/WhatsApp por consumo',
          '2 aplicaciones',
          '2 asientos de administrador',
          '1 día de retención de logs',
          'Incluye todas las funciones de autenticación',
          'Soporte prioritario por correo',
        ],
      },
      {
        name: 'Business',
        priceLine: '$500',
        cta: {
          label: 'Empieza ahora',
          href: 'https://portal.authgear.com/?utm_source=pricing&utm_medium=link&utm_campaign=business-plan',
          external: true,
        },
        features: [
          '25,000 MAUs (+$50/5k MAUs)',
          'SMS/WhatsApp por consumo',
          '5 aplicaciones',
          '5 asientos de administrador',
          '60 días de retención de logs',
          'Incluye todas las funciones de autenticación',
          'Canal de Slack dedicado',
        ],
      },
      {
        name: 'Enterprise',
        enterprise: true,
        priceLine: 'Precio personalizado',
        cta: { label: 'Contáctanos', href: '__CONTACT__', external: false },
        features: [
          'Descuento por volumen',
          'Residencia de datos',
          'Pasarela SMS personalizada',
          'SLA a medida',
          'Gestor de cuenta dedicado',
        ],
      },
    ],
    expandComparison: 'Ver la comparativa completa de planes',
    fullPlanTitle: 'Comparativa completa de planes',
  },
  comparison: fullComparisonEs,
  cta: {
    title: '¿No encuentras el plan que buscas?',
    subtitle: 'Escríbenos y te ayudaremos a encontrar la mejor opción para tu negocio.',
    button: 'Contáctanos',
    href: '__CONTACT__',
  },
  faq: {
    heading: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Authgear es de código abierto?',
        a: '¡Sí! Authgear es de código abierto, así que no tienes que preocuparte por la dependencia de un proveedor. Puedes encontrar en GitHub la versión exacta que ejecutamos en Authgear.com.',
      },
      {
        q: '¿Dónde está alojado Authgear?',
        a: 'Actualmente estamos alojados en Google Cloud Platform, en Estados Unidos. Si necesitas un SaaS gestionado en otros países, contáctanos.',
      },
      {
        q: '¿Puedo exportar todos los datos de usuario si dejo de usar Authgear?',
        a: 'Sí. Puedes exportar todos los datos de Authgear cuando lo necesites. Authgear es de código abierto y se basa en PostgreSQL, así que puedes exportar los datos y ejecutarlo en tus propios servidores.',
      },
      {
        q: '¿Por qué debería confiar mis datos a Authgear?',
        a: 'Authgear es de código abierto, así que no hay código propietario oculto. Puedes auditarlo todo. Alojamos los datos en centros de datos y proveedores de nube que cumplen estándares de seguridad de la información como ISO 27001 y PCI-DSS. Puedes leer más aquí. Además, diseñamos y desarrollamos cada función siguiendo la lista de verificación del Open Web Application Security Project (OWASP).',
      },
      {
        q: '¿Authgear ofrece garantía de devolución?',
        a: 'Sí, ofrecemos una garantía de devolución de 30 días en cualquier plan SaaS.',
      },
      {
        q: '¿Qué pasa si alcanzo mi límite de MAUs?',
        a: 'En el plan Business, los MAUs adicionales se cobrarán en el siguiente ciclo de facturación.',
      },
      {
        q: '¿Qué son los MAUs?',
        a: 'Un MAU (usuario activo mensual) es cualquier usuario único que ha interactuado con tu app (es decir, se ha registrado, ha iniciado sesión o ha tenido una sesión activa) durante un mes determinado.',
      },
      {
        q: '¿Ofrecen descuentos por volumen o despliegue en nube privada?',
        a: '¡Sí! Trabajamos con empresas para personalizar el plan que mejor se adapte a sus necesidades. ¡Contáctanos!',
      },
      {
        q: '¿Qué significan para mí los MAUs ilimitados?',
        a: 'Con MAUs ilimitados puedes escalar tu base de usuarios sin ninguna restricción en el número de usuarios activos. Así puedes hacer crecer tu aplicación sin preocuparte por alcanzar límites de usuarios.',
      },
      {
        q: '¿El plan Free es realmente gratis?',
        a: '¡Sí! Nuestro plan Free ofrece las funciones esenciales sin coste y sin necesidad de tarjeta de crédito. Puedes empezar a construir y escalar tu aplicación sin ninguna inversión inicial.',
      },
      {
        q: '¿Puedo cambiar de plan más adelante?',
        a: 'Por supuesto. A medida que crezcan tus necesidades, puedes pasar a un plan superior en cualquier momento. Nuestra estructura de precios flexible está diseñada para acompañar tu crecimiento.',
      },
      {
        q: '¿Cómo obtengo un precio personalizado para el plan Enterprise?',
        a: 'Para empresas con necesidades específicas, nuestro plan Enterprise ofrece soluciones a medida. Contacta con nuestro equipo de ventas para hablar de tus requisitos y recibir un presupuesto personalizado.',
      },
      {
        q: '¿Qué tipo de soporte incluye cada plan?',
        a: 'Free: acceso a nuestra base de conocimiento y soporte de la comunidad. Developers: soporte prioritario por correo. Business: canal de Slack dedicado. Enterprise: soporte dedicado 24/7 y un gestor de cuenta personal.',
      },
    ],
  },
};
