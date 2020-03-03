# vimeo.ga.js

**Tracking Vimeo Player Events for Google Analytics / Google Tag Manager**

The following changes improve the data collection by vimeo.ga.js:

1) As Vimeo video maybe embed using iframe, the captured url may not accurate.
Update event category to ``Vimeo Video | <url>``, which **\<url\>** takes **document.referrer** or **document.location.href**.

2) The actual play time cannot be reflected due to user seeking event.
Update event label to ``<title> | <id> | <duration>``, which **\<duration\>** captures the actual play time. 

3) The event capture time is not present in different events.
Add event value to **play**, **ended**, **emailcapture** and **timeupdate events**, which the event value is the played seconds of the video.

4) Pause event is not present.
Capture **pause event** when user pause the video.

5) The last play time is not present when user leaves the video page.
**onbeforeunload event** added to capture last play time.
