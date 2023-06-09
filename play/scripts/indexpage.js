$(document).ready(function () {

	/* Change the big screen / small screen button to use javascript instead of reloading the page
	 * To prevent users from losing their session if the want to change to small screen mode
	 */

	var setBigScreen = function () {
		centerErrors();
		$("#bigscreen").hide();
		$("#smallscreen").show();
		$("#D_F_GameSection").css("height", "95%");

		try {
			CP.sizeChange($("#D_F_HudNotification").size() > 0);
		} catch (e) {
		}
	}
	var setSmallScreen = function () {
		centerErrors();
		$("#smallscreen").hide();
		$("#bigscreen").show();
		$("#D_F_GameSection").css("height", "550px");

		try {
			CP.sizeChange($("#D_F_HudNotification").size() > 0);
		} catch (e) {
		}
	}

	$("#bigscreen a").click(function () {
		setBigScreen();
		return false;
	});
	$("#smallscreen a").click(function () {
		setSmallScreen();
		return false;
	});

	/* Force clean up of the flash object during logoff or if the user closes the window */
	var gameCleanupNeeded = true;
	$('a').click(function () {
		// only handle logoff when the link will leave the page.
		if ($(this).attr("href").search(/#/) < 0) {
			if (CP) {
				CP.handleLogOff($(this).attr("href"));
				gameCleanupNeeded = false;
				return false;
			}
		}
	});
	$(window).unload(function () {
		if (gameCleanupNeeded) {
			CP && CP.handleWindowUnload();
		}
	});

	if (window.location.href.search(/smallscreen/) >= 0) {
		setSmallScreen();
	} else {
		setBigScreen();
	}
});

//Add some special jquery functions so can combine visibility and display so don't need to record which size button is currently active
jQuery.fn.visible = function () {
	return this.css('visibility', 'visible');
}

jQuery.fn.invisible = function () {
	return this.css('visibility', 'hidden');
}

jQuery.fn.visibilityToggle = function () {
	return this.css('visibility', function (i, visibility) {
		return (visibility == 'visible') ? 'hidden' : 'visible';
	});
}
