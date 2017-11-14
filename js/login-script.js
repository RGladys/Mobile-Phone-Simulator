const login = (function(){
	var input = $j('#loginText'),
		button = $j('#loginButton'),
		login = $j('#login'),
		messageTaken = $j('#loginMessageTaken'),
		messageInvalid = $j('#loginMessageInvalid'),
		name;

	input.focus();

	//Ask if the name is not already taken
	function answer(data){
		if (data){
			socket.emit('login', {
			name: name
		});
		login.css('display', 'none')
		} else {
			messageTaken.css('display', 'block');
			messageInvalid.css('display', 'none')
		}
	};

	//Focus on input
	input.on('click', function(){
		$j(this).focus()
	});

	//On clicking a button
	button.on('click', function(){
		name = input.val().trim();
		if (name){
			socket.emit('ask', {
			name: name
		});
		} else {
			messageInvalid.css('display', 'block');
			messageTaken.css('display', 'none');
		}
		
	});

	return {
		answer
	}
})()