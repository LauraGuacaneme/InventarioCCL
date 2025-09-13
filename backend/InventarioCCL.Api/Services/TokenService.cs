// TokenService.cs
// Implementación simple del servicio de tokens JWT usando clave simétrica (HMAC-SHA256).
// NOTA: En producción usar almacén seguro para claves y políticas más estrictas.

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InventarioCCL.Api.Services
{
    /// <summary>
    /// Implementación simple para generar JWT con clave simétrica.
    /// Lee la configuración Jwt:Key, Jwt:Issuer, Jwt:Audience desde IConfiguration (appsettings.json).
    /// </summary>
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        /// <summary>
        /// Crea un JWT para el usuario especificado.
        /// Claims incluidos:
        ///  - sub (JwtRegisteredClaimNames.Sub): username
        ///  - name (ClaimTypes.Name): username
        /// Tiempo de expiración: 4 horas (ajustable).
        /// </summary>
        public string CreateToken(string username)
        {
            // Claims básicos
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(ClaimTypes.Name, username)
            };

            // Obtener clave simétrica desde configuracion (appsettings)
            var keyString = _config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no configurado");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Construir token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(4),
                signingCredentials: creds
            );

            // Serializar y devolver
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
