import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoCard from '../components/InfoCard'
import MapView from '../components/MapView'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Search({ searchResults }) {
  const {
    query: { location, endDate, startDate, noOfGuests },
  } = useRouter()
  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')
  const formattedSearchPeriod = `${formattedStartDate} - ${formattedEndDate}`
  return (
    <div className="h-screen">
      <Header
        placeholder={`${location} | ${formattedSearchPeriod} | ${noOfGuests} guest(s).`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays • {formattedSearchPeriod} • {noOfGuests} guest(s).
          </p>
          <h1 className="text-3xl mb-6 mt-2 font-semibold">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="filterButton">Cancellation Flexibility</p>
            <p className="filterButton">Type of place</p>
            <p className="filterButton">Price</p>
            <p className="filterButton">Rooms and Beds</p>
            <p className="filterButton">More filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map((result) => (
              <InfoCard result={result} key={result.img} />
            ))}
          </div>
        </section>
        <section className="hidden md:inline-flex xl:min-w-[600px] l:min-w-[400px] justify-center items-center ">
          <MapView searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const searchResults = await fetch('https://jsonkeeper.com/b/5NPS').then(
    // const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )
  return {
    props: {
      searchResults,
    },
  }
}
