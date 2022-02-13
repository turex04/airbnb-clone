import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'

export default function Home({ exploreNearbyData, liveAnywhereData }) {
  return (
    <div>
      <Head>
        <title>Airbnb | Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <main className="mx-auto max-w-7xl px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="pb-5 text-4xl font-semibold">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {exploreNearbyData?.map((bnb) => (
              <SmallCard
                key={bnb.img}
                image={bnb.img}
                distance={bnb.distance}
                location={bnb.location}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="py-8 text-4xl font-semibold">Live Anywhere</h2>
          <div className="-ml-3 flex space-x-3 overflow-scroll p-3 scrollbar-hide">
            {liveAnywhereData?.map((location) => (
              <MediumCard
                key={location.img}
                title={location.title}
                image={location.img}
              />
            ))}
          </div>
        </section>
        <LargeCard
          image="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists created by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const nearbyResult = await fetch('https://jsonkeeper.com/b/4G1G')
  // const nearbyResult = await fetch('https://links.papareact.com/pyp')
  const exploreNearbyData = await nearbyResult.json()
  const anywhereResult = await fetch('https://jsonkeeper.com/b/VHHT')
  // const anywhereResult = await fetch('https://links.papareact.com/zp1')
  const liveAnywhereData = await anywhereResult.json()
  return { props: { exploreNearbyData, liveAnywhereData } }
}
