using CsStorage.Application.Interfaces;
using CsStorage.Application.Mappings;
using CsStorage.Application.Services;
using CsStorage.Data;
using CsStorage.Data.Context;
using CsStorage.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CsStorage.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"),

                b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName))
            );

            services.AddAutoMapper(typeof(DomainToDTOMappingProfile));

            services.AddScoped<IDebtRepository, DebtRepository>();
            services.AddScoped<IDebtService, DebtService>();

            return services;
        }
    }

}

