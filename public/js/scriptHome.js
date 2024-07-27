const preloaderScreen = document.getElementById('preloader-screen')

window.addEventListener('load', function () {
	preloaderScreen.style.display = 'none'
})

const navToggler = document.getElementById('nav-toggler')
const nav = document.getElementById('nav')
const navLink = document.querySelectorAll('.nav-link')

// add event listener to each nav link
navLink.forEach(link => {
	link.addEventListener('click', () => {
		nav.classList.remove('nav-transform')
		navToggler.classList.remove('nav-toggler-transform')
	})
})

navToggler.addEventListener('click', () => {
	nav.classList.toggle('nav-transform')
	navToggler.classList.toggle('nav-toggler-transform')
})

const faqs = document.querySelectorAll('.faq')

faqs.forEach(faq => {
	faq.addEventListener('click', () => {
		faq.classList.toggle('active')
	})
})
document.addEventListener('DOMContentLoaded', () => {
	// Animate on hover for social icons
	const socialIcons = document.querySelectorAll('.social-icon')

	socialIcons.forEach(icon => {
		icon.addEventListener('mouseover', () => {
			icon.classList.add('animate__animated', 'animate__pulse')
		})

		icon.addEventListener('mouseout', () => {
			icon.classList.remove('animate__animated', 'animate__pulse')
		})
	})

	// Form submission animation
	const subscribeForm = document.getElementById('subscribe-form')

	subscribeForm.addEventListener('submit', e => {
		e.preventDefault()
		subscribeForm.classList.add('animate__animated', 'animate__bounceOut')
		setTimeout(() => {
			alert('Thank you for subscribing!')
			subscribeForm.classList.remove('animate__bounceOut')
			subscribeForm.reset()
		}, 1000)
	})
})
const showVideoBtn = document.querySelector('#show-video-btn')
const overlay = document.getElementById('overlay')
const closeBtn = document.querySelector('.close-btn')

showVideoBtn.addEventListener('click', () => {
	overlay.style.display = 'flex'
})

closeBtn.addEventListener('click', () => {
	overlay.style.display = 'none'
})
