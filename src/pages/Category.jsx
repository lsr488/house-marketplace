import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')

        // create query
        const q = query(
          listingsRef, 
          where('type', '==', params.categoryName), 
          orderBy('timestamp', 'desc'), 
          limit(2)
        )

        // execute query
        const querySnapshot = await getDocs(q)

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        setLastFetchedListing(lastVisible)

        // iterate through querySnapshot
        const listings = []
        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        // set listings
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [params.categoryName])
  
  // pagination and load more
  const onFetchMoreListings = async () => {
    try {
      // get reference
      const listingsRef = collection(db, 'listings')

      // create query
      const q = query(
        listingsRef, 
        where('type', '==', params.categoryName), 
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(2)
      )

      // execute query
      const querySnapshot = await getDocs(q)

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
      setLastFetchedListing(lastVisible)

      // iterate through querySnapshot
      const listings = []
      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      // set listings
      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' 
          ? 'Places for Rent' 
          : 'Places for Sale'}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>)}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
