NODE = node

test: test_assoc

test_assoc:
	@$(NODE) test/assoc_test.js
