<div id="account_error" class="account_page">
<style>
	<?php
		// Echo the css for this page.
		echo( file_get_contents( "account.css" ) );
	?>
</style>
	<div class="screen">
	</div>
	<div id="account_error_msg_window" class="account_form">
		<form method="POST" action="#">
			<div class="account_form_block new_account_title">
				<?php
					echo (htmlspecialchars($_POST['title']));
				?>
			</div>
			<div id="account_error_msg" class="account_form_block">
				<?php
					echo (htmlspecialchars($_POST['errmsg']));
				?>
			</div>
			<div class="account_form_block new_account_submit">
				<button type="button" id="account_error_cancel">Back</button>
			</div>
			<script>
				// Cancel Button
				$("#account_error_cancel").click(function () {
					$("#account_error").detach();
				});
			</script>
		</form>
	</div>
</div>