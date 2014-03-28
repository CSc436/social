<style>
	<?php
		// Echo the css for this page.
		echo( file_get_contents( "account.css" ) );
	?>
</style>
<script>
</script>
<div id="new_account" class="account_page">
	<div class="screen">
	</div>
	<div id="new_account_form" class="account_form">
		<form id="create_new_account_form" method="POST">
			<div class="account_form_block new_account_title">
				Create New Account
			</div>
			<div class="account_form_block">
				<div class="account_form_column">
					<label for="email">Email Address</label>
					<input type="text" name="email" id="new_account_form_email" placeholder="foo@bar.com" required />
					<label for="password1">Password</label>
					<input type="password" name="password1" id="new_account_form_password1" placeholder="Enter Password" required />
					<label for="firstname">First Name</label>
					<input type="text" name="firstname" id="new_account_form_firstname" placeholder="Foo" required />
					<label for="phone">Mobile Phone Number</label>
					<input type="text" name="phone" id="new_account_form_phone" placeholder="(555)-555-0123" required />
				</div>
				<div class="account_form_column">
					<label for="username">Username</label>
					<input type="text" name="username" id="new_account_form_username" placeholder="Foobar" required />
					<label for="password2">Retype Password</label>
					<input type="password" name="password2" id="new_account_form_password2" placeholder="Retype Password" required />
					<label for="lastname">Last Name</label>
					<input type="text" name="lastname" id="new_account_form_lastname" placeholder="Bar" required />
				</div>
			</div>
			<div class="account_form_block new_account_submit">
				<input type="submit" value="Create Account" />
				<button type="button" id="new_account_form_cancel">Cancel</button>
			</div>
			<script>
				// Intercept the form submit and use AJAX instead.
				$("#create_new_account_form").submit(function(e){
				
					// Prevent the form from changing the page.
					e.preventDefault();
					
					$("#new_account").css("visibility", "hidden");
					
					// Display a "processing" message.
					displayMsg("Creating Account", "Processing...");
					
					// Send the form data to be processed.
					$.post(
						"../backend/accounts/process_create_account.php",
						{email: $("#new_account_form_email").val(),
							username: $("#new_account_form_username").val(),
							firstname: $("#new_account_form_firstname").val(),
							lastname: $("#new_account_form_lastname").val(),
							phone: $("#new_account_form_phone").val(),
							password1: $("#new_account_form_password1").val(),
							password2: $("#new_account_form_password2").val()},
						function(data){
						
							// Close the "processing" message.
							closeMsg();
							
							// Display error message if the process returns an error.
							if(data){
								displayMsg("Uh Oh, Error!", data);
							}
							// Display success message.
							else{
								displayMsg("Success!", "Your account has been created.");
							}
						},
						"json"
					);
				});
			
				// Cancel button.
				$("#new_account_form_cancel").click(function () {
					//$("#new_account").css("opacity", "0");
					$("#new_account").css("visibility", "hidden");
					$("#login").css("visibility", "visible");
				});
			</script>
		</form>
	</div>
</div>