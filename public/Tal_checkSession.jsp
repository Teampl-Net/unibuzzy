<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Enumeration"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>세션에 설정된 모든 값을 읽어오기</h3>
	<%
        session = request.getSession();
        
        session.setAttribute("id", "smart");

		Enumeration names = session.getAttributeNames();
	    while (names.hasMoreElements()) {
            String name = names.nextElement().toString();
            String value = session.getAttribute(name).toString();

            out.println(name + " : " + value + "<br>");
        }
        out.println("session : " + session + "<br>");
        out.println("session : " + request.getSession().getAttribute("__sessiondata__") + "<br>");
        out.println("session : " + session.getId() + "<br>");
        out.println("session : " + session.getAttribute("__sessionData__") + "<br>");
        out.println("session : " + session.getAttribute("_sessionData_") + "<br>");
        
	%>
    <table border="1">		<tr>			<td colspan="2">Session 영역에 저장된 내용들</td>		</tr>		<%			Enumeration e = session.getAttributeNames();			while (e.hasMoreElements()) {				String attributeName = (String) e.nextElement();				String attributeValue = (String) session.getAttribute(attributeName);		%>		<tr>			<td><%=attributeName%></td>			<td><%=attributeValue%></td>		</tr>		<%			}		%>	</table>
</body>
</html>