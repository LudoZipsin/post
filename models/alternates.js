module.exports = {
	id: {type: 'increments', nullable: false, primary: true},
	name: {type: 'string', maxlength: 254, nullable: false},
	description: {type: 'string', maxlength: 1024, nullable: false},
	preInstall: {type: 'string', maxlength: 1024, nullable: true},
	install: {type: 'string', maxlength: 1024, nullable: false},
	postInstall: {type: 'string', maxlength: 1024, nullable: false},
	install_id: {type: 'integer', nullable: false, unsigned: true}
}