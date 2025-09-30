
````markdown
# 📦 Inventario CCL

Sistema de **gestión de inventario** desarrollado con **Angular** (frontend) y **.NET Core** (backend).  
Permite manejar productos, movimientos e inventario con una interfaz moderna basada en **Angular Material**.

---

## 🚀 Tecnologías principales
- **Frontend**: Angular  
- **Backend**: .NET Core Web API  
- **Base de datos**: PostgreSQL   
- **Control de versiones**: Git + GitHub


##  Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior recomendado)
- [Angular CLI](https://angular.io/cli) (versión 16 o superior)
- [Git](https://git-scm.com/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) o [Visual Studio Code](https://code.visualstudio.com/)
- [.NET SDK 6.0+](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) (o superior)
- [PostgreSQL]

---

##  Instalación y ejecución

### 🔹 1. Clonar el repositorio
```bash
git clone https://github.com/LauraGuacaneme/InventarioCCL.git
cd inventario-ccl
````

---

### 🔹 2. Configuración del Backend (.NET Core)

1. Entra a la carpeta del backend:

   ```bash
   cd backend/InventarioCCL.Api
   ```

2. Configura la **cadena de conexión** a la base de datos en `appsettings.Development.json`:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=InventarioDB;Username=tu_usuario;Password=tu_clave;"
   }
   ```

43. Corre la API:

   ```bash
   dotnet run
   ```
Automatícamente se crea la tabla necesaria con datos iniciales cargados

La API quedará disponible en 👉 `http://localhost:5069` (o el puerto configurado).

---

### 🔹 3. Configuración del Frontend (Angular)

1. Entra a la carpeta del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:

   ```bash
   ng serve
   ```

4. Abre la aplicación en el navegador:
   👉 [http://localhost:4200](http://localhost:4200)

⚠️ Nota: Verifica que el **endpoint del backend** (`http://localhost:5069`) esté configurado correctamente en el servicio Angular (`productos.service.ts` y demás).

---


## 📁 Estructura principal del proyecto

```
inventario-ccl/
├── frontend/               # Proyecto Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Login, Productos, Movimientos, Inventario
│   │   │   ├── services/   # Servicios para API REST
│   │   │   ├── models/     # Modelos de datos
│   │   │   └── app.module.ts
│   │   ├── assets/         # Recursos estáticos
│   │   └── styles/         # Estilos globales (variables.scss, etc.)
├── backend/                # Proyecto .NET Core
│   ├── Controllers/        # Endpoints de la API
│   ├── Models/             # Modelos de base de datos
│   ├── Services/           # Lógica de negocio
│   ├── Data/               # Contexto de base de datos
│   └── appsettings.json    # Configuración
```

---

## 🎨 Estilos y personalización

* Colores principales definidos en `frontend/src/styles/variables.scss`
* Uso de **Angular Material** en tablas, formularios y tarjetas

---

## 🔑 Notas adicionales

* El sistema funciona con **login, inventario, productos y movimientos**.
* Requiere que el **backend (.NET Core)** esté ejecutándose antes de interactuar desde Angular.
