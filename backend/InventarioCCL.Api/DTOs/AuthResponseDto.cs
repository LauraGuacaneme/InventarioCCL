// AuthResponseDto.cs
// DTO de respuesta con el token JWT

namespace InventarioCCL.Api.DTOs
{
    /// <summary>
    /// DTO que devuelve el token después de un login exitoso.
    /// </summary>
    public record AuthResponseDto(string Token);
}
