// AuthController.cs
// Controlador mínimo que expone POST /auth/login
// Autenticación con credenciales fijas en memoria (requisito del ejercicio).

using InventarioCCL.Api.DTOs;
using InventarioCCL.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventarioCCL.Api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        // Credenciales fijas (en memoria) solicitadas por la prueba técnica.
        // En un escenario real, estas vendrían de una tabla de usuarios y con password hashed.
        private readonly string _fixedUser = "admin";
        private readonly string _fixedPass = "P@ssw0rd";

        public AuthController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        /// <summary>
        /// POST /auth/login
        /// Recibe LoginDto con username y password.
        /// Si las credenciales coinciden con las fijas, se devuelve un JWT.
        /// </summary>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            if (dto == null) return BadRequest(new { message = "Payload inválido" });

            // Validación básica: comparar con credenciales en memoria
            if (dto.Username == _fixedUser && dto.Password == _fixedPass)
            {
                var token = _tokenService.CreateToken(dto.Username);
                return Ok(new AuthResponseDto(token));
            }

            // Si no coincidió: 401 Unauthorized
            return Unauthorized(new { message = "Credenciales inválidas" });
        }
    }
}
