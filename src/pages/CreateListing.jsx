import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function CreateListing() {
	const [geolocationEnabled, setGeolocationEnabled] = useState(true)
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		images: {},
		latitude: 0,
		longitude: 0
	})

	const {type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude} = formData

	const auth = getAuth()
	const navigate = useNavigate()
	const isMounted = useRef(true)

	useEffect(() => {
		if(isMounted) {
			onAuthStateChanged(auth, (user) => {
				if(user) {
					setFormData({...formData, userRef: user.uid})
				} else {
					navigate('/sign-in')
				}
			})
		}

		return () => {
			isMounted.current = false
		}
	}, [isMounted])

	const onSubmit = e => {
		e.preventDefault();
	}

	const onMutate = e => {}

	if(loading) {
		return <Spinner />
	}

	return <div className="profile">
			<header>
				<p className="pageHeader">Create a Listing</p>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<label className="formLabel">Sell / Rent</label>
					<div className="formButtons">
						<button
							type="button"
							className={type === 'sale' ? 'formButtonActive' : 'formButton'}
							id="type"
							value="sale"
							onClick={onMutate}
						>
							Sell
						</button>

						<button
							type="button"
							className={type === 'rent' ? 'formButtonActive' : 'formButton'}
							id="type"
							value="rent"
							onClick={onMutate}
						>
							Rent
						</button>
					</div>

					<label className="formLabel">Name</label>
					<input
						type="text"
						className="formInputName"
						id="name"
						value={name}
						onChange={onMutate}
						maxLength="32"
						minLength="10"
						required
					/>

					<div className="formRooms flex">
						<div>
							<label className="formLabel">Bedrooms</label>
							<input
								className="formInputSmall"
								type="number"
								id="bedrooms"
								value={bedrooms}
								onChange={onMutate}
								max="50"
								min="1"
								required
							/>
						</div>
						<div>
							<label className="formLabel">Bathrooms</label>
							<input
								className="formInputSmall"
								type="number"
								id="bathrooms"
								value={bathrooms}
								onChange={onMutate}
								max="50"
								min="1"
								required
							/>
						</div>
					</div>

					<label className="formLabel">Parking Spot</label>
					<div className="formButtons">
						<button
							type="button"
							className={type === 'parking' ? 'formButtonActive' : 'formButton'}
							id="parking"
							value={true}
							onClick={onMutate}
							min="1"
							max="50"
						>
							Yes
						</button>

						<button
							type="button"
							className={!parking && parking !== null ? 'formButtonActive' : 'formButton'}
							id="parking"
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>

					<label className="formLabel">Furnished</label>
					<div className="formButtons">
						<button
							type="button"
							className={type === 'furnished' ? 'formButtonActive' : 'formButton'}
							id="furnished"
							value={true}
							onClick={onMutate}
							min="1"
							max="50"
						>
							Yes
						</button>

						<button
							type="button"
							className={!furnished && furnished !== null ? 'formButtonActive' : 'formButton'}
							id="furnished"
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>

					<label className="formLabel">Address</label>
					<textarea
						className="formInputAddress"
						type="text"
						id="address"
						value={address}
						onChange={onMutate}
						required
					/>
				</form>
			</main>
	</div>
}

export default CreateListing