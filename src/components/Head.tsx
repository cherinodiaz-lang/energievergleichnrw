export const Head = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* SEO Meta Tags */}
      <meta name="description" content="Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie die besten Angebote für Privat- und Gewerbekunden. Kostenlos und unabhängig." />
      <meta name="keywords" content="Energievergleich, Strom, Gas, Tarife, NRW, Nordrhein-Westfalen, Gewerbestrom, Gewerbegas, Photovoltaik, Solaranlage" />
      <meta name="author" content="energievergleich.nrw" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="German" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Meta Tags (Social Media) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Energievergleich NRW - Strom & Gas Tarife vergleichen und sparen" />
      <meta property="og:description" content="Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie die besten Angebote für Privat- und Gewerbekunden. Kostenlos und unabhängig." />
      <meta property="og:url" content="https://energievergleich.nrw" />
      <meta property="og:image" content="https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:locale" content="de_DE" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Energievergleich NRW - Strom & Gas Tarife vergleichen und sparen" />
      <meta name="twitter:description" content="Vergleichen Sie Strom- und Gastarife in Nordrhein-Westfalen. Finden Sie die besten Angebote für Privat- und Gewerbekunden." />
      <meta name="twitter:image" content="https://static.wixstatic.com/media/32e7c0_8cede5e338be484bb8dcaad81c053c82~mv2.png?originWidth=1920&originHeight=1024" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#2C6E49" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link rel="canonical" href="https://energievergleich.nrw" />
      
      {/* Fonts - Preconnect for performance */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="dns-prefetch" href="https://static.parastorage.com" />
      
      {/* Image CDN Preconnect */}
      <link rel="preconnect" href="https://static.wixstatic.com" />
      <link rel="dns-prefetch" href="https://static.wixstatic.com" />

      {/* Google Tag Manager (GTM) - Async loading for non-blocking */}
      {/* Replace GTM-XXXXXXX with your actual GTM Container ID */}
      <script
        async
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');`
        }}
      />
      {/* End Google Tag Manager */}
    </>
  );
};
