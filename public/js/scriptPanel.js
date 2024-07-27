document.addEventListener('DOMContentLoaded', () => {
	const rangeSlider = document.getElementById('rangeSlider')
	const sliderValue = document.getElementById('sliderValue')
	const totalCost = document.getElementById('totalCost')
	const buttons = document.querySelectorAll('.price-button')
	const packageDisplay = document.getElementById('Pakiet')
	let currentPrice = 15

	const updateCost = () => {
		const value = rangeSlider.value
		totalCost.textContent = `${value * currentPrice} zł`
	}

	rangeSlider.addEventListener('input', () => {
		sliderValue.textContent = rangeSlider.value
		updateCost()
	})

	buttons.forEach(button => {
		button.addEventListener('click', event => {
			currentPrice = parseInt(event.target.getAttribute('data-price'))
			rangeSlider.style.background = event.target.getAttribute('data-color')
			packageDisplay.textContent = event.target.getAttribute('data-package')
			updateCost()
		})
	})

	rangeSlider.style.background = '#f371b5'
	packageDisplay.textContent = 'Basic'
	rangeSlider.value = 0
	sliderValue.textContent = 0
	updateCost()
})

document.addEventListener('DOMContentLoaded', () => {
	const links = document.querySelectorAll('.navigation-promotion a')
	const cards = document.querySelectorAll('.container-promotion .card')

	const updateCounters = () => {
		links.forEach(link => {
			const filter = link.getAttribute('data-filter')
			const count = document.querySelectorAll(`.card.${filter}`).length
			link.querySelector('span').textContent = count

			if (count === 0) {
				link.classList.add('disabled')
			} else {
				link.classList.remove('disabled')
			}
		})
	}

	updateCounters()

	links.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault()
			document.querySelector('.navigation-promotion .active-a')?.classList.remove('active-a')
			link.classList.add('active-a')
			const filter = link.getAttribute('data-filter')
			cards.forEach(card => {
				card.style.display = card.classList.contains(filter) ? 'block' : 'none'
			})
		})
	})

	const firstEnabledLink = document.querySelector('.navigation-promotion a:not(.disabled)')
	if (firstEnabledLink) {
		firstEnabledLink.classList.add('active-a')
		firstEnabledLink.click()
	}
})

window.addEventListener('load', () => {
	document.getElementById('preloader-screen').style.display = 'none'
})

document.getElementById('account').addEventListener('click', () => {
	document.getElementById('HelpSection').style.display = 'none'
	document.getElementById('nav').style.display = 'none'
	document.getElementById('account-section').style.display = 'flex'
	document.getElementById('back-button').style.display = 'block'
	document.getElementById('back-button-container').style.display = 'flex'
	window.scrollTo(0, 0)
})

document.getElementById('promotion').addEventListener('click', () => {
	document.getElementById('HelpSection').style.display = 'none'
	document.getElementById('promotion-section').style.display = 'flex'
	document.getElementById('back-button').style.display = 'block'
	document.getElementById('back-button-container').style.display = 'flex'
	document.getElementById('nav').style.display = 'none'
	window.scrollTo(0, 0)
})

document.getElementById('information').addEventListener('click', () => {
	document.getElementById('HelpSection').style.display = 'none'
	document.getElementById('information-section').style.display = 'flex'
	document.getElementById('back-button').style.display = 'block'
	document.getElementById('back-button-container').style.display = 'flex'
	document.getElementById('nav').style.display = 'none'
	window.scrollTo(0, 0)
})

document.getElementById('back-button').addEventListener('click', () => {
	document.getElementById('back-button').style.display = 'none'
	document.getElementById('back-button-container').style.display = 'none'
	document.getElementById('HelpSection').style.display = 'flex'
	document.getElementById('account-section').style.display = 'none'
	document.getElementById('information-section').style.display = 'none'
	document.getElementById('promotion-section').style.display = 'none'
	document.getElementById('nav').style.display = 'flex'
	window.scrollTo(0, 0)
})

