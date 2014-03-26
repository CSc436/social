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
		<form method="POST" action="#">
			<div class="account_form_block new_account_title">
				Log In
			</div>
			<div class="account_form_block">
				<div class="account_form_column login_form_fields">
					<label for="email">Email Address</label>
					<input type="text" name="email" placeholder="foo@bar.com" required />
					<label for="password">Password</label>
					<input type="password" name="password" placeholder="Enter Password" required />
				</div>
			</div>
			<div class="account_form_block new_account_submit">
				<input type="submit" value="Log In" />
				<button type="button" id="login_form_createaccount">Create Account</button>
				<button type="button" id="login_form_cancel">Cancel</button>
			</div>
			<script>
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