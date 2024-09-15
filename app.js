const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./css'));

app.get('/', (req, res) => {
	try {
		res.render('index', {
			cssPath: 'main.css',
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(3000, () => {
	console.log('http://localhost:3000/');
});

app.use(express.static(__dirname));

app.get('/:page', (req, res) => {
	const page = req.params.page;
	res.render(`pages/${page}.pug`, { layout: false });
});
