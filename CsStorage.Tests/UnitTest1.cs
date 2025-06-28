using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CsStorage.Tests;

public class UnitTest1
{
    private readonly IServiceProvider _serviceProvider;
    public UnitTest1()
    {
        var services = new ServiceCollection();

        _serviceProvider = services.BuildServiceProvider();
    }
    [Fact]

    public void CreateDebt_ShouldReturnDebt()
    {
        var debtService = _serviceProvider.GetService<IDebtService>();
        var result = debtService.Create(new DebtDTO
        {
            CustomerId = 1,
            PaidDate = DateTime.UtcNow,
            Forecast = DateTime.UtcNow.AddDays(3),
            Value = 70
        });

        Assert.NotNull(result);
    }
}
