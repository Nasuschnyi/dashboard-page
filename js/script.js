document.addEventListener('DOMContentLoaded', function() {
	const defaultPage = 'customers';
	loadPage(defaultPage);
});

document.querySelectorAll('.nav__link').forEach(function(link) {
	link.addEventListener('click', function(event) {
		event.preventDefault();
		const page = link.getAttribute('href');
		loadPage(page);
		toggleActiveClass(link);
	});
});

function loadPage(page) {
	return fetch(page)
		.then(checkStatus)
		.then((response) => response.text())
		.then((html) => {
			document.querySelector('.article').innerHTML = html;
			const clickedLink = document.querySelector(`a[href="${page}"]`);
			toggleActiveClass(clickedLink);
			animateMain();
		})
		.catch((error) => {
			document.querySelector('.article').innerHTML = `
		  <div class="error">
			<h2 class="error-title">Error</h2>
			<p class="error-desc">Page ${page} not found</p>
		  </div>
		`;
		});
}

const isOk = (response) => response.ok;
const checkStatus = (response) =>
	isOk(response)
		? response
		: Promise.reject(new Error(`Page ${response.url} not found`));

function toggleActiveClass(link) {
	document.querySelector('.nav__link.active')?.classList.remove('active');
	link.classList.add('active');
	document
		.querySelector('.main')
		.classList.toggle('active', link.classList.contains('active'));
}

document.querySelector('.btn-close').addEventListener('click', function() {
	removeActiveClass();
});

function removeActiveClass() {
	document.querySelector('.nav__link.active')?.classList.remove('active');
	document.querySelector('.main').classList.remove('active');
}

function animateMain() {
	const main = document.querySelector('.main');
	main.style.opacity = 0;
	main.style.transform = 'scale(0)';
	setTimeout(() => {
		main.style.opacity = 1;
		main.style.transform = 'scale(1)';
		main.style.transition = 'opacity 0.5s, transform 0.5s';
	}, 500);
}
