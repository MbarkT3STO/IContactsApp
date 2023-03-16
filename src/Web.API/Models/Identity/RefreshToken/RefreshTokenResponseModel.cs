using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Models.Identity.RefreshToken;

public class RefreshTokenResponseModel
{
    public bool IsSucceeded { get; set; }
    public string ErrorMessage { get; set; }
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }

    public RefreshTokenResponseModel(string token, string refreshToken, DateTime createdAt, DateTime expiresAt)
    {
        Token = token;
        RefreshToken = refreshToken;
        CreatedAt = createdAt;
        ExpiresAt = expiresAt;
    }

    public RefreshTokenResponseModel(string errorMessage)
    {
        IsSucceeded = false;
        ErrorMessage = errorMessage;
    }
}
