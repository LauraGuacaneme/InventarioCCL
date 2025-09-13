// ITokenService.cs
// Interfaz para el servicio que generará tokens JWT.

namespace InventarioCCL.Api.Services
{
    /// <summary>
    /// Servicio para creación de tokens JWT.
    /// Se define como interfaz para facilitar pruebas unitarias y separación de responsabilidades.
    /// </summary>
    public interface ITokenService
    {
        /// <summary>
        /// Crea un token JWT para el username indicado.
        /// </summary>
        /// <param name="username">Nombre de usuario (claim sub/name)</param>
        /// <returns>Token JWT serializado (string)</returns>
        string CreateToken(string username);
    }
}
