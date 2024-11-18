import type { MetaObject } from "nuxt/schema";
interface SEOData {
  title?: string;
  description?: string;
  lang?: string;
  keywords?: string;
  urlPath?: string;
  imagePath?: string;
}
export default (data: SEOData) => {
  const config = useRuntimeConfig();
  const dataTitle =
    data.title || (config.metaDefaultTitle ? config.metaDefaultTitle : "");
  const dataDescription = data.description
    ? data.description.replace(/<[^>]*>/g, "")
    : config.metaDefaultDescription
    ? config.metaDefaultDescription.replace(/<[^>]*>/g, "")
    : "";
  return {
    htmlAttrs: {
      lang:
        data.lang ||
        useNuxtApp().$i18n.locale.value ||
        (config.metaDefaultLang ? config.metaDefaultLang : "th"),
    },
    title: dataTitle,
    meta: [
      {
        hid: "title",
        name: "title",
        content: dataTitle,
      },
      {
        hid: "description",
        name: "description",
        content: dataDescription,
      },
      {
        name: "keywords",
        content:
          data.keywords ||
          (config.metaDefaultKeywords
            ? config.metaDefaultKeywords.split(",")
            : []),
      },
      {
        property: "og:title",
        name: "og:title",
        content: dataTitle,
      },
      {
        property: "og:type",
        name: "og:type",
        content: "website",
      },
      {
        property: "og:description",
        name: "og:description",
        content: dataDescription,
      },
      {
        property: "og:url",
        name: "og:url",
        content: data.urlPath
          ? `${config.public.webBase}${useRoute().fullPath}`
          : config.metaDefaultUrl
          ? config.metaDefaultUrl
          : "",
      },
      {
        property: "og:site_name",
        name: "og:site_name",
        content: config.metaDefaultSiteName ? config.metaDefaultSiteName : "",
      },
      {
        property: "og:image",
        name: "og:image",
        content:
          data.imagePath ||
          (config.metaDefaultImage ? config.metaDefaultImage : ""),
      },
      {
        property: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:site",
        name: "twitter:site",
        content: "@publisher_handle",
      },
      {
        property: "twitter:url",
        name: "twitter:url",
        content: data.urlPath
          ? `${config.public.webBase}${useRoute().fullPath}`
          : config.metaDefaultUrl
          ? config.metaDefaultUrl
          : "",
      },
      {
        property: "twitter:title",
        name: "twitter:title",
        content: dataTitle,
      },
      {
        property: "twitter:description",
        name: "twitter:description",
        content: dataDescription,
      },
      {
        property: "twitter:image",
        name: "twitter:image",
        content:
          data.imagePath ||
          (config.metaDefaultImage ? config.metaDefaultImage : ""),
      },
    ],
    link: [
      {
        rel: "canonical",
        href: data.urlPath
          ? `${config.public.webBase}${useRoute().fullPath}`
          : config.metaDefaultUrl
          ? config.metaDefaultUrl
          : "",
      },
    ],
  };
};
