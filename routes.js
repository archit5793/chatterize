module.exports = function(io,express){

	var chatController = require('./chat')(io);
	
	var router = express.Router();

	router.get('/',chatController.getRegister);

	router.route('/register')
		.get(chatController.getRegister)
		.post(chatController.register);

	router.route('/login')
		.get(chatController.getLogin)
		.post(chatController.login);

	router.get('/home',chatController.home);

	router.get('/logout',chatController.logout);	

	return router;
	
}