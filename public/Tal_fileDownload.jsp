<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
<title>Pattern List</title>
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript">
	$(function() {
        try {
            var queryString = window.location.search;
            debugger
            var urlParams = new URLSearchParams(queryString);

            var url = urlParams.get('downloadURL')
            var fileName = urlParams.get('fileName')

            console.log(url);

            var pom = document.createElement('a')
            pom.setAttribute('href', './' + url)
            pom.setAttribute('download', fileName)
            if (document.createEvent) {
            var event = document.createEvent('MouseEvents')
            event.initEvent('click', true, true)
            pom.dispatchEvent(event)
            } else {
            pom.click()
            }
            /*  const element = document.createElement('a')
            element.setAttribute('href', '/resource/stickerIcon/sticker_robot.svg')
            element.click() */
        } catch (error) {
            console.log(error)
        }
	});
	
</script>
