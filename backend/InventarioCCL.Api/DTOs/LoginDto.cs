// LoginDto.cs
// DTO simple para recibir credenciales en el endpoint /auth/login

namespace InventarioCCL.Api.DTOs
{
    /// <summary>
    /// DTO para el login. Contiene username y password.
    /// Usamos 'record' por concisión e inmutabilidad básica.
    /// </summary>
    public record LoginDto(string Username, string Password);
}
