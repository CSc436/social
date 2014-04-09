<style>
	<?php
		// Echo the css for this page.
		echo( file_get_contents( "account.css" ) );
	?>
</style>
<div id="login" class="account_page">
	<div class="screen">
	</div>
	<div id="login_form" class="account_form">
		<form method="POST" >
			<div class="account_form_block new_account_title">
				Log In
			</div>
			<div class="account_form_block">
				<div class="account_form_column login_form_fields">
					<label for="email">Email Address</label>
					<input type="text" name="email" id="login_form_email" placeholder="foo@bar.com" required />
					<label for="password">Password</label>
					<input type="password" name="password" id="login_form_password" placeholder="Enter Password" required />
				</div>
			</div>
			<div class="account_form_block new_account_submit">
				<input type="submit" value="Log In" />
				<button type="button" id="login_form_createaccount">Create Account</button>
				<button type="button" id="login_form_cancel">Cancel</button>
			</div>
			<script>
			
				// Intercept the form submit and use AJAX instead.
				$("#login_form").submit(function(e){
				
					// Prevent the form from changing the page.
					e.preventDefault();
					
					$("#login").css("visibility", "hidden");
					
					// Display a "processing" message.
					displayMsg("Creating Account", "Logging In...");
					
					// Send the form data to be processed.
					$.post(
						"../backend/accounts/process_login.php",
						{email: $("#login_form_email").val(),
						 password: $("#login_form_password").val()},
						function(data){
						
							// Close the "processing" message.
							closeMsg();
							
							// Display error message if the process returns an error.
							if(data[":code"] == 0){
								displayMsg("Login Successful!", "Welcome, " + data[":data"]["Username"] + ".");
								
								// Change the "login" button to "logout".
								toggleLoginButton(1);
							}
							// Display success message.
							else{
								displayMsg("I Can't Do That Dave....", data[":data"]);
							}
						},
						"json"
					);
				});
				
				$("#login_form_cancel").click(function () {
					//$("#new_account").css("opacity", "0");
					$("#login").css("visibility", "hidden");
				});
				$("#login_form_createaccount").click(function () {
					$("#login").css("visibility", "hidden");
					$("#new_account").css("visibility", "visible");
				});
			</script>
		</form>
	</div>
</div>