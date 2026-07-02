WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
WebApplication app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

string allComments = "Comments";

app.MapGet("/api/comment", GetComment);
app.MapPost("/api/comment", UpdateComment);

app.Run();

IResult GetComment()
{
	return Results.Text(allComments);
}

IResult UpdateComment(HttpRequest request)
{
	string comment = request.Form["comment"].ToString();
	string username = request.Form["username"].ToString();
	if (!string.IsNullOrEmpty(comment) &&
	!string.IsNullOrEmpty(username))
	{
		string timestamp = DateTime.Now.ToString("yyyy-MM-dd");
		allComments += $"\n{username}: {comment} \n{timestamp}";
	}
	return Results.Redirect("/index.html");
}