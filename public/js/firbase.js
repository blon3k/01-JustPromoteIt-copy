import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'
import {
	getFirestore,
	collection,
	addDoc,
	serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'

async function getFirebaseConfig() {
	try {
		const response = await fetch('/config')
		const config = await response.json()
		return config
	} catch (error) {
		console.error('Error fetching Firebase config:', error)
		throw error
	}
}

document.addEventListener('DOMContentLoaded', async function () {
	try {
		const firebaseConfig = await getFirebaseConfig()
		const app = initializeApp(firebaseConfig)
		const db = getFirestore(app)
		const form = document.getElementById('registration-form')

		form.addEventListener('submit', async function (event) {
			event.preventDefault()

			const lastSubmissionTimestamp = localStorage.getItem('lastSubmissionTimestamp')
			if (lastSubmissionTimestamp) {
				const lastTimestamp = new Date(parseInt(lastSubmissionTimestamp))
				const currentTimestamp = new Date()

				if (currentTimestamp - lastTimestamp < 60000) {
					const secondsRemaining = Math.ceil((60000 - (currentTimestamp - lastTimestamp)) / 1000)
					alert(`Możesz wysłać tylko jedno żądanie na minutę. Poczekaj ${secondsRemaining} sekund.`)
					return
				}
			}

			const tiktokInput = document.querySelector('input[name="data[TikTok]"]')
			const ytShortsInput = document.querySelector('input[name="data[YtShorts]"]')
			const instagramInput = document.querySelector('input[name="data[Instagram]"]')
			const emailContact = document.querySelector('input[name="data[EmailContact]"]').value.trim()
			const paymentMethod = document.querySelector('select[name="data[PaymentMethod]"]').value.trim()
			const paymentMethodInfo = document.querySelector('input[name="data[PaymentMethodInfo]"]').value.trim()

			let tiktokLink, YtShortLinks, InstagramLink

			if (tiktokInput) {
				tiktokLink = tiktokInput.value.trim()
			}

			if (ytShortsInput) {
				YtShortLinks = ytShortsInput.value.trim()
			}

			if (instagramInput) {
				InstagramLink = instagramInput.value.trim()
			}

			if (emailContact !== '' && paymentMethod !== '' && (tiktokLink || YtShortLinks || InstagramLink)) {
				try {
					await addDoc(collection(db, 'users'), {
						tiktokLink: tiktokLink || null,
						YtShortsLink: YtShortLinks || null,
						InstagramLink: InstagramLink || null,
						emailContact: emailContact,
						paymentMethod: paymentMethod,
						paymentMethodInfo: paymentMethodInfo,
						timestamp: serverTimestamp(),
					})

					localStorage.setItem('lastSubmissionTimestamp', Date.now().toString())
					document.getElementById('page').style.display = 'none'
					document.getElementById('notification').style.display = 'flex'
					const confettiElement = document.getElementById('confetti')
					const jsConfetti = new JSConfetti()
					jsConfetti.addConfetti()
					document.getElementById('confetti').style.display = 'block'
				} catch (error) {
					console.error('Błąd zapisu danych:', error)
					alert('Błąd zapisu danych: ' + error.message)
				}
			} else {
				alert('Proszę wypełnić wszystkie wymagane pola!')
			}
		})
	} catch (error) {
		console.error('Błąd inicjalizacji Firebase:', error)
		alert('Błąd inicjalizacji Firebase: ' + error.message)
	}
})
