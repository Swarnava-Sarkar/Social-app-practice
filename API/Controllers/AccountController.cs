using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
    {
        if(await EmailAlreadyExist(dto.Email))  return BadRequest("Email Already Exists.");

        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            Email = dto.Email,
            DisplayName = dto.DisplayName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user.ToDto(tokenService);
    } 

    private async Task<bool> EmailAlreadyExist(string email)
    {
        var flag = await context.Users.AnyAsync(x=> x.Email.ToLower() == email.ToLower());
        return flag;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto dto)
    {
        var user = await context.Users.SingleOrDefaultAsync(x=>x.Email.ToLower() == dto.Email.ToLower());

        if(user == null)    return Unauthorized("Invalid Email.");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));
        
        for(int i=0; i<hashedPassword.Length ; i++)
        {
            if(hashedPassword[i] != user.PasswordHash[i])   return Unauthorized("Invalid Password.");
        }

        return user.ToDto(tokenService);
    }
}
