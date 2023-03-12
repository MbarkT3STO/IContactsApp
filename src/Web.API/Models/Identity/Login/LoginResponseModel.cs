using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Web.API.Models.Identity.Login;

public class LoginResponseModel
{
    public bool IsSucceeded { get; set; }
    public string Message { get; set; }

    public string UserId { get; set; }
    public string Username { get; set; }

    public string Token { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string RefreshToken { get; set; }

    public LoginResponseModel(bool isSucceeded, string message)
    {
        IsSucceeded = isSucceeded;
        Message = message;
    }

    public LoginResponseModel(string userId, string username, string token, DateTime createdAt, DateTime expiresAt, string refreshToken)
    {
        IsSucceeded = true;

        UserId = userId;
        Username = username;
        Token = token;
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
        RefreshToken = refreshToken;
    }
}
