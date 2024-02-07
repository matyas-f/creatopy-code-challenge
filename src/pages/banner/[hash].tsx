import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { DesignJsonWithHash, JsonDesign } from '../../types/banner-json'
import { Banner } from '../../components/banner'
import { Slide } from '../../components/slide'
import { LayerElement } from '../../components/layer-element'
import Head from 'next/head'

// Could use an environment variable
const JSON_STORAGE_BASE_URL =
  'https://creatopy-cdn-b1a8267.s3.amazonaws.com/designs'

export const getServerSideProps = (async (req) => {
  if (!req.query.hash) {
    return { notFound: true }
  }

  const rawResponse = await fetch(
    `${JSON_STORAGE_BASE_URL}/${req.query.hash}/json`
  )

  // Could do more precise error handling with status code mapping to error messages
  // using a custom error page (now it's using the default 404 page for all errors, even for something like an outage error)
  if (rawResponse.status !== 200) {
    return { notFound: true }
  }

  const jsonResponse = (await rawResponse.json()) as DesignJsonWithHash

  if (!jsonResponse?.banner) {
    return { notFound: true }
  }

  return {
    props: { banner: jsonResponse.banner },
  }
}) satisfies GetServerSideProps<{ banner: JsonDesign }>

const BannerSsrPage = ({
  banner: { properties, elements },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {/* Dynamic font loading is out of scope for this code challenge for me */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* In this case we don't want to load all banner fonts on every single page */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Banner proprieties={properties}>
        {elements.map((element) => {
          if (element.type === 'slide') {
            return (
              <Slide
                key={
                  // bannersetElementId is typed as possibly undefined and id is deprecated for slides
                  element.properties.bannersetElementId || element.properties.id
                }
                properties={element.properties}
              >
                {element.elements.map((jsonElement) => (
                  <LayerElement
                    key={jsonElement.properties.id}
                    element={jsonElement}
                  />
                ))}
              </Slide>
            )
          }

          if (element.type === 'layer') {
            return (
              <LayerElement key={element.properties.id} element={element} />
            )
          }

          return null
        })}
      </Banner>
    </>
  )
}

export default BannerSsrPage
