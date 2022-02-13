import Image from 'next/image'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {
  SearchIcon,
  GlobeAltIcon,
  UsersIcon,
  UserCircleIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { useRouter } from 'next/router'

export default function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [noOfGuests, setNoOfGuests] = useState(1)
  const router = useRouter()
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }
  const resetInput = () => {
    setSearchInput('')
  }
  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    })
  }
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md md:px-10">
      <div
        onClick={() => router.push('/')}
        className="relative my-auto flex h-10 cursor-pointer items-center"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
          // src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className="flex items-center rounded-full py-2 md:border-2 md:shadow-sm">
        <input
          className="placeholder- flex-grow bg-transparent pl-5 text-gray-600 placeholder-gray-400 outline-none"
          type="text"
          value={searchInput}
          onChange={({ target }) => setSearchInput(target.value)}
          placeholder={placeholder || 'Start your search'}
        />
        <SearchIcon className="hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:mx-2 md:inline-flex" />
      </div>
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden cursor-pointer md:inline">Become a Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer " />
        <div className="flex items-center space-x-2 rounded-full border-2 p-2">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />
          <div className="flex items-center mb-4 border-b">
            <h2 className="flex-grow">Number of Guests</h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              className="w-10 pl-2 outline-none text-red-400"
              value={noOfGuests}
              onChange={({ target }) => setNoOfGuests(target.value)}
              min={1}
            />
          </div>
          <div className="flex justify-around">
            <button className="text-gray-500" onClick={resetInput}>
              Cancel
            </button>
            <button className="text-red-400" onClick={search}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