document.querySelectorAll('.card').forEach(card => {
	const images = card.querySelectorAll('.image-thumb img')
	let currentIndex = 0

	const changeImage = direction => {
		images[currentIndex].classList.remove('active')
		images[currentIndex].classList.add('inactive')
		currentIndex = (currentIndex + direction + images.length) % images.length
		images[currentIndex].classList.remove('inactive')
		images[currentIndex].classList.add('active')
	}

	card.querySelector('.left').addEventListener('click', () => {
		changeImage(-1)
	})
	card.querySelector('.right').addEventListener('click', () => {
		changeImage(1)
	})
})

const copyText = textToCopy => {
	const tempTextArea = document.createElement('textarea')
	tempTextArea.value = textToCopy
	document.body.appendChild(tempTextArea)
	tempTextArea.select()
	document.execCommand('copy')
	document.body.removeChild(tempTextArea)

	const button = document.getElementById('copy-5')
	const originalButtonText = button.innerHTML
	button.innerHTML = 'Skopiowano! <i class="fa-solid fa-clipboard"></i>'
	setTimeout(() => {
		button.innerHTML = originalButtonText
	}, 2000)
}

const copyText2 = textToCopy => {
	const tempTextArea = document.createElement('textarea')
	tempTextArea.value = textToCopy
	document.body.appendChild(tempTextArea)
	tempTextArea.select()
	document.execCommand('copy')
	document.body.removeChild(tempTextArea)

	const button = document.getElementById('copy-6')
	const originalButtonText = button.innerHTML
	button.innerHTML = 'Skopiowano! <i class="fa-solid fa-clipboard"></i>'
	setTimeout(() => {
		button.innerHTML = originalButtonText
	}, 2000)
}

const choiceEvent = (element, headlineText, imageSrc, href, hrefAcc, hrefAcc2, bioSrc, textToCopy, textToCopy2) => {
	element.addEventListener('click', () => {
		document.getElementById('zasoby-container').style.display = 'grid'
		document.getElementById('zasoby-choice').style.display = 'none'
		document.getElementById('zasoby-choice-container').style.display = 'none'
		document.getElementById('back-button').style.display = 'none'
		document.getElementById('back-button-container').style.display = 'none'
		document.getElementById('back-button-second').style.display = 'block'
		document.getElementById('back-button-container').style.display = 'flex'
		document.getElementById('zasoby-headline-text').textContent = headlineText
		document.getElementById('image-zasoby').src = imageSrc
		document.getElementById('href-zasoby').href = href
		document.getElementById('href-zasoby-acc').href = hrefAcc
		document.getElementById('href-zasoby-acc-2').href = hrefAcc2
		document.getElementById('text-5').src = bioSrc

		const copyButton = document.getElementById('copy-5')
		const copyButton2 = document.getElementById('copy-6')
		copyButton.onclick = () => copyText(textToCopy)
		copyButton2.onclick = () => copyText2(textToCopy2)
	})
}

choiceEvent(
	document.getElementById('choiceTitan'),
	'Konfiguracja konta TitanMethod',
	'./img/LogoProducts/Titan Method-01-min.jpg',
	'https://drive.google.com/file/d/1u0Cs6H7zlxZXAtQZTfTQJ3X_xCSdNBBV/view?usp=share_link',
	'https://www.tiktok.com/@titan.method',
	'https://www.tiktok.com/@titan.method',
	'./img/BioImage/titanBio.jpeg',
	'📈Gotowy wejść na wyższy poziom?📈 Zdobądź TitanMethod tutaj👇@Titan Method',
	'🇵🇱#1 w Polsce🇵🇱 ✅Pomogliśmy już ponad 650 osobom✅ Zdobądź Titan Method⬇️'
)

document.getElementById('back-button-second').addEventListener('click', () => {
	document.getElementById('zasoby-container').style.display = 'none'
	document.getElementById('zasoby-choice').style.display = 'grid'
	document.getElementById('zasoby-choice-container').style.display = 'flex'
	document.getElementById('back-button').style.display = 'block'
	document.getElementById('back-button-container').style.display = 'flex'
	document.getElementById('back-button-second').style.display = 'none'
	document.getElementById('zasoby-headline-text').textContent = 'Wybierz promowany produkt'
})
