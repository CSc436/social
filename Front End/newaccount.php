<link rel="stylesheet" type="text/css" href="newaccount.css">
<div id="new_account_form">
	<form method="POST" action="../backend/accounts/process_create_account.php">
		<div class="new_account_form_block new_account_title">
			Create New Account
		</div>
		<div class="new_account_form_block">
			<div class="new_account_form_column">
				<label for="email">Email Address</label>
				<input type="text" name="email" placeholder="foo@bar.com" required />
				<label for="password1">Password</label>
				<input type="password" name="password1" placeholder="Enter Password" required />
				<label for="firstname">First Name</label>
				<input type="text" name="firstname" placeholder="Foo" required />
				<label for="phone">Mobile Phone Number</label>
				<input type="text" name="phone" placeholder="(555)-555-0123" required />
			</div>
			<div class="new_account_form_column">
				<label for="username">Username</label>
				<input type="text" name="username" placeholder="Foobar" required />
				<label for="password2">Retype Password</label>
				<input type="password" name="password2" placeholder="Retype Password" required />
				<label for="lastname">Last Name</label>
				<input type="text" name="lastname" placeholder="Bar" required />
			</div>
		</div>
		<div class="new_account_form_block new_account_submit">
			<input type="submit" value="Create Account" />
		</div>
	</form>
</div>